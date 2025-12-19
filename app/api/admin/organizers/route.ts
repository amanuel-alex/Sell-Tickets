import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    // Check if user is authenticated and is an admin
    const session = await getSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    // Get all organizers
    const allUsers = db.getAllUsers();
    const organizers = allUsers
      .filter((u) => u.role === "organizer")
      .map((u) => ({
        id: u.id,
        email: u.email,
        phone: u.phone,
        name: u.name,
        businessName: u.businessName,
        status: u.status,
        emailVerified: u.emailVerified,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
      }))
      .sort((a, b) => {
        // Sort by status: pending first, then approved, then suspended
        const statusOrder = { pending: 0, approved: 1, suspended: 2 };
        const statusDiff = statusOrder[a.status] - statusOrder[b.status];
        if (statusDiff !== 0) return statusDiff;
        // Then by creation date (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

    // Get counts
    const counts = {
      total: organizers.length,
      pending: organizers.filter((o) => o.status === "pending").length,
      approved: organizers.filter((o) => o.status === "approved").length,
      suspended: organizers.filter((o) => o.status === "suspended").length,
    };

    return NextResponse.json({
      organizers,
      counts,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

