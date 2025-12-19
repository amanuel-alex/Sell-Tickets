import Link from "next/link";
import type { ReactNode } from "react";
import LogoutButton from "@/components/logout-button";
import { getSession } from "@/lib/auth";

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/organizers", label: "Organizers" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/transactions", label: "Transactions" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/system", label: "System" },
  { href: "/admin/support", label: "Support" },
];

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <aside className="hidden w-64 flex-col border-r border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-5 py-6 md:flex">
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/10 ring-1 ring-violet-500/40">
            <span className="text-xs font-semibold text-violet-400">ET</span>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500">
              Admin
            </p>
            <Link
              href="/admin/dashboard"
              className="block text-sm font-semibold tracking-tight text-slate-50"
            >
              ET Ticket
            </Link>
          </div>
        </div>
        <nav className="space-y-1 text-sm">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-slate-50"
            >
              <span>{item.label}</span>
              <span className="text-[10px] text-slate-500">•</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-4 border-t border-slate-800 pt-6">
          <div className="text-xs text-slate-400">
            <p className="font-medium text-slate-300">{session?.email || "admin@example.com"}</p>
            <p className="mt-1 text-[11px] text-slate-500">Admin Account</p>
          </div>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 bg-slate-950 px-4 py-4 md:px-8 md:py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          <header className="flex flex-col gap-2 border-b border-slate-800/70 pb-3 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium text-slate-300">Admin console (demo)</p>
              <p className="text-[11px] text-slate-500">
                Replace mock APIs with your real platform metrics & controls.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                Live
              </span>
              <span>{session?.email || "admin@example.com"}</span>
            </div>
          </header>
          {children}
        </div>
      </main>
    </div>
  );
}


