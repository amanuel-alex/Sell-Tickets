import { NextRequest } from "next/server";
import { z } from "zod";
import { dbExtended } from "@/lib/db-extended";
import { requireOrganizer, requireAdmin } from "@/lib/api-auth";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
} from "@/lib/api-utils";

const createEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  venue: z.string().min(1, "Venue is required"),
  venueAddress: z.string().optional(),
});

const updateEventSchema = createEventSchema.partial();

// Handle CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { headers: corsHeaders() });
}

// GET /api/v1/events - List events
export async function GET(request: NextRequest) {
  const cors = handleCORS(request);
  if (cors) return cors;

  try {
    const authResult = await requireOrganizer(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const { context } = authResult;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    let events = dbExtended.getEvents(context.isAdmin ? undefined : context.user.id);

    // Apply filters
    if (status) {
      events = events.filter((e) => e.status === status);
    }
    if (category) {
      events = events.filter((e) => e.category === category);
    }

    // Pagination
    const total = events.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedEvents = events.slice(startIndex, startIndex + limit);

    const response = successResponse(
      paginatedEvents.map((e) => ({
        id: e.id,
        title: e.title,
        description: e.description,
        category: e.category,
        startDate: e.startDate,
        endDate: e.endDate,
        venue: e.venue,
        venueAddress: e.venueAddress,
        status: e.status,
        approved: e.approved,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
      })),
      "Events retrieved successfully",
      {
        page,
        limit,
        total,
        totalPages,
      }
    );
    
    // Add CORS headers
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    return response;
  } catch (error) {
    console.error("Get events error:", error);
    const errorResp = errorResponse("Failed to retrieve events", 500);
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      errorResp.headers.set(key, value);
    });
    return errorResp;
  }
}

// POST /api/v1/events - Create event
export async function POST(request: NextRequest) {
  const cors = handleCORS(request);
  if (cors) return cors;

  try {
    const authResult = await requireOrganizer(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const { context } = authResult;
    const body = await request.json();

    const validated = createEventSchema.safeParse(body);
    if (!validated.success) {
      return validationErrorResponse(validated.error.errors);
    }

    // Validate dates
    const startDate = new Date(validated.data.startDate);
    const endDate = new Date(validated.data.endDate);

    if (endDate <= startDate) {
      return errorResponse("End date must be after start date", 400);
    }

    if (startDate < new Date()) {
      return errorResponse("Start date cannot be in the past", 400);
    }

    const event = dbExtended.createEvent({
      organizerId: context.user.id,
      ...validated.data,
      status: "draft",
      approved: false,
    });

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
      "Event created successfully",
      undefined
    );
    
    // Add CORS headers
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    return response;
  } catch (error) {
    console.error("Create event error:", error);
    const errorResp = errorResponse("Failed to create event", 500);
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      errorResp.headers.set(key, value);
    });
    return errorResp;
  }
}

