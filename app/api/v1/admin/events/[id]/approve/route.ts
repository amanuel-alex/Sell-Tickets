import { NextRequest } from "next/server";
import { dbExtended } from "@/lib/db-extended";
import { requireAdmin } from "@/lib/api-auth";
import { successResponse, errorResponse, notFoundResponse } from "@/lib/api-utils";

// POST /api/v1/admin/events/[id]/approve - Approve event (admin only)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await requireAdmin(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const event = dbExtended.getEventById(params.id);
    if (!event) {
      return notFoundResponse("Event");
    }

    const updatedEvent = dbExtended.updateEvent(params.id, {
      approved: true,
      status: event.status === "draft" ? "active" : event.status,
    });

    if (!updatedEvent) {
      return notFoundResponse("Event");
    }

    return successResponse(
      {
        id: updatedEvent.id,
        title: updatedEvent.title,
        approved: updatedEvent.approved,
        status: updatedEvent.status,
      },
      "Event approved successfully"
    );
  } catch (error) {
    console.error("Approve event error:", error);
    return errorResponse("Failed to approve event", 500);
  }
}

