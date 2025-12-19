import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { successResponse, unauthorizedResponse } from "@/lib/api-utils";
import { corsHeaders, handleCORS } from "@/middleware-api";

// Handle CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { headers: corsHeaders() });
}

// GET /api/v1/auth/me - Get current user
export async function GET(request: NextRequest) {
  const cors = handleCORS(request);
  if (cors) return cors;

  try {
    const session = await getSession();

    if (!session) {
      const errorResp = unauthorizedResponse();
      Object.entries(corsHeaders()).forEach(([key, value]) => {
        errorResp.headers.set(key, value);
      });
      return errorResp;
    }

    const response = successResponse(
      {
        id: session.id,
        email: session.email,
        role: session.role,
        name: session.name,
        businessName: session.businessName,
        status: session.status,
      },
      "User retrieved successfully"
    );

    // Add CORS headers
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    console.error("Get user error:", error);
    const errorResp = unauthorizedResponse();
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      errorResp.headers.set(key, value);
    });
    return errorResp;
  }
}

