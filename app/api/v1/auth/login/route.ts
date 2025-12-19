import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "@/lib/api-utils";
import { corsHeaders, handleCORS } from "@/middleware-api";

const loginSchema = z.object({
  identifier: z.string().min(1, "Email or phone is required"),
  password: z.string().min(1, "Password is required"),
});

// Handle CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { headers: corsHeaders() });
}

// POST /api/v1/auth/login - Login (for mobile/web API)
export async function POST(request: NextRequest) {
  const cors = handleCORS(request);
  if (cors) return cors;

  try {
    const body = await request.json();
    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      const errorResp = validationErrorResponse(validated.error);
      const headers = corsHeaders();
      Object.entries(headers).forEach(([key, value]) => {
        if (value) errorResp.headers.set(key, value);
      });
      return errorResp;
    }

    // Find user
    const user = db.findUser(validated.data.identifier);
    if (!user) {
      const errorResp = errorResponse("Invalid email/phone or password", 401);
      Object.entries(corsHeaders()).forEach(([key, value]) => {
        errorResp.headers.set(key, value);
      });
      return errorResp;
    }

    // Verify password
    const isValidPassword = await db.verifyPassword(
      validated.data.password,
      user.password
    );
    if (!isValidPassword) {
      const errorResp = errorResponse("Invalid email/phone or password", 401);
      Object.entries(corsHeaders()).forEach(([key, value]) => {
        errorResp.headers.set(key, value);
      });
      return errorResp;
    }

    // Check status
    if (user.status === "suspended") {
      const errorResp = errorResponse(
        "Your account has been suspended. Please contact support.",
        403
      );
      Object.entries(corsHeaders()).forEach(([key, value]) => {
        errorResp.headers.set(key, value);
      });
      return errorResp;
    }

    // Set session
    await setSession({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      businessName: user.businessName,
      status: user.status,
    });

    const response = successResponse(
      {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          businessName: user.businessName,
          status: user.status,
        },
      },
      "Login successful"
    );

    // Add CORS headers
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    const errorResp = errorResponse("Internal server error", 500);
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      errorResp.headers.set(key, value);
    });
    return errorResp;
  }
}

