import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    kpis: [
      {
        label: "GMV (30 days)",
        value: "ETB 4.2M",
        delta: "+18.4% vs last 30 days",
      },
      {
        label: "Platform revenue",
        value: "ETB 320K",
        delta: "+12.1% vs last 30 days",
      },
      {
        label: "Active users",
        value: "18,240",
        delta: "+6.5% vs last 30 days",
      },
      {
        label: "Tickets sold",
        value: "56,890",
        delta: "+9.3% vs last 30 days",
      },
      {
        label: "Active organizers",
        value: "214",
        delta: "+11 new this week",
      },
    ],
    revenueTrend: [
      { label: "Week 1", percent: 40 },
      { label: "Week 2", percent: 55 },
      { label: "Week 3", percent: 70 },
      { label: "Week 4", percent: 85 },
    ],
    recentActivity: [
      {
        id: "a1",
        title: "New organizer approved: Skyline Events",
        meta: "5 mins ago • by Super Admin",
      },
      {
        id: "a2",
        title: "Refund processed: TX-849302",
        meta: "23 mins ago • ETB 1,200 • Stripe",
      },
      {
        id: "a3",
        title: "Event flagged for review: Night Fiesta",
        meta: "1 hour ago • high dispute rate",
      },
    ],
    topCities: [
      { name: "Addis Ababa", tickets: 32450 },
      { name: "Dire Dawa", tickets: 6800 },
      { name: "Hawassa", tickets: 5120 },
      { name: "Bahir Dar", tickets: 4012 },
    ],
    ticketCategories: [
      { name: "Music & Concerts", share: 42 },
      { name: "Conferences", share: 23 },
      { name: "Sports", share: 18 },
      { name: "Festivals", share: 10 },
      { name: "Other", share: 7 },
    ],
    systemHealth: [
      { label: "API uptime (24h)", status: "99.98%" },
      { label: "Payment gateway", status: "Operational" },
      { label: "Ticket validation", status: "Operational" },
      { label: "Fraud monitoring", status: "No alerts" },
    ],
  });
}


