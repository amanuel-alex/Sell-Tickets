export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Modern Header */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-8 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-sky-500/5" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
              <span className="text-xl">📈</span>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">
                Data Insights
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-50 via-slate-100 to-slate-200 bg-clip-text text-transparent">
                Analytics & Performance
              </h1>
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            User analytics, sales analytics and platform performance metrics with advanced charts.
          </p>
        </div>
      </header>

      {/* Analytics Cards */}
      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "User Analytics",
            icon: "👥",
            gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
            borderColor: "border-blue-500/30",
            features: [
              "User growth trends",
              "Demographics analysis",
              "Retention & churn rates",
              "Engagement metrics",
            ],
          },
          {
            title: "Sales Analytics",
            icon: "💰",
            gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
            borderColor: "border-emerald-500/30",
            features: [
              "Revenue by category",
              "Top performing events",
              "Peak booking times",
              "Geographic distribution",
            ],
          },
          {
            title: "Platform Performance",
            icon: "⚡",
            gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
            borderColor: "border-violet-500/30",
            features: [
              "App downloads & traffic",
              "Conversion funnel analysis",
              "Bottleneck identification",
              "Performance optimization",
            ],
          },
        ].map((card, index) => (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-slate-700/70"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/60 text-2xl">
                  {card.icon}
                </div>
                <h2 className="text-base font-bold text-slate-50">{card.title}</h2>
              </div>
              <ul className="space-y-2.5">
                {card.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="text-emerald-400 mt-0.5">▸</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full rounded-lg bg-slate-800/60 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Chart Placeholders */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
            <span className="text-lg">📊</span>
            User Growth Trend
          </h2>
          <div className="h-64 rounded-xl bg-slate-900/40 border border-slate-800/50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-xs text-slate-500">Chart visualization</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
            <span className="text-lg">💵</span>
            Revenue Breakdown
          </h2>
          <div className="h-64 rounded-xl bg-slate-900/40 border border-slate-800/50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-xs text-slate-500">Chart visualization</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
