import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

const updateStatusSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  status: z.enum(["pending", "approved", "suspended"]),
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
    const validated = updateStatusSchema.parse(body);

    // Find the user
    const user = db.findUserById(validated.userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Ensure we're only updating organizers
    if (user.role !== "organizer") {
      return NextResponse.json(
        { error: "Can only update organizer accounts" },
        { status: 400 }
      );
    }

    // Update user status
    const updatedUser = db.updateUser(validated.userId, {
      status: validated.status,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update user status" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        businessName: updatedUser.businessName,
        status: updatedUser.status,
        role: updatedUser.role,
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

