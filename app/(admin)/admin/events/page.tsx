const eventStats = {
  live: 24,
  upcoming: 41,
  endedLast30d: 63,
  flagged: 3,
};

const topEvents = [
  {
    name: "Addis Night Fest",
    organizer: "Skyline Events",
    city: "Addis Ababa",
    ticketsSold: 4820,
    revenue: "ETB 1.2M",
    status: "Live",
    conversion: "7.4%",
  },
  {
    name: "Tech Summit 2025",
    organizer: "Addis Tech Summit",
    city: "Addis Ababa",
    ticketsSold: 3290,
    revenue: "ETB 980K",
    status: "Upcoming",
    conversion: "5.8%",
  },
  {
    name: "Unity Music Festival",
    organizer: "Unity Promotions",
    city: "Hawassa",
    ticketsSold: 2710,
    revenue: "ETB 740K",
    status: "Live",
    conversion: "6.1%",
  },
];

const categoryMix = [
  { name: "Music & Concerts", share: 46, color: "from-sky-500 to-sky-400" },
  { name: "Conferences", share: 24, color: "from-emerald-500 to-emerald-400" },
  { name: "Sports", share: 15, color: "from-amber-500 to-amber-400" },
  { name: "Festivals", share: 9, color: "from-violet-500 to-violet-400" },
  { name: "Other", share: 6, color: "from-slate-500 to-slate-400" },
];

const approvalQueue = [
  {
    name: "Startup Night",
    organizer: "Blue Nile Labs",
    requestedAt: "Today • 11:20",
    risk: "Low",
  },
  {
    name: "City Marathon 10K",
    organizer: "City Sports",
    requestedAt: "Today • 09:05",
    risk: "Medium",
  },
  {
    name: "New Year Bash 2026",
    organizer: "Urban Life Events",
    requestedAt: "Yesterday • 17:48",
    risk: "High",
  },
];

export default function AdminEventsPage() {
  const totalCategories = categoryMix.reduce((sum, c) => sum + c.share, 0);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-500">
            Events
          </p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight text-slate-50">
            Platform events & performance
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Control every event on the platform — performance, risk, and visibility in one place.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="rounded-full bg-sky-500/10 px-3 py-1 text-sky-300">
            Real-time monitoring (demo)
          </span>
          <span className="rounded-full bg-slate-800/60 px-3 py-1 text-slate-300">
            Events control center
          </span>
        </div>
      </header>

      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-emerald-700/70 bg-emerald-950/30 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Live now
          </p>
          <p className="mt-2 text-2xl font-semibold text-emerald-100">{eventStats.live}</p>
          <p className="mt-1 text-[11px] text-emerald-300/80">
            Being scanned and validated in real time.
          </p>
        </div>
        <div className="rounded-2xl border border-sky-700/70 bg-sky-950/30 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">
            Upcoming
          </p>
          <p className="mt-2 text-2xl font-semibold text-sky-100">{eventStats.upcoming}</p>
          <p className="mt-1 text-[11px] text-sky-300/80">
            Scheduled in the next 30 days.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-700/70 bg-slate-950/60 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
            Ended (30 days)
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-50">{eventStats.endedLast30d}</p>
          <p className="mt-1 text-[11px] text-slate-400">Used for revenue / refund analytics.</p>
        </div>
        <div className="rounded-2xl border border-amber-700/70 bg-amber-950/30 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300">
            Flagged
          </p>
          <p className="mt-2 text-2xl font-semibold text-amber-100">{eventStats.flagged}</p>
          <p className="mt-1 text-[11px] text-amber-300/80">
            High refund rate, disputes, or fraud signals.
          </p>
        </div>
      </section>

      {/* Top events + approval queue */}
      <section className="grid gap-4 md:grid-cols-[2fr,1.1fr]">
        {/* Top events table */}
        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4 text-xs text-slate-200">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Top events by revenue (demo data)
          </h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead className="bg-slate-900/80 text-left text-[11px] text-slate-400">
                <tr>
                  <th className="px-3 py-2">Event</th>
                  <th className="px-3 py-2">Organizer</th>
                  <th className="px-3 py-2">City</th>
                  <th className="px-3 py-2">Tickets sold</th>
                  <th className="px-3 py-2">Revenue</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {topEvents.map((ev) => (
                  <tr key={ev.name} className="border-t border-slate-800/70 hover:bg-slate-900/40">
                    <td className="px-3 py-2 text-slate-50">{ev.name}</td>
                    <td className="px-3 py-2 text-slate-200">{ev.organizer}</td>
                    <td className="px-3 py-2 text-slate-300">{ev.city}</td>
                    <td className="px-3 py-2 text-slate-100">{ev.ticketsSold.toLocaleString()}</td>
                    <td className="px-3 py-2 text-slate-100">{ev.revenue}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          ev.status === "Live"
                            ? "bg-emerald-500/10 text-emerald-300"
                            : "bg-sky-500/10 text-sky-300"
                        }`}
                      >
                        {ev.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[11px] text-emerald-300">{ev.conversion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Approval queue and featured */}
        <div className="space-y-4 text-xs text-slate-200">
          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Event approval queue
            </h2>
            <p className="mt-2 text-[11px] text-slate-400">
              Review new event submissions before they go live on the marketplace.
            </p>
            <ul className="mt-3 space-y-2">
              {approvalQueue.map((item) => (
                <li
                  key={item.name}
                  className="rounded-xl border border-slate-800/70 bg-slate-900/80 px-3 py-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium text-slate-50">{item.name}</p>
                      <p className="text-[11px] text-slate-400">
                        {item.organizer} • {item.requestedAt}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        item.risk === "High"
                          ? "bg-red-500/10 text-red-300"
                          : item.risk === "Medium"
                          ? "bg-amber-500/10 text-amber-300"
                          : "bg-emerald-500/10 text-emerald-300"
                      }`}
                    >
                      {item.risk} risk
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Category mix
            </h2>
            <p className="mt-2 text-[11px] text-slate-400">
              How your events are distributed by category (by tickets sold).
            </p>
            <div className="mt-3 space-y-2">
              {categoryMix.map((c) => (
                <div key={c.name} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-200">{c.name}</span>
                    <span className="text-slate-400">{c.share}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-900/80">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${c.color}`}
                      style={{ width: `${(c.share / totalCategories) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

