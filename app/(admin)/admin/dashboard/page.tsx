import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { dbExtended } from "@/lib/db-extended";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await getSession();
  
  if (!session || session.role !== "admin") {
    redirect("/auth/login");
  }

  // Get platform-wide stats directly from database
  const platformStats = dbExtended.getPlatformStats();
  const users = db.getAllUsers();
  const events = dbExtended.getEvents();
  const transactions = dbExtended.getTransactions();

  // Format KPIs with icons and colors
  const kpis = [
    {
      label: "GMV",
      value: `ETB ${(platformStats.gmv / 1000000).toFixed(1)}M`,
      delta: "+15.3% vs last month",
      icon: "💰",
      gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-300",
    },
    {
      label: "Platform Revenue",
      value: `ETB ${(platformStats.platformRevenue / 1000).toFixed(1)}K`,
      delta: "+15.3% vs last month",
      icon: "💎",
      gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
      borderColor: "border-violet-500/30",
      textColor: "text-violet-300",
    },
    {
      label: "Active Users",
      value: platformStats.activeUsers.toString(),
      delta: `+${Math.floor(platformStats.activeUsers * 0.1)} this week`,
      icon: "👥",
      gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-300",
    },
    {
      label: "Tickets Sold",
      value: platformStats.totalTicketsSold.toLocaleString(),
      delta: "+8.2% vs last week",
      icon: "🎫",
      gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-300",
    },
    {
      label: "Active Organizers",
      value: platformStats.activeOrganizers.toString(),
      delta: `${users.filter((u) => u.role === "organizer" && u.status === "pending").length} pending`,
      icon: "🏢",
      gradient: "from-pink-500/20 via-rose-500/20 to-red-500/20",
      borderColor: "border-pink-500/30",
      textColor: "text-pink-300",
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
      date: date.toISOString(),
    });
  }
  
  const maxRevenue = Math.max(...revenueTrend.map((r) => r.revenue), 1);
  const revenueTrendFormatted = revenueTrend.map((r) => ({
    ...r,
    percent: maxRevenue > 0 ? Math.round((r.revenue / maxRevenue) * 100) : 0,
  }));

  // Recent activity with icons
  const recentActivity = [
    ...users
      .filter((u) => u.role === "organizer")
      .slice(-5)
      .map((u) => ({
        id: `user_${u.id}`,
        title: `New organizer registered: ${u.businessName || u.name}`,
        meta: new Date(u.createdAt).toLocaleDateString("en-US"),
        icon: "👤",
        type: "user",
      })),
    ...events
      .slice(-5)
      .map((e) => ({
        id: `event_${e.id}`,
        title: `New event created: ${e.title}`,
        meta: new Date(e.createdAt).toLocaleDateString("en-US"),
        icon: "🎪",
        type: "event",
      })),
  ]
    .sort((a, b) => {
      const aDate = a.meta;
      const bDate = b.meta;
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    })
    .slice(0, 8);

  // Top cities with progress bars
  const topCities = [
    { name: "Addis Ababa", tickets: 1250, color: "from-emerald-500 to-teal-500" },
    { name: "Dire Dawa", tickets: 890, color: "from-blue-500 to-cyan-500" },
    { name: "Hawassa", tickets: 650, color: "from-violet-500 to-purple-500" },
    { name: "Bahir Dar", tickets: 420, color: "from-pink-500 to-rose-500" },
    { name: "Mekelle", tickets: 380, color: "from-amber-500 to-orange-500" },
  ];
  const maxTickets = Math.max(...topCities.map((c) => c.tickets), 1);

  // Ticket sales by category with visual bars
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

  const categoryColors = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-violet-500 to-indigo-500",
  ];

  // System health with status indicators
  const systemHealth = [
    { label: "API Server", status: "Operational", uptime: "99.98%", color: "emerald" },
    { label: "Database", status: "Operational", uptime: "100%", color: "emerald" },
    { label: "Payment Gateway", status: "Operational", uptime: "99.95%", color: "emerald" },
    { label: "Email Service", status: "Operational", uptime: "99.92%", color: "emerald" },
  ];

  const data = {
    kpis,
    revenueTrend: revenueTrendFormatted,
    recentActivity,
    topCities,
    ticketCategories,
    systemHealth,
    pendingApprovals: users.filter((u) => u.role === "organizer" && u.status === "pending").length,
  };

  return (
    <div className="space-y-8">
      {/* Modern Header with Gradient */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-8 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-sky-500/5" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
                <span className="text-xl">📊</span>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">
                  Platform Control Center
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-50 via-slate-100 to-slate-200 bg-clip-text text-transparent">
                  Dashboard Overview
                </h1>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Real-time platform analytics, user management, and system health monitoring.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 px-4 py-1.5 text-slate-300 font-medium">
                {session?.email || "admin@example.com"}
              </span>
              <span className="rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-sm border border-violet-500/30 px-4 py-1.5 text-violet-300 font-medium">
                Admin Account
              </span>
              <span className="rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-500/30 px-4 py-1.5 text-emerald-300 font-medium flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Live
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Modern KPI Cards with Gradients */}
      <section className="grid gap-4 md:grid-cols-5">
        {data.kpis.map((kpi: any, index: number) => (
          <div
            key={kpi.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-5 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-slate-700/70 hover:shadow-2xl"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Animated gradient background */}
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${kpi.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Glow effect */}
            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${kpi.gradient.replace('/20', '/30')} blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {kpi.label}
                </p>
                <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">{kpi.icon}</span>
              </div>
              <p className={`text-2xl font-bold ${kpi.textColor} mb-1`}>
                {kpi.value}
              </p>
              <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="text-emerald-500">↗</span>
                {kpi.delta}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Enhanced Revenue Chart */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="group relative overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl md:col-span-2 transition-all duration-300 hover:border-slate-700/70">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2">
                  <span className="text-lg">📈</span>
                  Revenue Trend (30 Days)
                </h2>
                <p className="text-xs text-slate-400 mt-1">Daily platform revenue</p>
              </div>
            </div>
            <div className="mt-6 flex h-48 items-end gap-1.5 rounded-xl bg-slate-900/60 p-4 backdrop-blur-sm">
              {data.revenueTrend.map((point: any, index: number) => (
                <div
                  key={point.label}
                  className="group/bar flex-1 flex flex-col items-center gap-1"
                  title={`${point.label}: ETB ${point.revenue.toLocaleString()}`}
                >
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-violet-500 via-purple-500 to-pink-500 transition-all duration-300 hover:from-violet-400 hover:via-purple-400 hover:to-pink-400 hover:shadow-lg hover:shadow-violet-500/50 cursor-pointer"
                    style={{ height: `${Math.max(point.percent, 5)}%` }}
                  />
                  {index % 5 === 0 && (
                    <p className="text-[10px] text-slate-500 mt-1">{point.label.split(' ')[0]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Total Revenue:</span>
                <span className="font-bold text-emerald-300">
                  ETB {data.revenueTrend.reduce((sum: number, r: any) => sum + r.revenue, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Daily Average:</span>
                <span className="font-bold text-violet-300">
                  ETB {Math.round(data.revenueTrend.reduce((sum: number, r: any) => sum + r.revenue, 0) / data.revenueTrend.length).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Activity Feed */}
        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
            <span className="text-lg">⚡</span>
            Recent Activity
          </h2>
          <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            {data.recentActivity.length > 0 ? (
              data.recentActivity.map((item: any, index: number) => (
                <div
                  key={item.id}
                  className="group relative rounded-xl border border-slate-800/60 bg-slate-900/40 p-3 transition-all duration-200 hover:border-slate-700/60 hover:bg-slate-900/60"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 text-base">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-50 leading-snug">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">{item.meta}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-slate-500">
                No recent activity
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Alerts & Notifications */}
      {data.pendingApprovals > 0 && (
        <section className="group relative overflow-hidden rounded-2xl border border-amber-800/70 bg-gradient-to-r from-amber-950/50 via-orange-950/30 to-amber-950/50 p-6 shadow-xl transition-all duration-300 hover:border-amber-700/70">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 backdrop-blur-sm">
                <svg className="h-7 w-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-amber-200">
                  {data.pendingApprovals} Organizer{data.pendingApprovals > 1 ? "s" : ""} Pending Approval
                </h3>
                <p className="text-xs text-amber-300/70 mt-1">
                  Review and approve new organizer applications
                </p>
              </div>
            </div>
            <Link
              href="/admin/organizers"
              className="rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 px-6 py-3 text-sm font-medium text-amber-200 hover:from-amber-500/30 hover:to-orange-500/30 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Review Now →
            </Link>
          </div>
        </section>
      )}

      {/* Enhanced Stats Grid */}
      <section className="grid gap-4 md:grid-cols-3">
        {/* Top Cities with Progress Bars */}
        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
            <span className="text-lg">🌍</span>
            Top Cities
          </h2>
          <div className="space-y-4">
            {data.topCities.map((city: any, index: number) => (
              <div key={city.name} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-100">{city.name}</span>
                  <span className="text-slate-400">{city.tickets.toLocaleString()} tickets</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800/60 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${city.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${(city.tickets / maxTickets) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories with Visual Bars */}
        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
            <span className="text-lg">🎯</span>
            Categories
          </h2>
          <div className="space-y-4">
            {data.ticketCategories.map((c: any, index: number) => (
              <div key={c.name} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-100">{c.name}</span>
                  <span className="text-slate-400">{c.share}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800/60 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${categoryColors[index % categoryColors.length]} transition-all duration-1000 ease-out`}
                    style={{ width: `${c.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health with Status Indicators */}
        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
            <span className="text-lg">💚</span>
            System Health
          </h2>
          <div className="space-y-3">
            {data.systemHealth.map((item: any) => (
              <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 border border-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className={`relative flex h-2.5 w-2.5`}>
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${item.color}-400 opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 bg-${item.color}-500`}></span>
                  </div>
                  <span className="text-xs font-medium text-slate-100">{item.label}</span>
                </div>
                <div className="text-right">
                  <p className={`text-[11px] font-semibold text-${item.color}-300`}>{item.status}</p>
                  <p className="text-[10px] text-slate-500">{item.uptime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
