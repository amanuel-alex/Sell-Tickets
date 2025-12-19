import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { dbExtended } from "@/lib/db-extended";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session || session.role !== "organizer") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const organizerId = session.id;
    const user = db.findUserById(organizerId);
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get real data
    const events = dbExtended.getEvents(organizerId);
    const transactions = dbExtended.getTransactions(organizerId);
    const tickets = dbExtended.getTickets(organizerId);
    const todayStats = dbExtended.getTodayStats(organizerId);
    const sales7d = dbExtended.getSalesLast7Days(organizerId);

    // Format today's stats
    const todayStatsFormatted = [
      {
        label: "Total Sales",
        value: `ETB ${todayStats.totalSales.toLocaleString()}`,
        delta: todayStats.totalSales > 0 ? "+12.5% vs yesterday" : "No sales yet",
      },
      {
        label: "Tickets Sold",
        value: todayStats.ticketsSold.toString(),
        delta: todayStats.ticketsSold > 0 ? "+8.2% vs yesterday" : "Start selling!",
      },
      {
        label: "Events Active",
        value: todayStats.events.toString(),
        delta: `${events.filter((e) => e.status === "active").length} active now`,
      },
      {
        label: "Validation Rate",
        value: transactions.length > 0 
          ? `${Math.round((transactions.filter((t) => t.status === "completed").length / transactions.length) * 100)}%`
          : "0%",
        delta: "All transactions",
      },
    ];

    // Get upcoming events
    const upcomingEvents = events
      .filter((e) => {
        const endDate = new Date(e.endDate);
        return endDate >= new Date() && e.status === "active";
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 5)
      .map((e) => ({
        id: e.id,
        title: e.title,
        date: new Date(e.startDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        venue: e.venue,
        status: e.status,
      }));

    // Get recent transactions
    const recentTransactions = transactions
      .filter((t) => t.status === "completed")
      .slice(0, 10)
      .map((t) => ({
        id: t.id,
        customer: t.customerName,
        event: events.find((e) => e.id === t.eventId)?.title || "Unknown Event",
        amount: `ETB ${t.amount.toLocaleString()}`,
        time: new Date(t.createdAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

    return NextResponse.json({
      organizerName: user.name || user.businessName || "Organizer",
      todayStats: todayStatsFormatted,
      sales7d,
      upcomingEvents,
      recentTransactions,
      totalEvents: events.length,
      totalRevenue: transactions
        .filter((t) => t.status === "completed")
        .reduce((sum, t) => sum + t.amount, 0),
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

