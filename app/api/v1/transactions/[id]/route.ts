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

const updateTransactionSchema = z.object({
  status: z.enum(["pending", "completed", "refunded", "failed"]).optional(),
});

// GET /api/v1/transactions/[id] - Get single transaction
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const authResult = await requireOrganizer(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const transaction = dbExtended.getTransactionById(id);
    if (!transaction) {
      return notFoundResponse("Transaction");
    }

    // Check ownership
    const ownershipResult = await requireOwnershipOrAdmin(
      request,
      transaction.organizerId
    );
    if ("response" in ownershipResult) {
      return ownershipResult.response;
    }

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
      "Transaction retrieved successfully"
    );
  } catch (error) {
    console.error("Get transaction error:", error);
    return errorResponse("Failed to retrieve transaction", 500);
  }
}

// PUT /api/v1/transactions/[id] - Update transaction (e.g., confirm payment, refund)
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const authResult = await requireOrganizer(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const transaction = dbExtended.getTransactionById(id);
    if (!transaction) {
      return notFoundResponse("Transaction");
    }

    // Check ownership
    const ownershipResult = await requireOwnershipOrAdmin(
      request,
      transaction.organizerId
    );
    if ("response" in ownershipResult) {
      return ownershipResult.response;
    }

    const body = await request.json();
    const validated = updateTransactionSchema.safeParse(body);
    if (!validated.success) {
      return validationErrorResponse(validated.error.issues);
    }

    // Handle refund logic
    if (validated.data.status === "refunded" && transaction.status === "completed") {
      // Update ticket sold count
      const ticket = dbExtended.getTicketById(transaction.ticketId);
      if (ticket) {
        dbExtended.updateTicket(transaction.ticketId, {
          sold: Math.max(0, ticket.sold - transaction.quantity),
        });
      }
    }

    // Handle completion logic
    if (validated.data.status === "completed" && transaction.status === "pending") {
      // Ticket sold count is already updated in createTransaction
      // Just update the status
    }

    const updatedTransaction = dbExtended.updateTransaction(id, validated.data);
    if (!updatedTransaction) {
      return notFoundResponse("Transaction");
    }

    return successResponse(
      {
        id: updatedTransaction.id,
        eventId: updatedTransaction.eventId,
        ticketId: updatedTransaction.ticketId,
        customerEmail: updatedTransaction.customerEmail,
        customerName: updatedTransaction.customerName,
        quantity: updatedTransaction.quantity,
        amount: updatedTransaction.amount,
        status: updatedTransaction.status,
        paymentMethod: updatedTransaction.paymentMethod,
        createdAt: updatedTransaction.createdAt,
      },
      "Transaction updated successfully"
    );
  } catch (error) {
    console.error("Update transaction error:", error);
    return errorResponse("Failed to update transaction", 500);
  }
}

