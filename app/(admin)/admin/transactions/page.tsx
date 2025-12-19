export default function AdminTransactionsPage() {
  return (
    <div className="space-y-8">
      {/* Modern Header */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-8 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-sky-500/5" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
              <span className="text-xl">💳</span>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">
                Financial Operations
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-50 via-slate-100 to-slate-200 bg-clip-text text-transparent">
                Payments & Refunds
              </h1>
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Transaction list, reconciliation and refund management across all payment methods.
          </p>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Transactions", value: "12,458", icon: "📊", color: "emerald", gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20" },
          { label: "Pending", value: "234", icon: "⏳", color: "amber", gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20" },
          { label: "Refunds", value: "89", icon: "↩️", color: "red", gradient: "from-red-500/20 via-rose-500/20 to-pink-500/20" },
          { label: "Success Rate", value: "98.2%", icon: "✅", color: "green", gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20" },
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
        {/* Transactions Table */}
        <div className="md:col-span-2 rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2">
              <span className="text-lg">📋</span>
              All Transactions
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
          <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-6 text-center">
            <div className="text-5xl mb-3">💳</div>
            <p className="text-sm font-medium text-slate-300 mb-1">Transaction Management</p>
            <p className="text-xs text-slate-500">
              Implement transaction table here with status/date/payment method filters, export to CSV, and real-time updates.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {["TeleBirr", "CBE Birr", "Amole", "Bank Transfer", "Cash"].map((method) => (
                <span key={method} className="rounded-full bg-slate-800/60 px-3 py-1 text-[10px] text-slate-400">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
            <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
              <span className="text-lg">🔍</span>
              Reconciliation
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Match payments with tickets and identify failed transactions. Automated reconciliation with manual override options.
            </p>
            <div className="mt-4 rounded-lg bg-slate-900/40 p-3 border border-slate-800/50">
              <p className="text-[11px] text-slate-500 mb-2">Pending Reconciliation</p>
              <p className="text-lg font-bold text-amber-300">23 transactions</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
            <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
              <span className="text-lg">↩️</span>
              Refund Management
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Review refund requests and process approvals with automated workflow.
            </p>
            <div className="space-y-2">
              <div className="rounded-lg bg-red-950/30 border border-red-800/50 p-3">
                <p className="text-[11px] text-red-400 mb-1">Pending Refunds</p>
                <p className="text-lg font-bold text-red-300">12 requests</p>
              </div>
              <button className="w-full rounded-lg bg-red-500/20 border border-red-500/30 px-3 py-2 text-xs font-medium text-red-300 hover:bg-red-500/30 transition-colors">
                Review Refunds →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
