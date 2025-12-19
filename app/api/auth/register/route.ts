import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";
import { corsHeaders, handleCORS } from "@/middleware-api";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "@/lib/api-utils";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  role: z.enum(["organizer"]).default("organizer"), // Only organizers can register publicly
});

export async function POST(request: NextRequest) {
  const cors = handleCORS(request);
  if (cors) return cors;

  try {
    const body = await request.json();
    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      return validationErrorResponse(validated.error);
    }

    // Check if user already exists
    const existingUser = db.findUser(validated.data.email);
    if (existingUser) {
      const errorResp = errorResponse("User with this email already exists", 400);
      Object.entries(corsHeaders()).forEach(([key, value]) => {
        if (value) errorResp.headers.set(key, value);
      });
      return errorResp;
    }

    // Security: Only allow organizer registration through public API
    // Admin accounts must be created by existing admins or through backend
    if (validated.data.role !== "organizer") {
      const errorResp = errorResponse(
        "Admin registration is not allowed through public API",
        403
      );
      Object.entries(corsHeaders()).forEach(([key, value]) => {
        if (value) errorResp.headers.set(key, value);
      });
      return errorResp;
    }

    // Create user with pending status (needs admin approval)
    const user = await db.createUser({
      email: validated.data.email,
      phone: validated.data.phone,
      password: validated.data.password, // In a real app, hash the password
      name: validated.data.name,
      businessName: validated.data.businessName,
      role: validated.data.role,
      status: "pending",
      emailVerified: false,
    });

    // Set session (only if approved, otherwise redirect to pending)
    if (user.status === "approved") {
      await setSession({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        businessName: user.businessName,
        status: user.status,
      });
    }

    // Create success response
    const response = successResponse(
      {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          businessName: user.businessName,
          status: user.status,
          emailVerified: user.emailVerified,
        },
        requiresApproval: user.status === "pending",
      },
      "Registration successful"
    );

    // Add CORS headers
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      if (value) response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return validationErrorResponse(error);
    }

    console.error("Registration error:", error);
    const errorResp = errorResponse(
      error instanceof Error ? error.message : "Internal server error",
      error instanceof Error ? 400 : 500
    );
    
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      if (value) errorResp.headers.set(key, value);
    });
    
    return errorResp;
  }
}

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    headers: corsHeaders()
  });
}
