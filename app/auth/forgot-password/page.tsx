"use client";

import { useState, FormEvent, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "suspended") {
      setError("Your account has been suspended. Please contact support.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // In a real app, this would send a password reset email
    // For now, just simulate success
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1000);
  };

  if (sent) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Check your email
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            We&apos;ve sent a password reset link to {email}
          </p>
        </div>
        <div className="rounded-md bg-indigo-50 border border-indigo-200 p-4 text-sm text-indigo-800">
          <p>
            In a production app, you would receive an email with a reset link.
            For now, this is a demo screen.
          </p>
        </div>
        <Link
          href="/auth/login"
          className="block w-full text-center rounded-md bg-slate-900 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          Forgot Password
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none ring-0 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 py-2 text-sm font-medium text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      <p className="text-center text-xs text-slate-500">
        Remember your password?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-slate-900"
        >
          Back to login
        </Link>
      </p>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Forgot Password
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Loading...
          </p>
        </div>
      </div>
    }>
      <ForgotPasswordForm />
    </Suspense>
  );
}

