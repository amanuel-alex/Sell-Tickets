import Link from "next/link";

export default function OrganizerEventsPage() {
  return (
    <div className="space-y-8">
      {/* Modern Header */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-8 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-indigo-500/5" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/25">
                <span className="text-xl">🎪</span>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">
                  Event Management
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-50 via-sky-100 to-indigo-100 bg-clip-text text-transparent">
                  Manage Your Events
                </h1>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Create, manage, and track all your events in one place.
            </p>
          </div>
          <Link
            href="/organizer/events/create"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/40 transition-all duration-200 hover:from-sky-400 hover:to-indigo-500 hover:shadow-xl hover:shadow-sky-500/50 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              ✨ Create new event
            </span>
          </Link>
        </div>
      </header>

      {/* Quick Stats */}
      <section className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Events", value: "12", icon: "🎪", color: "sky", gradient: "from-sky-500/20 via-blue-500/20 to-indigo-500/20" },
          { label: "Live Now", value: "3", icon: "🔥", color: "emerald", gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20" },
          { label: "Upcoming", value: "5", icon: "📅", color: "violet", gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20" },
          { label: "Drafts", value: "4", icon: "📝", color: "amber", gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20" },
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

      <section className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
        {/* Events List */}
        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2">
              <span className="text-lg">📋</span>
              Events List
            </h2>
            <div className="flex gap-2">
              <button className="rounded-lg bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                Search
              </button>
              <button className="rounded-lg bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                Filter
              </button>
            </div>
          </div>
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-8 text-center">
            <div className="text-5xl mb-3">🎪</div>
            <p className="text-sm font-medium text-slate-300 mb-1">Event Management System</p>
            <p className="text-xs text-slate-500 mb-4">
              Implement your events table here with Draft / Active / Ended status, and actions like Edit / View / Duplicate / End.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Draft", "Active", "Ended", "Cancelled"].map((status) => (
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
              <span className="text-lg">📊</span>
              Quick Stats
            </h2>
            <ul className="space-y-3">
              {[
                { label: "Total events", value: "12", icon: "🎪" },
                { label: "Events live this week", value: "3", icon: "🔥" },
                { label: "Drafts awaiting setup", value: "4", icon: "📝" },
              ].map((stat, idx) => (
                <li key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 border border-slate-800/50">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{stat.icon}</span>
                    <span className="text-xs font-medium text-slate-300">{stat.label}</span>
                  </div>
                  <span className="text-sm font-bold text-sky-300">{stat.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
            <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
              <span className="text-lg">💡</span>
              Next Steps
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Add tabs or routes for Event Detail, Analytics, and Venue Management based on your backend design.
            </p>
            <div className="space-y-2">
              <Link
                href="/organizer/events/analytics"
                className="block rounded-lg bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
              >
                View Analytics →
              </Link>
              <Link
                href="/organizer/events/venues"
                className="block rounded-lg bg-slate-800/60 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Manage Venues →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
