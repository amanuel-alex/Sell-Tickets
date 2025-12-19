import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    organizerName: "Demo Events Co.",
    todayStats: [
      {
        label: "Total sales (today)",
        value: "ETB 18,450",
        delta: "+12.3% vs yesterday",
      },
      {
        label: "Tickets sold",
        value: "324",
        delta: "+8.1% vs yesterday",
      },
      {
        label: "Events active",
        value: "3",
        delta: "1 starting this weekend",
      },
      {
        label: "Validation rate",
        value: "92.4%",
        delta: "+3.2 pts vs last event",
      },
    ],
    sales7d: [
      { label: "Mon", percent: 40 },
      { label: "Tue", percent: 55 },
      { label: "Wed", percent: 35 },
      { label: "Thu", percent: 70 },
      { label: "Fri", percent: 85 },
      { label: "Sat", percent: 95 },
      { label: "Sun", percent: 60 },
    ],
    upcomingEvents: [
      {
        id: "1",
        title: "Afro Beats Night",
        date: "Sat, 21 Dec • 7:00 PM",
        venue: "Addis Arena",
        status: "On sale",
      },
      {
        id: "2",
        title: "Tech & Startup Summit",
        date: "Thu, 9 Jan • 9:00 AM",
        venue: "Hilton Addis",
        status: "Pre-sale",
      },
    ],
    recentTransactions: [
      {
        id: "tx_1",
        customer: "Abebe K.",
        event: "Afro Beats Night",
        amount: "ETB 750",
        time: "2 mins ago",
      },
      {
        id: "tx_2",
        customer: "Sara M.",
        event: "Afro Beats Night",
        amount: "ETB 1,200",
        time: "10 mins ago",
      },
      {
        id: "tx_3",
        customer: "Global Tech Ltd.",
        event: "Tech & Startup Summit",
        amount: "ETB 5,000",
        time: "32 mins ago",
      },
    ],
  });
}


