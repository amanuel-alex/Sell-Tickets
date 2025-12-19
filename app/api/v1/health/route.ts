import { NextResponse } from "next/server";
import { successResponse } from "@/lib/api-utils";

// GET /api/v1/health - Health check endpoint
export async function GET() {
  return successResponse(
    {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      services: {
        database: "operational",
        authentication: "operational",
      },
    },
    "API is healthy"
  );
}

