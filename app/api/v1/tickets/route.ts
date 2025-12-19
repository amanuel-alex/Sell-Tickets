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

const createTicketSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  ticketType: z.string().min(1, "Ticket type is required"),
  price: z.number().positive("Price must be positive"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

// GET /api/v1/tickets - List tickets
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireOrganizer(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const { context } = authResult;
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    let tickets = dbExtended.getTickets(
      context.isAdmin ? undefined : context.user.id,
      eventId || undefined
    );

    // Pagination
    const total = tickets.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedTickets = tickets.slice(startIndex, startIndex + limit);

    return successResponse(
      paginatedTickets.map((t) => ({
        id: t.id,
        eventId: t.eventId,
        ticketType: t.ticketType,
        price: t.price,
        quantity: t.quantity,
        sold: t.sold,
        available: t.quantity - t.sold,
        createdAt: t.createdAt,
      })),
      "Tickets retrieved successfully",
      {
        page,
        limit,
        total,
        totalPages,
      }
    );
  } catch (error) {
    console.error("Get tickets error:", error);
    return errorResponse("Failed to retrieve tickets", 500);
  }
}

// POST /api/v1/tickets - Create ticket
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireOrganizer(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const { context } = authResult;
    const body = await request.json();

    const validated = createTicketSchema.safeParse(body);
    if (!validated.success) {
      return validationErrorResponse(validated.error.errors);
    }

    // Verify event exists and belongs to organizer
    const event = dbExtended.getEventById(validated.data.eventId);
    if (!event) {
      return notFoundResponse("Event");
    }

    const ownershipResult = await requireOwnershipOrAdmin(
      request,
      event.organizerId
    );
    if ("response" in ownershipResult) {
      return ownershipResult.response;
    }

    const ticket = dbExtended.createTicket({
      eventId: validated.data.eventId,
      organizerId: context.user.id,
      ticketType: validated.data.ticketType,
      price: validated.data.price,
      quantity: validated.data.quantity,
      sold: 0,
    });

    return successResponse(
      {
        id: ticket.id,
        eventId: ticket.eventId,
        ticketType: ticket.ticketType,
        price: ticket.price,
        quantity: ticket.quantity,
        sold: ticket.sold,
        available: ticket.quantity - ticket.sold,
        createdAt: ticket.createdAt,
      },
      "Ticket created successfully"
    );
  } catch (error) {
    console.error("Create ticket error:", error);
    return errorResponse("Failed to create ticket", 500);
  }
}

