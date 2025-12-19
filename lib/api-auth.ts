import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { unauthorizedResponse, forbiddenResponse } from "@/lib/api-utils";

export interface ApiContext {
  user: {
    id: string;
    email: string;
    role: "organizer" | "admin";
    name?: string;
    businessName?: string;
    status: "pending" | "approved" | "suspended" | "rejected";
  };
  isAdmin: boolean;
  isOrganizer: boolean;
}

/**
 * Middleware to require authentication
 */
export async function requireAuth(
  request: NextRequest
): Promise<{ context: ApiContext } | { response: NextResponse }> {
  const session = await getSession();

  if (!session) {
    return { response: unauthorizedResponse() };
  }

  if (session.status === "suspended") {
    return { response: forbiddenResponse() };
  }

  return {
    context: {
      user: session,
      isAdmin: session.role === "admin",
      isOrganizer: session.role === "organizer",
    },
  };
}

/**
 * Middleware to require admin role
 */
export async function requireAdmin(
  request: NextRequest
): Promise<{ context: ApiContext } | { response: NextResponse }> {
  const authResult = await requireAuth(request);
  if ("response" in authResult) {
    return authResult;
  }

  if (!authResult.context.isAdmin) {
    return { response: forbiddenResponse() };
  }

  return authResult;
}

/**
 * Middleware to require organizer role
 */
export async function requireOrganizer(
  request: NextRequest
): Promise<{ context: ApiContext } | { response: NextResponse }> {
  const authResult = await requireAuth(request);
  if ("response" in authResult) {
    return authResult;
  }

  if (!authResult.context.isOrganizer) {
    return { response: forbiddenResponse() };
  }

  if (authResult.context.user.status === "pending") {
    return {
      response: NextResponse.json(
        {
          success: false,
          error: "Account pending approval",
        },
        { status: 403 }
      ),
    };
  }

  return authResult;
}

/**
 * Middleware to require organizer ownership or admin
 */
export async function requireOwnershipOrAdmin(
  request: NextRequest,
  resourceOrganizerId: string
): Promise<{ context: ApiContext } | { response: NextResponse }> {
  const authResult = await requireAuth(request);
  if ("response" in authResult) {
    return authResult;
  }

  const { context } = authResult;

  // Admin can access anything
  if (context.isAdmin) {
    return authResult;
  }

  // Organizer can only access their own resources
  if (context.isOrganizer && context.user.id === resourceOrganizerId) {
    return authResult;
  }

  return { response: forbiddenResponse() };
}

