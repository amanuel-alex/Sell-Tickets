import Link from "next/link";

export default function OrganizerPromotionsPage() {
  return (
    <div className="space-y-8">
      {/* Modern Header */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-8 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-indigo-500/5" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/25">
                <span className="text-xl">🎁</span>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">
                  Marketing Tools
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-50 via-sky-100 to-indigo-100 bg-clip-text text-transparent">
                  Promo Codes & Featured
                </h1>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Manage discount codes and request featured placement for your events.
            </p>
          </div>
          <Link
            href="/organizer/promotions/create"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/40 transition-all duration-200 hover:from-sky-400 hover:to-indigo-500 hover:shadow-xl hover:shadow-sky-500/50 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              ✨ Create Promo Code
            </span>
          </Link>
        </div>
      </header>

      {/* Quick Stats */}
      <section className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Active Codes", value: "8", icon: "🎟️", color: "emerald", gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20" },
          { label: "Total Uses", value: "1,234", icon: "📊", color: "sky", gradient: "from-sky-500/20 via-blue-500/20 to-indigo-500/20" },
          { label: "Discount Given", value: "ETB 12K", icon: "💰", color: "amber", gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20" },
          { label: "Featured Events", value: "3", icon: "⭐", color: "violet", gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20" },
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

      <section className="grid gap-4 md:grid-cols-2">
        {/* Promo Codes */}
        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2">
              <span className="text-lg">🎟️</span>
              Promo Codes
            </h2>
            <button className="rounded-lg bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
              Manage
            </button>
          </div>
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-8 text-center">
            <div className="text-5xl mb-3">🎁</div>
            <p className="text-sm font-medium text-slate-300 mb-1">Promo Code Management</p>
            <p className="text-xs text-slate-500 mb-4">
              Create and manage promo codes with % discount, fixed amounts, usage limits, and validity periods.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["% Discount", "Fixed Amount", "Usage Limits", "Validity"].map((feature) => (
                <span key={feature} className="rounded-full bg-slate-800/60 px-3 py-1 text-[10px] text-slate-400">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Listings */}
        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2">
              <span className="text-lg">⭐</span>
              Featured Listings
            </h2>
            <button className="rounded-lg bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
              Request
            </button>
          </div>
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-8 text-center">
            <div className="text-5xl mb-3">⭐</div>
            <p className="text-sm font-medium text-slate-300 mb-1">Featured Placement</p>
            <p className="text-xs text-slate-500 mb-4">
              Request featured placement for your events with status tracking and pricing information.
            </p>
            <div className="space-y-2">
              <div className="rounded-lg bg-slate-800/60 p-3">
                <p className="text-[11px] text-slate-500 mb-1">Active Featured</p>
                <p className="text-lg font-bold text-violet-300">3 events</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
