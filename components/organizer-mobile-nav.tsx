"use client";

import { useState } from "react";
import Link from "next/link";

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

export default function OrganizerMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden border-b border-slate-800 bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/10 ring-1 ring-sky-500/40">
            <span className="text-xs font-semibold text-sky-400">AC</span>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              Organizer
            </p>
            <Link
              href="/organizer/dashboard"
              className="block text-sm font-semibold tracking-tight text-slate-50"
            >
              AmazingComp
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>
      {open && (
        <nav className="border-t border-slate-800 bg-slate-950/95 px-4 pb-3 pt-2 text-sm">
          <div className="mx-auto max-w-6xl space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-slate-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}


