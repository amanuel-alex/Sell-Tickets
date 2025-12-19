import Link from "next/link";
import type { ReactNode } from "react";
import LogoutButton from "@/components/logout-button";
import { getSession } from "@/lib/auth";

const navItems = [
  { href: "/organizer/dashboard", label: "Overview" },
  { href: "/organizer/events", label: "Events" },
  { href: "/organizer/tickets", label: "Tickets" },
  { href: "/organizer/customers", label: "Customers" },
  { href: "/organizer/promotions", label: "Promotions" },
  { href: "/organizer/reports", label: "Reports" },
  { href: "/organizer/payouts", label: "Payouts" },
  { href: "/organizer/settings", label: "Settings" },
  { href: "/organizer/help", label: "Help & Support" },
];

export default async function OrganizerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen bg-slate-950">
      <aside className="relative hidden w-64 flex-col border-r border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-5 py-6 text-slate-100 md:flex">
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/10 ring-1 ring-sky-500/40">
            <span className="text-xs font-semibold text-sky-400">ET</span>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Organizer
            </p>
            <Link
              href="/organizer/dashboard"
              className="block text-sm font-semibold tracking-tight text-slate-50"
            >
              ET Ticket
            </Link>
          </div>
        </div>
        <nav className="space-y-1 text-sm">
          {navItems.map((item) => (
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
            <p className="font-medium text-slate-300">{session?.name || session?.email}</p>
            <p className="mt-1 text-[11px] text-slate-500">{session?.businessName}</p>
          </div>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 bg-slate-950 px-4 py-4 text-slate-50 md:px-8 md:py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          {children}
        </div>
      </main>
    </div>
  );
}


