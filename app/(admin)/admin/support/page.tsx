export default function AdminSupportPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-500">
          Support
        </p>
        <h1 className="text-xl font-semibold tracking-tight text-slate-50">
          Customer support & feedback
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Ticket queue, feedback, bug reports and knowledge base management for
          your support team.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4 text-xs text-slate-400">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Support tickets
          </p>
          <p className="mt-2">
            Ticket queue, assignment to agents and resolution tracking go here.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4 text-xs text-slate-400">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            User feedback
          </p>
          <p className="mt-2">
            App reviews, feature requests and bug reports overview.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4 text-xs text-slate-400">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Knowledge base
          </p>
          <p className="mt-2">
            Manage FAQs and help articles that surface in the organizer Help
            section.
          </p>
        </div>
      </section>
    </div>
  );
}


