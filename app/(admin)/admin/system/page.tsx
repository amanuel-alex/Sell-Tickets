export default function AdminSystemPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-500">
          System
        </p>
        <h1 className="text-xl font-semibold tracking-tight text-slate-50">
          System settings & security
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Admin users, permissions, fraud detection, fees, tax rates and audit
          logs live here.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4 text-xs text-slate-400">
          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              User management
            </p>
            <p className="mt-2">
              Admin user accounts, role permissions and activity logs UI.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Fraud detection
            </p>
            <p className="mt-2">
              Suspicious activity, duplicate ticket alerts and blacklist
              management.
            </p>
          </div>
        </div>
        <div className="space-y-4 text-xs text-slate-400">
          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              System settings
            </p>
            <p className="mt-2">
              Platform fees, tax rates, SMS/Email templates and API keys.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Audit logs
            </p>
            <p className="mt-2">
              All system actions with filters and exportable logs for compliance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


