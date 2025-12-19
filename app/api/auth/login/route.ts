import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";

const loginSchema = z.object({
  identifier: z.string().min(1, "Email or phone is required"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["organizer", "admin"]).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = loginSchema.parse(body);

    // Find user
    const user = db.findUser(validated.identifier);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email/phone or password" },
        { status: 401 }
      );
    }

    // Check role if specified
    if (validated.role && user.role !== validated.role) {
      return NextResponse.json(
        { error: "Invalid credentials for this role" },
        { status: 403 }
      );
    }

    // Verify password
    const isValidPassword = await db.verifyPassword(
      validated.password,
      user.password
    );
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email/phone or password" },
        { status: 401 }
      );
    }

    // Check status
    if (user.status === "suspended") {
      return NextResponse.json(
        { error: "Your account has been suspended. Please contact support." },
        { status: 403 }
      );
    }

    // Set session payload (used in all cases where we want a session cookie)
    const sessionPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      businessName: user.businessName,
      status: user.status,
    } as const;

    // If account is pending, still create a session so the pending page can read user info,
    // but return a special flag so the client redirects to /auth/pending-approval.
    if (user.status === "pending") {
      await setSession(sessionPayload);

      return NextResponse.json(
        {
          error: "Your account is pending approval",
          requiresApproval: true,
          user: sessionPayload,
        },
        { status: 403 }
      );
    }

    // Approved account: set session and proceed normally
    await setSession(sessionPayload);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        businessName: user.businessName,
        status: user.status,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

