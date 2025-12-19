export default function OrganizerCustomersPage() {
  return (
    <div className="space-y-8">
      {/* Modern Header */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-8 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-indigo-500/5" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/25">
              <span className="text-xl">👥</span>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">
                Customer Management
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-50 via-sky-100 to-indigo-100 bg-clip-text text-transparent">
                Customer Directory
              </h1>
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Customer list, booking history and basic analytics.
          </p>
        </div>
      </header>

      {/* Quick Stats */}
      <section className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Customers", value: "3,456", icon: "👥", color: "sky", gradient: "from-sky-500/20 via-blue-500/20 to-indigo-500/20" },
          { label: "Repeat Buyers", value: "892", icon: "🔄", color: "emerald", gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20" },
          { label: "Avg. Spend", value: "ETB 450", icon: "💰", color: "amber", gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20" },
          { label: "This Month", value: "+234", icon: "📈", color: "violet", gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20" },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-5 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-slate-700/70"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {stat.label}
                </p>
                <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">{stat.icon}</span>
              </div>
              <p className={`text-2xl font-bold text-${stat.color}-300`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-[2fr,1.1fr]">
        {/* Customer List */}
        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2">
              <span className="text-lg">📋</span>
              Customer List
            </h2>
            <div className="flex gap-2">
              <button className="rounded-lg bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                Search
              </button>
              <button className="rounded-lg bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                Export
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-8 text-center">
            <div className="text-5xl mb-3">👥</div>
            <p className="text-sm font-medium text-slate-300 mb-1">Customer Management</p>
            <p className="text-xs text-slate-500 mb-4">
              Implement customer table here with search, filters, view profile and booking history.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["All", "Active", "VIP", "New"].map((filter) => (
                <span key={filter} className="rounded-full bg-slate-800/60 px-3 py-1 text-[10px] text-slate-400">
                  {filter}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
            <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
              <span className="text-lg">📊</span>
              Customer Analytics
            </h2>
            <div className="space-y-3">
              <div className="rounded-lg bg-slate-900/40 p-3 border border-slate-800/50">
                <p className="text-[11px] text-slate-500 mb-1">Repeat Customers</p>
                <p className="text-lg font-bold text-emerald-300">25.8%</p>
              </div>
              <div className="rounded-lg bg-slate-900/40 p-3 border border-slate-800/50">
                <p className="text-[11px] text-slate-500 mb-1">Preferred Category</p>
                <p className="text-sm font-semibold text-sky-300">Music Events</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
            <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
              <span className="text-lg">📧</span>
              Contact Customers
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Email/SMS campaigns and export lists for marketing.
            </p>
            <div className="space-y-2">
              <button className="w-full rounded-lg bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                Send Email →
              </button>
              <button className="w-full rounded-lg bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                Export List →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
