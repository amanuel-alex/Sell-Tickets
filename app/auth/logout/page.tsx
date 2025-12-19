"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/");
        router.refresh();
      } catch (error) {
        console.error("Logout failed:", error);
        router.push("/");
      }
    };

    handleLogout();
  }, [router]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-slate-900">Logging out...</h1>
        <p className="mt-2 text-sm text-slate-500">Please wait while we log you out.</p>
      </div>
    </div>
  );
}

