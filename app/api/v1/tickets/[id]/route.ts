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

const updateTicketSchema = z.object({
  ticketType: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  quantity: z.number().int().positive().optional(),
});

// GET /api/v1/tickets/[id] - Get single ticket
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireOrganizer(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const ticket = dbExtended.getTicketById(params.id);
    if (!ticket) {
      return notFoundResponse("Ticket");
    }

    // Check ownership
    const ownershipResult = await requireOwnershipOrAdmin(
      request,
      ticket.organizerId
    );
    if ("response" in ownershipResult) {
      return ownershipResult.response;
    }

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
      "Ticket retrieved successfully"
    );
  } catch (error) {
    console.error("Get ticket error:", error);
    return errorResponse("Failed to retrieve ticket", 500);
  }
}

// PUT /api/v1/tickets/[id] - Update ticket
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireOrganizer(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const ticket = dbExtended.getTicketById(params.id);
    if (!ticket) {
      return notFoundResponse("Ticket");
    }

    // Check ownership
    const ownershipResult = await requireOwnershipOrAdmin(
      request,
      ticket.organizerId
    );
    if ("response" in ownershipResult) {
      return ownershipResult.response;
    }

    const body = await request.json();
    const validated = updateTicketSchema.safeParse(body);
    if (!validated.success) {
      return validationErrorResponse(validated.error.errors);
    }

    // Validate quantity is not less than sold
    if (validated.data.quantity !== undefined) {
      if (validated.data.quantity < ticket.sold) {
        return errorResponse(
          "Quantity cannot be less than tickets already sold",
          400
        );
      }
    }

    const updatedTicket = dbExtended.updateTicket(params.id, validated.data);
    if (!updatedTicket) {
      return notFoundResponse("Ticket");
    }

    return successResponse(
      {
        id: updatedTicket.id,
        eventId: updatedTicket.eventId,
        ticketType: updatedTicket.ticketType,
        price: updatedTicket.price,
        quantity: updatedTicket.quantity,
        sold: updatedTicket.sold,
        available: updatedTicket.quantity - updatedTicket.sold,
        createdAt: updatedTicket.createdAt,
      },
      "Ticket updated successfully"
    );
  } catch (error) {
    console.error("Update ticket error:", error);
    return errorResponse("Failed to update ticket", 500);
  }
}

// DELETE /api/v1/tickets/[id] - Delete ticket
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireOrganizer(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const ticket = dbExtended.getTicketById(params.id);
    if (!ticket) {
      return notFoundResponse("Ticket");
    }

    // Check ownership
    const ownershipResult = await requireOwnershipOrAdmin(
      request,
      ticket.organizerId
    );
    if ("response" in ownershipResult) {
      return ownershipResult.response;
    }

    // Prevent deletion if tickets are sold
    if (ticket.sold > 0) {
      return errorResponse(
        "Cannot delete ticket with sold tickets. Consider disabling instead.",
        400
      );
    }

    const deleted = dbExtended.deleteTicket(params.id);
    if (!deleted) {
      return notFoundResponse("Ticket");
    }

    return successResponse(null, "Ticket deleted successfully");
  } catch (error) {
    console.error("Delete ticket error:", error);
    return errorResponse("Failed to delete ticket", 500);
  }
}

