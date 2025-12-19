import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PendingApprovalPage() {
  const session = await getSession();

  // If not logged in or not pending, redirect
  if (!session) {
    redirect("/auth/login");
  }

  if (session.status !== "pending") {
    if (session.role === "admin") {
      redirect("/admin/dashboard");
    } else {
      redirect("/organizer/dashboard");
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <svg
            className="h-8 w-8 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-slate-900">
          Account Pending Approval
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Your organizer account is currently pending admin approval. You&apos;ll be
          able to access your dashboard once your account has been reviewed and
          approved.
        </p>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <p className="font-medium">What happens next?</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Our admin team will review your business information</li>
          <li>You&apos;ll receive an email notification once approved</li>
          <li>Typical approval time is 24-48 hours</li>
        </ul>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-medium text-slate-900">Need help?</p>
        <p className="mt-1">
          Contact our support team at{" "}
          <a href="mailto:support@etticket.com" className="font-medium text-indigo-600 hover:text-indigo-700">
            support@etticket.com
          </a>{" "}
          or call{" "}
          <a href="tel:+251911234567" className="font-medium text-indigo-600 hover:text-indigo-700">
            +251 911 234 567
          </a>
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="block w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Logout
          </button>
        </form>
        <Link
          href="/"
          className="block w-full rounded-md bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-slate-800"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

