export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-500">
          Content
        </p>
        <h1 className="text-xl font-semibold tracking-tight text-slate-50">
          Homepage & categories
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Content management for homepage banners, featured sections, categories
          and cities.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4 text-xs text-slate-400">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Homepage manager
          </p>
          <p className="mt-2">
            Manage banners (upload, order, links) and featured sections here.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4 text-xs text-slate-400">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Categories & cities
          </p>
          <p className="mt-2">
            Add/edit categories, manage supported cities and regional settings.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4 text-xs text-slate-400">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Promo code campaigns
          </p>
          <p className="mt-2">
            Platform-wide promo codes, usage analytics and campaign creation.
          </p>
        </div>
      </section>
    </div>
  );
}


