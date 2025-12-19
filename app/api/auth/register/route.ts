import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  role: z.enum(["organizer"]).default("organizer"), // Only organizers can register publicly
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = db.findUser(validated.email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Security: Only allow organizer registration through public API
    // Admin accounts must be created by existing admins or through backend
    if (validated.role !== "organizer") {
      return NextResponse.json(
        { error: "Admin registration is not allowed through public API" },
        { status: 403 }
      );
    }

    // Create user (always organizer, always pending approval)
    const user = await db.createUser({
      email: validated.email,
      phone: validated.phone,
      password: validated.password,
      role: "organizer",
      name: validated.name,
      businessName: validated.businessName,
      status: "pending", // All organizers require approval
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

    return NextResponse.json(
      {
        success: true,
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
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

