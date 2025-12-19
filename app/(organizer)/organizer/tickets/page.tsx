import Link from "next/link";

export default function OrganizerTicketsPage() {
  return (
    <div className="space-y-8">
      {/* Modern Header */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-8 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-indigo-500/5" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/25">
              <span className="text-xl">🎫</span>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">
                Ticket Management
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-50 via-sky-100 to-indigo-100 bg-clip-text text-transparent">
                Tickets & Check-in
              </h1>
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Manage tickets sold, validation, QR scan and check-in reports.
          </p>
        </div>
      </header>

      {/* Quick Stats */}
      <section className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Sold", value: "1,234", icon: "🎫", color: "sky", gradient: "from-sky-500/20 via-blue-500/20 to-indigo-500/20" },
          { label: "Validated", value: "892", icon: "✅", color: "emerald", gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20" },
          { label: "Pending", value: "342", icon: "⏳", color: "amber", gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20" },
          { label: "Check-in Rate", value: "72.3%", icon: "📊", color: "violet", gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20" },
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

      <section className="grid gap-4 md:grid-cols-3">
        {/* Tickets List */}
        <div className="md:col-span-2 rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2">
              <span className="text-lg">📋</span>
              Tickets Sold List
            </h2>
            <div className="flex gap-2">
              <button className="rounded-lg bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                Export CSV
              </button>
              <button className="rounded-lg bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                Filter
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-8 text-center">
            <div className="text-5xl mb-3">🎫</div>
            <p className="text-sm font-medium text-slate-300 mb-1">Ticket Management System</p>
            <p className="text-xs text-slate-500 mb-4">
              Add your tickets table here with filters by Status / Date / Event, search by Ticket ID / Customer, and export to CSV.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Valid", "Used", "Pending", "Cancelled"].map((status) => (
                <span key={status} className="rounded-full bg-slate-800/60 px-3 py-1 text-[10px] text-slate-400">
                  {status}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
            <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
              <span className="text-lg">📱</span>
              Validation
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              QR scanner (webcam) and manual entry form for ticket validation.
            </p>
            <button className="w-full rounded-lg bg-gradient-to-r from-sky-500/20 to-indigo-500/20 border border-sky-500/30 px-4 py-3 text-xs font-medium text-sky-300 hover:from-sky-500/30 hover:to-indigo-500/30 transition-all">
              Open Scanner →
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
            <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
              <span className="text-lg">📊</span>
              Check-in Reports
            </h2>
            <div className="space-y-3">
              <div className="rounded-lg bg-slate-900/40 p-3 border border-slate-800/50">
                <p className="text-[11px] text-slate-500 mb-1">Attendance</p>
                <p className="text-lg font-bold text-emerald-300">892 / 1,234</p>
              </div>
              <div className="rounded-lg bg-slate-900/40 p-3 border border-slate-800/50">
                <p className="text-[11px] text-slate-500 mb-1">No-shows</p>
                <p className="text-lg font-bold text-amber-300">342</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
