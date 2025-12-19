"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Organizer {
  id: string;
  email: string;
  phone?: string;
  name?: string;
  businessName?: string;
  status: "pending" | "approved" | "suspended";
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface OrganizersData {
  organizers: Organizer[];
  counts: {
    total: number;
    pending: number;
    approved: number;
    suspended: number;
  };
}

export default function AdminOrganizersPage() {
  const router = useRouter();
  const [data, setData] = useState<OrganizersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "suspended">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const fetchOrganizers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/organizers");
      if (!res.ok) {
        if (res.status === 403) {
          router.push("/auth/login");
          return;
        }
        throw new Error("Failed to fetch organizers");
      }
      const data = await res.json();
      setData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load organizers");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (userId: string, status: "pending" | "approved" | "suspended") => {
    try {
      setUpdatingId(userId);
      const res = await fetch("/api/admin/organizers/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      // Refresh the list
      await fetchOrganizers();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrganizers = data?.organizers.filter((org) => {
    const matchesFilter = filter === "all" || org.status === filter;
    const matchesSearch =
      searchQuery === "" ||
      org.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.phone?.includes(searchQuery);
    return matchesFilter && matchesSearch;
  }) || [];

  if (loading) {
    return (
      <div className="space-y-6">
        <header>
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-500">
            Organizers
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-slate-50">
            Organizer Management
          </h1>
        </header>
        <div className="flex items-center justify-center py-12">
          <div className="text-sm text-slate-400">Loading organizers...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <header>
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-500">
            Organizers
          </p>
          <h1 className="text-xl font-semibold tracking-tight text-slate-50">
            Organizer Management
          </h1>
        </header>
        <div className="rounded-2xl border border-red-800/70 bg-red-950/50 p-4 text-sm text-red-200">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-500">
          Organizers
        </p>
        <h1 className="text-xl font-semibold tracking-tight text-slate-50">
          Organizer Management
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Review, approve, and manage organizer accounts.
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
            Total Organizers
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-50">
            {data?.counts.total || 0}
          </p>
        </div>
        <div className="rounded-2xl border border-amber-800/70 bg-amber-950/30 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-amber-400">
            Pending Approval
          </p>
          <p className="mt-2 text-2xl font-semibold text-amber-300">
            {data?.counts.pending || 0}
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-800/70 bg-emerald-950/30 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-400">
            Approved
          </p>
          <p className="mt-2 text-2xl font-semibold text-emerald-300">
            {data?.counts.approved || 0}
          </p>
        </div>
        <div className="rounded-2xl border border-red-800/70 bg-red-950/30 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-red-400">
            Suspended
          </p>
          <p className="mt-2 text-2xl font-semibold text-red-300">
            {data?.counts.suspended || 0}
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === "all"
                ? "bg-sky-500 text-slate-950"
                : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
            }`}
          >
            All ({data?.counts.total || 0})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === "pending"
                ? "bg-amber-500 text-slate-950"
                : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
            }`}
          >
            Pending ({data?.counts.pending || 0})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === "approved"
                ? "bg-emerald-500 text-slate-950"
                : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
            }`}
          >
            Approved ({data?.counts.approved || 0})
          </button>
          <button
            onClick={() => setFilter("suspended")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === "suspended"
                ? "bg-red-500 text-slate-950"
                : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
            }`}
          >
            Suspended ({data?.counts.suspended || 0})
          </button>
        </div>
        <input
          type="text"
          placeholder="Search by email, name, or business..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-50 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </section>

      {/* Organizers Table */}
      <section className="rounded-2xl border border-slate-800/70 bg-slate-950/70 overflow-hidden">
        {filteredOrganizers.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-400">
            {searchQuery
              ? "No organizers match your search."
              : filter === "pending"
              ? "No pending organizers."
              : filter === "approved"
              ? "No approved organizers."
              : filter === "suspended"
              ? "No suspended organizers."
              : "No organizers found."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead className="bg-slate-900/80">
                <tr>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                    Organizer
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                    Registered
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrganizers.map((org) => (
                  <tr
                    key={org.id}
                    className="border-t border-slate-800/60 hover:bg-slate-900/40 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-slate-50">
                          {org.businessName || org.name || "N/A"}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {org.name && org.businessName ? org.name : org.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-slate-100">{org.email}</p>
                        {org.phone && (
                          <p className="text-[11px] text-slate-500 mt-0.5">{org.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          org.status === "pending"
                            ? "bg-amber-500/10 text-amber-300"
                            : org.status === "approved"
                            ? "bg-emerald-500/10 text-emerald-300"
                            : "bg-red-500/10 text-red-300"
                        }`}
                      >
                        {org.status === "pending"
                          ? "⏳ Pending"
                          : org.status === "approved"
                          ? "✓ Approved"
                          : "⚠ Suspended"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(org.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {org.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(org.id, "approved")}
                              disabled={updatingId === org.id}
                              className="rounded-lg bg-emerald-500/20 px-3 py-1 text-[10px] font-medium text-emerald-300 hover:bg-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              {updatingId === org.id ? "..." : "Approve"}
                            </button>
                            <button
                              onClick={() => updateStatus(org.id, "suspended")}
                              disabled={updatingId === org.id}
                              className="rounded-lg bg-red-500/20 px-3 py-1 text-[10px] font-medium text-red-300 hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              {updatingId === org.id ? "..." : "Reject"}
                            </button>
                          </>
                        )}
                        {org.status === "approved" && (
                          <button
                            onClick={() => updateStatus(org.id, "suspended")}
                            disabled={updatingId === org.id}
                            className="rounded-lg bg-red-500/20 px-3 py-1 text-[10px] font-medium text-red-300 hover:bg-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {updatingId === org.id ? "..." : "Suspend"}
                          </button>
                        )}
                        {org.status === "suspended" && (
                          <button
                            onClick={() => updateStatus(org.id, "approved")}
                            disabled={updatingId === org.id}
                            className="rounded-lg bg-emerald-500/20 px-3 py-1 text-[10px] font-medium text-emerald-300 hover:bg-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {updatingId === org.id ? "..." : "Approve"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
