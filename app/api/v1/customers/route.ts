import { NextRequest } from "next/server";
import { dbExtended } from "@/lib/db-extended";
import { requireOrganizer } from "@/lib/api-auth";
import { successResponse, errorResponse } from "@/lib/api-utils";

// GET /api/v1/customers - List customers
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireOrganizer(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const { context } = authResult;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // Get all transactions for this organizer
    const transactions = dbExtended.getTransactions(context.user.id);

    // Group by customer email
    const customerMap = new Map<
      string,
      {
        email: string;
        name: string;
        totalSpent: number;
        totalTickets: number;
        transactions: number;
        lastPurchase: string;
      }
    >();

    transactions
      .filter((t) => t.status === "completed")
      .forEach((t) => {
        const existing = customerMap.get(t.customerEmail);
        if (existing) {
          existing.totalSpent += t.amount;
          existing.totalTickets += t.quantity;
          existing.transactions += 1;
          if (new Date(t.createdAt) > new Date(existing.lastPurchase)) {
            existing.lastPurchase = t.createdAt;
          }
        } else {
          customerMap.set(t.customerEmail, {
            email: t.customerEmail,
            name: t.customerName,
            totalSpent: t.amount,
            totalTickets: t.quantity,
            transactions: 1,
            lastPurchase: t.createdAt,
          });
        }
      });

    const customers = Array.from(customerMap.values()).sort(
      (a, b) => new Date(b.lastPurchase).getTime() - new Date(a.lastPurchase).getTime()
    );

    // Pagination
    const total = customers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedCustomers = customers.slice(startIndex, startIndex + limit);

    return successResponse(
      paginatedCustomers,
      "Customers retrieved successfully",
      {
        page,
        limit,
        total,
        totalPages,
      }
    );
  } catch (error) {
    console.error("Get customers error:", error);
    return errorResponse("Failed to retrieve customers", 500);
  }
}

