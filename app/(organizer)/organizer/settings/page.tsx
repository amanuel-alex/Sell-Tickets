export default function OrganizerSettingsPage() {
  return (
    <div className="space-y-8">
      {/* Modern Header */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-8 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-indigo-500/5" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/25">
              <span className="text-xl">⚙️</span>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">
                Configuration
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-50 via-sky-100 to-indigo-100 bg-clip-text text-transparent">
                Account & Settings
              </h1>
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Business profile, payout preferences and notification settings.
          </p>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Business Profile",
            icon: "🏢",
            gradient: "from-sky-500/20 via-blue-500/20 to-indigo-500/20",
            borderColor: "border-sky-500/30",
            features: [
              "Business name & logo",
              "Contact information",
              "Business description",
              "Social media links",
            ],
          },
          {
            title: "Payment Settings",
            icon: "💳",
            gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
            borderColor: "border-emerald-500/30",
            features: [
              "Payout preferences",
              "Bank account details",
              "Mobile money wallets",
              "Payment schedules",
            ],
          },
          {
            title: "Notification Settings",
            icon: "🔔",
            gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
            borderColor: "border-violet-500/30",
            features: [
              "Email notifications",
              "SMS alerts",
              "Sales notifications",
              "Event reminders",
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
              <ul className="space-y-2.5 mb-4">
                {card.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="text-emerald-400 mt-0.5">▸</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full rounded-lg bg-slate-800/60 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                Configure →
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
