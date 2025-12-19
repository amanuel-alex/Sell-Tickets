import { NextRequest } from "next/server";
import { z } from "zod";
import { dbExtended } from "@/lib/db-extended";
import { requireOrganizer, requireOwnershipOrAdmin } from "@/lib/api-auth";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
} from "@/lib/api-utils";

const createTransactionSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  ticketId: z.string().min(1, "Ticket ID is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerName: z.string().min(1, "Customer name is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  paymentMethod: z.enum(["telebirr", "cbe-birr", "amole", "bank-transfer", "cash"]),
});

// Handle CORS
export async function OPTIONS() {
  return handleOptions();
}

// GET /api/v1/transactions - List transactions
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireOrganizer(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const { context } = authResult;
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");
    const status = searchParams.get("status");
    const paymentMethod = searchParams.get("paymentMethod");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    let transactions = dbExtended.getTransactions(
      context.isAdmin ? undefined : context.user.id,
      eventId || undefined
    );

    // Apply filters
    if (status) {
      transactions = transactions.filter((t) => t.status === status);
    }
    if (paymentMethod) {
      transactions = transactions.filter((t) => t.paymentMethod === paymentMethod);
    }

    // Pagination
    const total = transactions.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedTransactions = transactions.slice(startIndex, startIndex + limit);

    return successResponse(
      paginatedTransactions.map((t) => ({
        id: t.id,
        eventId: t.eventId,
        ticketId: t.ticketId,
        customerEmail: t.customerEmail,
        customerName: t.customerName,
        quantity: t.quantity,
        amount: t.amount,
        status: t.status,
        paymentMethod: t.paymentMethod,
        createdAt: t.createdAt,
      })),
      "Transactions retrieved successfully",
      {
        page,
        limit,
        total,
        totalPages,
      }
    );
    
    return withCORS(response);
  } catch (error) {
    console.error("Get transactions error:", error);
    return withCORS(errorResponse("Failed to retrieve transactions", 500));
  }
}

// POST /api/v1/transactions - Create transaction (purchase ticket)
export async function POST(request: NextRequest) {
  try {
    // This endpoint can be public for ticket purchases
    // But we'll still validate the event and ticket
    const body = await request.json();

    const validated = createTransactionSchema.safeParse(body);
    if (!validated.success) {
      return validationErrorResponse(validated.error.errors);
    }

    // Verify event exists
    const event = dbExtended.getEventById(validated.data.eventId);
    if (!event) {
      return notFoundResponse("Event");
    }

    if (event.status !== "active") {
      return errorResponse("Event is not active", 400);
    }

    // Verify ticket exists
    const ticket = dbExtended.getTicketById(validated.data.ticketId);
    if (!ticket) {
      return notFoundResponse("Ticket");
    }

    if (ticket.eventId !== validated.data.eventId) {
      return errorResponse("Ticket does not belong to this event", 400);
    }

    // Check availability
    const available = ticket.quantity - ticket.sold;
    if (validated.data.quantity > available) {
      return errorResponse(
        `Only ${available} tickets available`,
        400
      );
    }

    // Calculate amount
    const amount = ticket.price * validated.data.quantity;

    // Create transaction
    const transaction = dbExtended.createTransaction({
      eventId: validated.data.eventId,
      organizerId: event.organizerId,
      ticketId: validated.data.ticketId,
      customerEmail: validated.data.customerEmail,
      customerName: validated.data.customerName,
      quantity: validated.data.quantity,
      amount,
      status: "pending", // Will be updated to "completed" after payment confirmation
      paymentMethod: validated.data.paymentMethod,
    });

    return successResponse(
      {
        id: transaction.id,
        eventId: transaction.eventId,
        ticketId: transaction.ticketId,
        customerEmail: transaction.customerEmail,
        customerName: transaction.customerName,
        quantity: transaction.quantity,
        amount: transaction.amount,
        status: transaction.status,
        paymentMethod: transaction.paymentMethod,
        createdAt: transaction.createdAt,
      },
      "Transaction created successfully. Please complete payment.",
      undefined
    );
    
    return withCORS(response);
  } catch (error) {
    console.error("Create transaction error:", error);
    return withCORS(errorResponse("Failed to create transaction", 500));
  }
}

