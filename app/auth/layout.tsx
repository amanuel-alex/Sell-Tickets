import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-1 shadow-xl">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
        </div>
        <div className="relative bg-white p-6 md:p-10">
          <div className="mb-6 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600">
                <span className="text-sm font-bold text-white">ET</span>
              </div>
              <span className="text-xl font-semibold text-slate-900">
                ET Ticket
              </span>
            </Link>
            <p className="mt-2 text-xs text-slate-500">
              Unified authentication for organizers and admins
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

