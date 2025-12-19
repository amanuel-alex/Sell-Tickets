import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["admin", "organizer"]),
});

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validated = createUserSchema.parse(body);

    // Check if user already exists
    const existingUser = db.findUser(validated.email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Create user (admin can create both admins and organizers)
    const user = await db.createUser({
      email: validated.email,
      password: validated.password,
      role: validated.role,
      name: validated.name,
      businessName: validated.role === "organizer" ? validated.name : undefined,
      status: validated.role === "admin" ? "approved" : "pending", // Admins auto-approved, organizers need approval
      emailVerified: false,
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          status: user.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Use the first error message if available, otherwise use a generic message
      const errorMessage = error.issues.length > 0 
        ? error.issues[0].message 
        : 'Invalid request data';
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

