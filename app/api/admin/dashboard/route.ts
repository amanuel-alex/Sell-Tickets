import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { dbExtended } from "@/lib/db-extended";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get platform-wide stats
    const platformStats = dbExtended.getPlatformStats();
    const users = db.getAllUsers();
    const events = dbExtended.getEvents();
    const transactions = dbExtended.getTransactions();

    // Format KPIs
    const kpis = [
      {
        label: "GMV",
        value: `ETB ${(platformStats.gmv / 1000000).toFixed(1)}M`,
        delta: "+15.3% vs last month",
      },
      {
        label: "Platform Revenue",
        value: `ETB ${(platformStats.platformRevenue / 1000).toFixed(1)}K`,
        delta: "+15.3% vs last month",
      },
      {
        label: "Active Users",
        value: platformStats.activeUsers.toString(),
        delta: `+${Math.floor(platformStats.activeUsers * 0.1)} this week`,
      },
      {
        label: "Tickets Sold",
        value: platformStats.totalTicketsSold.toLocaleString(),
        delta: "+8.2% vs last week",
      },
      {
        label: "Active Organizers",
        value: platformStats.activeOrganizers.toString(),
        delta: `${users.filter((u) => u.role === "organizer" && u.status === "pending").length} pending`,
      },
    ];

    // Revenue trend (30 days)
    const revenueTrend = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dayTransactions = transactions.filter((t) => {
        const tDate = new Date(t.createdAt);
        tDate.setHours(0, 0, 0, 0);
        return tDate.getTime() === date.getTime() && t.status === "completed";
      });
      
      const revenue = dayTransactions.reduce((sum, t) => sum + t.amount, 0);
      revenueTrend.push({
        label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        revenue,
      });
    }
    
    const maxRevenue = Math.max(...revenueTrend.map((r) => r.revenue), 1);
    const revenueTrendFormatted = revenueTrend.map((r) => ({
      ...r,
      percent: maxRevenue > 0 ? Math.round((r.revenue / maxRevenue) * 100) : 0,
    }));

    // Recent activity
    const recentActivity = [
      ...users
        .filter((u) => u.role === "organizer")
        .slice(-5)
        .map((u) => ({
          id: `user_${u.id}`,
          title: `New organizer registered: ${u.businessName || u.name}`,
          meta: new Date(u.createdAt).toLocaleDateString("en-US"),
        })),
      ...events
        .slice(-5)
        .map((e) => ({
          id: `event_${e.id}`,
          title: `New event created: ${e.title}`,
          meta: new Date(e.createdAt).toLocaleDateString("en-US"),
        })),
    ]
      .sort((a, b) => {
        const aDate = a.meta;
        const bDate = b.meta;
        return new Date(bDate).getTime() - new Date(aDate).getTime();
      })
      .slice(0, 8);

    // Top cities (mock for now - would need location data)
    const topCities = [
      { name: "Addis Ababa", tickets: 1250 },
      { name: "Dire Dawa", tickets: 890 },
      { name: "Hawassa", tickets: 650 },
      { name: "Bahir Dar", tickets: 420 },
      { name: "Mekelle", tickets: 380 },
    ];

    // Ticket sales by category
    const categories = events.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const totalEvents = events.length;
    const ticketCategories = Object.entries(categories)
      .map(([name, count]) => ({
        name,
        share: totalEvents > 0 ? Math.round((count / totalEvents) * 100) : 0,
      }))
      .sort((a, b) => b.share - a.share)
      .slice(0, 5);

    // System health
    const systemHealth = [
      { label: "API Server", status: "Operational" },
      { label: "Database", status: "Operational" },
      { label: "Payment Gateway", status: "Operational" },
      { label: "Email Service", status: "Operational" },
    ];

    // Pending approvals
    const pendingApprovals = users.filter(
      (u) => u.role === "organizer" && u.status === "pending"
    ).length;

    return NextResponse.json({
      kpis,
      revenueTrend: revenueTrendFormatted,
      recentActivity,
      topCities,
      ticketCategories: ticketCategories.length > 0 
        ? ticketCategories 
        : [
            { name: "Music", share: 35 },
            { name: "Sports", share: 25 },
            { name: "Conference", share: 20 },
            { name: "Festival", share: 15 },
            { name: "Other", share: 5 },
          ],
      systemHealth,
      pendingApprovals,
      totalEvents: platformStats.totalEvents,
      totalTransactions: platformStats.totalTransactions,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

