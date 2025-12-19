const paymentMix = [
  { name: "TeleBirr", share: 38, volume: "ETB 1.8M", color: "from-sky-400 to-sky-500" },
  { name: "CBE Birr", share: 26, volume: "ETB 1.2M", color: "from-emerald-400 to-emerald-500" },
  { name: "Amole", share: 18, volume: "ETB 820K", color: "from-violet-400 to-violet-500" },
  { name: "Bank transfer", share: 11, volume: "ETB 520K", color: "from-amber-400 to-amber-500" },
  { name: "Cash @ venue", share: 7, volume: "ETB 310K", color: "from-slate-300 to-slate-500" },
];

const recentSettlements = [
  {
    id: "STL-9843",
    channel: "TeleBirr",
    organizer: "Skyline Events",
    amount: "ETB 120,450",
    status: "Paid",
    date: "Today • 10:42",
  },
  {
    id: "STL-9839",
    channel: "CBE Birr",
    organizer: "Addis Tech Summit",
    amount: "ETB 74,900",
    status: "In review",
    date: "Today • 09:15",
  },
  {
    id: "STL-9821",
    channel: "Amole",
    organizer: "Unity Concert",
    amount: "ETB 58,320",
    status: "Paid",
    date: "Yesterday • 18:03",
  },
  {
    id: "STL-9814",
    channel: "Bank transfer",
    organizer: "Ethiopia Food Fest",
    amount: "ETB 92,110",
    status: "Awaiting ref.",
    date: "Yesterday • 15:27",
  },
];

export default function AdminPaymentsPage() {
  const totalShare = paymentMix.reduce((sum, m) => sum + m.share, 0);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-500">
            Payments & settlement
          </p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight text-slate-50">
            Payment channels & payouts
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            TeleBirr, CBE Birr, Amole, bank transfer, and cash-at-venue — all in one control room.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300">
            Realtime settlement overview
          </span>
          <span className="rounded-full bg-slate-800/60 px-3 py-1 text-slate-300">
            Demo finance console
          </span>
        </div>
      </header>

      {/* Payment mix overview */}
      <section className="grid gap-4 md:grid-cols-[1.6fr,1.2fr]">
        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Channel mix (last 30 days)
          </h2>
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-end">
            <div className="flex-1 grid grid-cols-5 gap-2">
              {paymentMix.map((m) => (
                <div key={m.name} className="flex flex-col items-center gap-1">
                  <div className="flex h-28 w-full items-end justify-center rounded-xl bg-slate-900/90">
                    <div
                      className={`w-7 rounded-full bg-gradient-to-t ${m.color}`}
                      style={{ height: `${(m.share / totalShare) * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-300">{m.name}</p>
                  <p className="text-[10px] text-slate-500">{m.volume}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 w-full rounded-xl border border-slate-800/70 bg-slate-900/80 p-4 md:mt-0 md:w-52">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Highlight
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-50">
                TeleBirr is driving the majority of on-platform volume.
              </p>
              <p className="mt-2 text-[11px] text-slate-400">
                Combine mobile money for impulse purchases, bank transfer for high-value corporate
                bookings, and cash-at-venue for walk-ins.
              </p>
            </div>
          </div>
        </div>

        {/* Payment methods configuration */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Payment channels
          </h2>
          <div className="space-y-3 text-xs text-slate-300">
            {/* TeleBirr */}
            <div className="rounded-2xl border border-sky-700/70 bg-gradient-to-br from-sky-950/70 via-slate-950/80 to-slate-950/90 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">
                    TeleBirr
                  </p>
                  <p className="mt-1 text-xs text-slate-200">Instant mobile money payments.</p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-medium text-emerald-300">
                  Active
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-400">
                <span className="rounded-full bg-slate-900/80 px-2.5 py-1">
                  Settlement: T+1 days
                </span>
                <span className="rounded-full bg-slate-900/80 px-2.5 py-1">
                  Fee: 2.5% + ETB 1.50
                </span>
                <span className="rounded-full bg-slate-900/80 px-2.5 py-1">
                  Refunds: supported
                </span>
              </div>
            </div>

            {/* CBE Birr */}
            <div className="rounded-2xl border border-emerald-700/60 bg-gradient-to-br from-emerald-950/70 via-slate-950/80 to-slate-950/90 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                    CBE Birr
                  </p>
                  <p className="mt-1 text-xs text-slate-200">Strong coverage for CBE customers.</p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-medium text-emerald-300">
                  Active
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-400">
                <span className="rounded-full bg-slate-900/80 px-2.5 py-1">
                  Settlement: T+2 days
                </span>
                <span className="rounded-full bg-slate-900/80 px-2.5 py-1">
                  Fee: 2.0% flat
                </span>
                <span className="rounded-full bg-slate-900/80 px-2.5 py-1">Chargebacks monitored</span>
              </div>
            </div>

            {/* Amole */}
            <div className="rounded-2xl border border-violet-700/60 bg-gradient-to-br from-violet-950/70 via-slate-950/80 to-slate-950/90 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300">
                    Amole
                  </p>
                  <p className="mt-1 text-xs text-slate-200">Popular for youth & digital-native users.</p>
                </div>
                <span className="rounded-full bg-amber-500/15 px-3 py-1 text-[10px] font-medium text-amber-300">
                  Pilot
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-400">
                <span className="rounded-full bg-slate-900/80 px-2.5 py-1">
                  Settlement: T+1 days
                </span>
                <span className="rounded-full bg-slate-900/80 px-2.5 py-1">
                  Fee: 2.7% dynamic
                </span>
                <span className="rounded-full bg-slate-900/80 px-2.5 py-1">Disputes under 0.5%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank transfer & cash at venue */}
      <section className="grid gap-4 md:grid-cols-[1.4fr,1.6fr]">
        <div className="rounded-2xl border border-amber-700/70 bg-gradient-to-br from-amber-950/60 via-slate-950/80 to-slate-950/90 p-4 text-xs text-slate-200">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-300">
            Bank transfer (reference only)
          </h2>
          <p className="mt-2 text-slate-100">
            For corporate / B2B bookings where payment happens outside the platform.
          </p>
          <ul className="mt-3 space-y-2 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>
                Generate a <span className="font-medium text-amber-200">unique bank reference</span> per
                booking and attach it to the invoice.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>
                Finance team confirms incoming transfers and marks the order as{" "}
                <span className="font-medium text-emerald-300">paid</span> inside the console.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>All flows remain traceable in settlement export and audit logs.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-slate-950/90 p-4 text-xs text-slate-200">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Cash-at-venue (QR validation)
          </h2>
          <p className="mt-2 text-slate-100">
            Track walk-in cash sales while still using the same QR validation flow as online tickets.
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="space-y-2 rounded-xl border border-slate-800/70 bg-slate-950/80 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Entry flow
              </p>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                <li>1. Cashier issues on-the-spot ticket in organizer app.</li>
                <li>2. System generates QR code linked to that order.</li>
                <li>3. Gate team scans QR as usual for validation.</li>
              </ul>
            </div>
            <div className="space-y-2 rounded-xl border border-slate-800/70 bg-slate-950/80 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Analytics
              </p>
              <ul className="space-y-1.5 text-[11px] text-slate-300">
                <li>• Separate cash vs. digital sales per event.</li>
                <li>• Fraud detection via mismatched scans.</li>
                <li>• Exportable reconciliation reports.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Recent settlements */}
      <section className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4 text-xs text-slate-200">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Recent settlements
          </h2>
          <p className="text-[11px] text-slate-500">
            Snapshot of the last 4 settlements across all payment channels.
          </p>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead className="bg-slate-900/80 text-left text-[11px] text-slate-400">
              <tr>
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Channel</th>
                <th className="px-3 py-2">Organizer</th>
                <th className="px-3 py-2">Amount</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentSettlements.map((s) => (
                <tr key={s.id} className="border-t border-slate-800/70">
                  <td className="px-3 py-2 font-mono text-[11px] text-slate-400">{s.id}</td>
                  <td className="px-3 py-2 text-slate-100">{s.channel}</td>
                  <td className="px-3 py-2 text-slate-200">{s.organizer}</td>
                  <td className="px-3 py-2 text-slate-100">{s.amount}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        s.status === "Paid"
                          ? "bg-emerald-500/10 text-emerald-300"
                          : s.status === "In review"
                          ? "bg-amber-500/10 text-amber-300"
                          : "bg-slate-500/10 text-slate-300"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-[11px] text-slate-400">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

