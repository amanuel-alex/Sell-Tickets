import Link from "next/link";

export default function OrganizerHelpPage() {
  return (
    <div className="space-y-8">
      {/* Modern Header */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-8 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-indigo-500/5" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/25">
              <span className="text-xl">💬</span>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">
                Support Center
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-50 via-sky-100 to-indigo-100 bg-clip-text text-transparent">
                Help & Support
              </h1>
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Get help, browse documentation, and contact our support team.
          </p>
        </div>
      </header>

      {/* Quick Help Cards */}
      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Getting Started",
            icon: "🚀",
            gradient: "from-sky-500/20 via-blue-500/20 to-indigo-500/20",
            items: ["Create your first event", "Set up tickets", "Payment methods", "Promote events"],
          },
          {
            title: "Managing Events",
            icon: "🎪",
            gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
            items: ["Edit event details", "Manage tickets", "Check-in process", "Event analytics"],
          },
          {
            title: "Payments & Payouts",
            icon: "💳",
            gradient: "from-amber-500/20 via-orange-500/20 to-red-500/20",
            items: ["Payment methods", "Payout schedule", "Bank details", "Tax information"],
          },
        ].map((card, index) => (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-slate-700/70"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">{card.icon}</div>
                <h2 className="text-base font-bold text-slate-50">{card.title}</h2>
              </div>
              <ul className="space-y-2">
                {card.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="text-sky-400 mt-0.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Contact Support */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
            <span className="text-lg">📧</span>
            Contact Support
          </h2>
          <div className="space-y-3">
            <div className="rounded-lg bg-slate-900/40 p-4 border border-slate-800/50">
              <p className="text-xs text-slate-500 mb-1">Email</p>
              <p className="text-sm font-semibold text-sky-300">support@etticket.com</p>
            </div>
            <div className="rounded-lg bg-slate-900/40 p-4 border border-slate-800/50">
              <p className="text-xs text-slate-500 mb-1">Phone</p>
              <p className="text-sm font-semibold text-sky-300">+251 911 234 567</p>
            </div>
            <div className="rounded-lg bg-slate-900/40 p-4 border border-slate-800/50">
              <p className="text-xs text-slate-500 mb-1">Response Time</p>
              <p className="text-sm font-semibold text-emerald-300">Within 24 hours</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 to-slate-900/50 p-6 shadow-xl">
          <h2 className="text-sm font-bold text-slate-50 flex items-center gap-2 mb-4">
            <span className="text-lg">📚</span>
            Resources
          </h2>
          <div className="space-y-2">
            <Link
              href="#"
              className="group flex items-center justify-between rounded-lg bg-slate-900/40 p-3 border border-slate-800/50 hover:border-sky-500/50 transition-colors"
            >
              <span className="text-xs font-medium text-slate-300">Documentation</span>
              <span className="text-slate-500 group-hover:text-sky-400">→</span>
            </Link>
            <Link
              href="#"
              className="group flex items-center justify-between rounded-lg bg-slate-900/40 p-3 border border-slate-800/50 hover:border-sky-500/50 transition-colors"
            >
              <span className="text-xs font-medium text-slate-300">Video Tutorials</span>
              <span className="text-slate-500 group-hover:text-sky-400">→</span>
            </Link>
            <Link
              href="#"
              className="group flex items-center justify-between rounded-lg bg-slate-900/40 p-3 border border-slate-800/50 hover:border-sky-500/50 transition-colors"
            >
              <span className="text-xs font-medium text-slate-300">FAQ</span>
              <span className="text-slate-500 group-hover:text-sky-400">→</span>
            </Link>
            <Link
              href="#"
              className="group flex items-center justify-between rounded-lg bg-slate-900/40 p-3 border border-slate-800/50 hover:border-sky-500/50 transition-colors"
            >
              <span className="text-xs font-medium text-slate-300">Community Forum</span>
              <span className="text-slate-500 group-hover:text-sky-400">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
