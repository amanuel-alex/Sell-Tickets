import { NextRequest } from "next/server";
import { z } from "zod";
import { dbExtended } from "@/lib/db-extended";
import {
  requireOrganizer,
  requireOwnershipOrAdmin,
} from "@/lib/api-auth";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
} from "@/lib/api-utils";

const updateEventSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  category: z.string().min(1).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  venue: z.string().min(1).optional(),
  venueAddress: z.string().optional(),
  status: z.enum(["draft", "active", "ended", "cancelled"]).optional(),
});

// GET /api/v1/events/[id] - Get single event
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireOrganizer(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const event = dbExtended.getEventById(params.id);
    if (!event) {
      return notFoundResponse("Event");
    }

    // Check ownership
    const ownershipResult = await requireOwnershipOrAdmin(
      request,
      event.organizerId
    );
    if ("response" in ownershipResult) {
      return ownershipResult.response;
    }

    return successResponse(
      {
        id: event.id,
        title: event.title,
        description: event.description,
        category: event.category,
        startDate: event.startDate,
        endDate: event.endDate,
        venue: event.venue,
        venueAddress: event.venueAddress,
        status: event.status,
        approved: event.approved,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
      },
      "Event retrieved successfully"
    );
  } catch (error) {
    console.error("Get event error:", error);
    return errorResponse("Failed to retrieve event", 500);
  }
}

// PUT /api/v1/events/[id] - Update event
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireOrganizer(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const event = dbExtended.getEventById(params.id);
    if (!event) {
      return notFoundResponse("Event");
    }

    // Check ownership
    const ownershipResult = await requireOwnershipOrAdmin(
      request,
      event.organizerId
    );
    if ("response" in ownershipResult) {
      return ownershipResult.response;
    }

    const body = await request.json();
    const validated = updateEventSchema.safeParse(body);
    if (!validated.success) {
      return validationErrorResponse(validated.error.errors);
    }

    // Validate dates if provided
    if (validated.data.startDate || validated.data.endDate) {
      const startDate = validated.data.startDate
        ? new Date(validated.data.startDate)
        : new Date(event.startDate);
      const endDate = validated.data.endDate
        ? new Date(validated.data.endDate)
        : new Date(event.endDate);

      if (endDate <= startDate) {
        return errorResponse("End date must be after start date", 400);
      }
    }

    // Update event
    const updatedEvent = dbExtended.updateEvent(params.id, validated.data);
    if (!updatedEvent) {
      return notFoundResponse("Event");
    }

    return successResponse(
      {
        id: updatedEvent.id,
        title: updatedEvent.title,
        description: updatedEvent.description,
        category: updatedEvent.category,
        startDate: updatedEvent.startDate,
        endDate: updatedEvent.endDate,
        venue: updatedEvent.venue,
        venueAddress: updatedEvent.venueAddress,
        status: updatedEvent.status,
        approved: updatedEvent.approved,
        createdAt: updatedEvent.createdAt,
        updatedAt: updatedEvent.updatedAt,
      },
      "Event updated successfully"
    );
  } catch (error) {
    console.error("Update event error:", error);
    return errorResponse("Failed to update event", 500);
  }
}

// DELETE /api/v1/events/[id] - Delete event
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireOrganizer(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const event = dbExtended.getEventById(params.id);
    if (!event) {
      return notFoundResponse("Event");
    }

    // Check ownership
    const ownershipResult = await requireOwnershipOrAdmin(
      request,
      event.organizerId
    );
    if ("response" in ownershipResult) {
      return ownershipResult.response;
    }

    const deleted = dbExtended.deleteEvent(params.id);
    if (!deleted) {
      return notFoundResponse("Event");
    }

    return successResponse(null, "Event deleted successfully");
  } catch (error) {
    console.error("Delete event error:", error);
    return errorResponse("Failed to delete event", 500);
  }
}

