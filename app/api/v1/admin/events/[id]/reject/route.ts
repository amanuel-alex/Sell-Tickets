import { NextRequest } from "next/server";
import { dbExtended } from "@/lib/db-extended";
import { requireAdmin } from "@/lib/api-auth";
import { successResponse, errorResponse, notFoundResponse } from "@/lib/api-utils";

// POST /api/v1/admin/events/[id]/reject - Reject event (admin only)
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
      approved: false,
      status: "cancelled",
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
      "Event rejected successfully"
    );
  } catch (error) {
    console.error("Reject event error:", error);
    return errorResponse("Failed to reject event", 500);
  }
}

