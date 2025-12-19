import { NextRequest, NextResponse } from "next/server";
import { corsHeaders } from "@/middleware-api";

/**
 * Wrapper to add CORS headers to API responses
 */
export function withCORS(response: NextResponse): NextResponse {
  Object.entries(corsHeaders()).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

/**
 * Handle OPTIONS request for CORS preflight
 */
export function handleOptions() {
  return new NextResponse(null, { headers: corsHeaders() });
}

