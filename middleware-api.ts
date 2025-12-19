import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// CORS headers for API routes
export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", // In production, replace with specific domains
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

// Handle CORS preflight requests
export function handleCORS(request: NextRequest) {
  if (request.method === "OPTIONS") {
    return NextResponse.json({}, { headers: corsHeaders() });
  }
  return null;
}

