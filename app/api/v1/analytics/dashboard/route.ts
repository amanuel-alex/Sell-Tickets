import { NextRequest } from "next/server";
import { dbExtended } from "@/lib/db-extended";
import { requireOrganizer } from "@/lib/api-auth";
import { successResponse, errorResponse } from "@/lib/api-utils";

// GET /api/v1/analytics/dashboard - Get dashboard analytics
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireOrganizer(request);
    if ("response" in authResult) {
      return authResult.response;
    }

    const { context } = authResult;
    const organizerId = context.user.id;

    // Get stats
    const todayStats = dbExtended.getTodayStats(organizerId);
    const sales7d = dbExtended.getSalesLast7Days(organizerId);
    const events = dbExtended.getEvents(organizerId);
    const transactions = dbExtended.getTransactions(organizerId);

    // Calculate totals
    const totalRevenue = transactions
      .filter((t) => t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalTicketsSold = transactions
      .filter((t) => t.status === "completed")
      .reduce((sum, t) => sum + t.quantity, 0);

    return successResponse(
      {
        today: {
          sales: todayStats.totalSales,
          ticketsSold: todayStats.ticketsSold,
          events: todayStats.events,
          transactions: todayStats.transactions,
        },
        sales7d: sales7d.map((d) => ({
          date: d.date,
          label: d.label,
          sales: d.sales,
          count: d.count,
        })),
        totals: {
          revenue: totalRevenue,
          ticketsSold: totalTicketsSold,
          events: events.length,
          activeEvents: events.filter((e) => e.status === "active").length,
        },
      },
      "Dashboard analytics retrieved successfully"
    );
  } catch (error) {
    console.error("Get analytics error:", error);
    return errorResponse("Failed to retrieve analytics", 500);
  }
}

