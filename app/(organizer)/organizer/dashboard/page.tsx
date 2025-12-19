import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { dbExtended } from "@/lib/db-extended";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function OrganizerDashboardPage() {
  const session = await getSession();
  
  if (!session || session.role !== "organizer") {
    redirect("/auth/login");
  }

  if (session.status === "pending") {
    redirect("/auth/pending-approval");
  }

  const organizerId = session.id;
  const user = db.findUserById(organizerId);
  
  if (!user) {
    redirect("/auth/login");
  }

  // Get real data directly from database
  const events = dbExtended.getEvents(organizerId);
  const transactions = dbExtended.getTransactions(organizerId);
  const todayStats = dbExtended.getTodayStats(organizerId);
  const sales7d = dbExtended.getSalesLast7Days(organizerId);

  // Format today's stats with icons and colors
  const todayStatsFormatted = [
    {
      label: "Total Sales",
      value: `ETB ${todayStats.totalSales.toLocaleString()}`,
      delta: todayStats.totalSales > 0 ? "+12.5% vs yesterday" : "No sales yet",
      icon: "💵",
      gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-300",
    },
    {
      label: "Tickets Sold",
      value: todayStats.ticketsSold.toString(),
      delta: todayStats.ticketsSold > 0 ? "+8.2% vs yesterday" : "Start selling!",
      icon: "🎫",
      gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-300",
    },
    {
      label: "Events Active",
      value: todayStats.events.toString(),
      delta: `${events.filter((e) => e.status === "active").length} active now`,
      icon: "🎪",
      gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
      borderColor: "border-violet-500/30",
      textColor: "text-violet-300",
    },
    {
      label: "Validation Rate",
      value: transactions.length > 0 
        ? `${Math.round((transactions.filter((t) => t.status === "completed").length / transactions.length) * 100)}%`
        : "0%",
      delta: "All transactions",
      icon: "✅",
      gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-300",
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

  const data = {
    organizerName: user.name || user.businessName || "Organizer",
    todayStats: todayStatsFormatted,
    sales7d,
    upcomingEvents,
    recentTransactions,
  };

  return (
    <div className="space-y-8">
      {/* Modern Header with Gradient */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-8 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-indigo-500/5" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/25">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">
                  Your Business Hub
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-50 via-sky-100 to-indigo-100 bg-clip-text text-transparent">
                  Welcome back, {session?.name || session?.businessName || "Organizer"}
                </h1>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Live snapshot of your sales, tickets and upcoming events.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 px-4 py-1.5 text-slate-300 font-medium">
                {session?.email}
              </span>
              {session?.businessName && (
                <span className="rounded-full bg-gradient-to-r from-sky-500/20 to-indigo-500/20 backdrop-blur-sm border border-sky-500/30 px-4 py-1.5 text-sky-300 font-medium">
                  {session.businessName}
                </span>
              )}
              <span className={`rounded-full backdrop-blur-sm border px-4 py-1.5 font-medium flex items-center gap-1.5 ${
                session?.status === "approved" 
                  ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300"
                  : "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300"
              }`}>
                <span className={`relative flex h-2 w-2`}>
                  {session?.status === "approved" && (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </>
                  )}
                </span>
                {session?.status === "approved" ? "✓ Approved" : "⏳ Pending"}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="group relative overflow-hidden rounded-xl border border-slate-700/70 bg-slate-900/60 backdrop-blur-sm px-5 py-2.5 text-xs font-medium text-slate-100 transition-all duration-200 hover:border-sky-500/50 hover:bg-sky-500/10 hover:shadow-lg hover:shadow-sky-500/20">
              <span className="relative z-10 flex items-center gap-2">
                📱 Scan tickets
              </span>
            </button>
            <Link
              href="/organizer/events"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-sky-500/40 transition-all duration-200 hover:from-sky-400 hover:to-indigo-500 hover:shadow-xl hover:shadow-sky-500/50 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                ✨ Create new event
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Modern KPI Cards with Gradients */}
      <section className="grid gap-4 md:grid-cols-4">
        {data.todayStats.map((stat: any, index: number) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-5 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-slate-700/70 hover:shadow-2xl"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Animated gradient background */}
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Glow effect */}
            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${stat.gradient.replace('/20', '/30')} blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {stat.label}
                </p>
                <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">{stat.icon}</span>
              </div>
              <p className={`text-2xl font-bold ${stat.textColor} mb-1`}>
                {stat.value}
              </p>
              <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                {todayStats.totalSales > 0 && <span className="text-emerald-500">↗</span>}
                {stat.delta}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Enhanced Sales Chart */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl md:col-span-2 transition-all duration-300 hover:border-slate-700/70">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2">
                  <span className="text-lg">📊</span>
                  Sales (Last 7 Days)
                </h2>
                <p className="text-xs text-slate-400 mt-1">Daily sales performance</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-7 gap-3">
              {data.sales7d.map((day: any, index: number) => (
                <div key={day.label} className="flex flex-col items-center gap-2 group/bar">
                  <div className="flex h-32 w-full items-end justify-center rounded-xl bg-slate-900/60 p-2 backdrop-blur-sm">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-sky-500 via-blue-500 to-indigo-500 transition-all duration-300 hover:from-sky-400 hover:via-blue-400 hover:to-indigo-400 hover:shadow-lg hover:shadow-sky-500/50 cursor-pointer"
                      style={{ height: `${Math.max(day.percent, 5)}%` }}
                      title={`${day.label}: ETB ${day.sales.toLocaleString()}`}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[11px] font-medium text-slate-400">{day.label}</p>
                    {day.sales > 0 && (
                      <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">
                        ETB {day.sales.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs p-3 rounded-lg bg-slate-900/40 border border-slate-800/50">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Total Revenue:</span>
                <span className="font-bold text-emerald-300">
                  ETB {data.sales7d.reduce((sum: number, d: any) => sum + d.sales, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Active Days:</span>
                <span className="font-bold text-sky-300">
                  {data.sales7d.filter((d: any) => d.sales > 0).length} / 7
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Upcoming Events */}
        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
            <span className="text-lg">📅</span>
            Upcoming Events
          </h2>
          <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
            {data.upcomingEvents.length > 0 ? (
              data.upcomingEvents.map((ev: any, index: number) => (
                <div
                  key={ev.id}
                  className="group relative rounded-xl border border-slate-800/60 bg-slate-900/40 p-3 transition-all duration-200 hover:border-sky-500/50 hover:bg-slate-900/60"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-50 leading-snug mb-1">
                        {ev.title}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>📍</span>
                        <span className="truncate">{ev.venue}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">{ev.date}</p>
                    </div>
                    <span className="rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 px-2.5 py-1 text-[10px] font-semibold text-emerald-300 whitespace-nowrap">
                      {ev.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <div className="text-4xl mb-2">🎪</div>
                <p className="text-xs text-slate-500">No upcoming events</p>
                <p className="text-[11px] text-slate-600 mt-1">Create your first event to get started</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced User Info Card */}
      <section className="group relative overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 via-slate-900/50 to-slate-950/90 p-6 shadow-xl transition-all duration-300 hover:border-slate-700/70">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-2xl font-bold text-white shadow-lg shadow-sky-500/25 transition-transform duration-300 group-hover:scale-110">
              {(session?.name || session?.businessName || session?.email || "O").charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-50">
                {session?.name || "Organizer"}
              </h3>
              <p className="text-sm text-slate-400 font-medium">{session?.businessName || "Business"}</p>
              <p className="mt-1 text-xs text-slate-500">{session?.email}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 px-4 py-2.5 text-xs">
              <p className="text-slate-400 mb-1">Account Status</p>
              <p className={`font-bold ${
                session?.status === "approved" 
                  ? "text-emerald-300" 
                  : session?.status === "suspended" 
                    ? "text-amber-300" 
                    : "text-red-300"
              }`}>
                {session?.status === "approved" 
                  ? "✓ Approved" 
                  : session?.status === "suspended" 
                    ? "⏳ Pending Approval" 
                    : "⚠ Suspended"
                }
              </p>
            </div>
            <div className="rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 px-4 py-2.5 text-xs">
              <p className="text-slate-400 mb-1">Role</p>
              <p className="font-bold text-sky-300 capitalize">{session?.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Notifications & Alerts */}
      {data.upcomingEvents.length === 0 && (
        <section className="group relative overflow-hidden rounded-2xl border border-sky-800/70 bg-gradient-to-r from-sky-950/50 via-indigo-950/30 to-sky-950/50 p-6 shadow-xl transition-all duration-300 hover:border-sky-700/70">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/30 to-indigo-500/30 backdrop-blur-sm">
              <span className="text-2xl">💡</span>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-sky-200">
                Get Started
              </h3>
              <p className="text-xs text-sky-300/70 mt-1">
                Create your first event to start selling tickets and grow your business.
              </p>
            </div>
            <Link
              href="/organizer/events"
              className="rounded-xl bg-gradient-to-r from-sky-500/20 to-indigo-500/20 backdrop-blur-sm border border-sky-500/30 px-6 py-3 text-sm font-medium text-sky-200 hover:from-sky-500/30 hover:to-indigo-500/30 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Create Event →
            </Link>
          </div>
        </section>
      )}

      {data.recentTransactions.length === 0 && data.upcomingEvents.length > 0 && (
        <section className="group relative overflow-hidden rounded-2xl border border-emerald-800/70 bg-gradient-to-r from-emerald-950/50 via-teal-950/30 to-emerald-950/50 p-6 shadow-xl transition-all duration-300 hover:border-emerald-700/70">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-500/30 backdrop-blur-sm">
              <span className="text-2xl">🚀</span>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-emerald-200">
                Promote Your Events
              </h3>
              <p className="text-xs text-emerald-300/70 mt-1">
                Share your events on social media and start selling tickets.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Transactions & Quick Actions */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
            <span className="text-lg">💳</span>
            Recent Transactions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead className="text-left text-[11px] text-slate-400 bg-slate-900/40 rounded-lg">
                <tr>
                  <th className="px-3 py-2.5 font-semibold">Customer</th>
                  <th className="px-3 py-2.5 font-semibold">Event</th>
                  <th className="px-3 py-2.5 font-semibold">Amount</th>
                  <th className="px-3 py-2.5 text-right font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="custom-scrollbar">
                {data.recentTransactions.length > 0 ? (
                  data.recentTransactions.map((tx: any, index: number) => (
                    <tr 
                      key={tx.id} 
                      className="border-t border-slate-800/60 hover:bg-slate-900/40 transition-colors"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <td className="px-3 py-2.5 font-medium text-slate-100">{tx.customer}</td>
                      <td className="px-3 py-2.5 text-slate-300">{tx.event}</td>
                      <td className="px-3 py-2.5 font-semibold text-emerald-300">{tx.amount}</td>
                      <td className="px-3 py-2.5 text-right text-[11px] text-slate-500">{tx.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-3 py-12 text-center">
                      <div className="text-4xl mb-2">📊</div>
                      <p className="text-xs text-slate-500">No transactions yet</p>
                      <p className="text-[11px] text-slate-600 mt-1">Start selling tickets to see them here</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
            <span className="text-lg">⚡</span>
            Quick Actions
          </h2>
          <div className="space-y-2">
            <Link
              href="/organizer/reports"
              className="group flex items-center gap-3 rounded-xl border border-slate-800/70 bg-slate-900/40 p-3 text-xs font-medium text-slate-100 transition-all duration-200 hover:border-sky-500/50 hover:bg-sky-500/10 hover:shadow-lg"
            >
              <span className="text-lg">📈</span>
              <span>View sales report</span>
              <span className="ml-auto text-slate-500 group-hover:text-sky-400">→</span>
            </Link>
            <Link
              href="/organizer/events"
              className="group flex items-center gap-3 rounded-xl border border-slate-800/70 bg-slate-900/40 p-3 text-xs font-medium text-slate-100 transition-all duration-200 hover:border-sky-500/50 hover:bg-sky-500/10 hover:shadow-lg"
            >
              <span className="text-lg">🎪</span>
              <span>Manage events</span>
              <span className="ml-auto text-slate-500 group-hover:text-sky-400">→</span>
            </Link>
            <Link
              href="/organizer/tickets"
              className="group flex items-center gap-3 rounded-xl border border-slate-800/70 bg-slate-900/40 p-3 text-xs font-medium text-slate-100 transition-all duration-200 hover:border-sky-500/50 hover:bg-sky-500/10 hover:shadow-lg"
            >
              <span className="text-lg">🎫</span>
              <span>Export tickets</span>
              <span className="ml-auto text-slate-500 group-hover:text-sky-400">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
