import Link from "next/link";

export default function VerifyEmailPage() {
  // In a real app, you would verify the token from the URL here
  // For now, this is just a confirmation page

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg
            className="h-8 w-8 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-slate-900">
          Email Verified Successfully
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Your email address has been verified. You can now log in to your account.
        </p>
      </div>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
        <p>
          In a production app, you would validate the verification token from the URL
          and update the user&apos;s emailVerified status in your database.
        </p>
      </div>

      <Link
        href="/auth/login"
        className="block w-full rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-center text-sm font-medium text-white hover:shadow-lg"
      >
        Continue to Login
      </Link>
    </div>
  );
}

