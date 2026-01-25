"use client";

import { useState, useEffect } from "react";
import { WaitlistTable } from "@/components/admin/WaitlistTable";
import type { Waitlist } from "@/lib/db/schema";

export default function AdminWaitlistPage() {
  const [entries, setEntries] = useState<Array<Waitlist & { emailLogCount: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    subscribed: "",
    emailVerified: "",
  });

  // Fetch waitlist entries
  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "30",
        });

        if (filters.subscribed) {
          params.set("subscribed", filters.subscribed);
        }
        if (filters.emailVerified) {
          params.set("emailVerified", filters.emailVerified);
        }

        const response = await fetch(`/api/admin/waitlist?${params}`, {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY || "",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch waitlist");
        }

        const data = await response.json();
        setEntries(data.entries);
        setTotalPages(data.pagination.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [page, filters]);

  const handleUpdate = async (id: number, updates: Partial<Waitlist>) => {
    try {
      const response = await fetch(`/api/admin/waitlist/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY || "",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update entry");
      }

      // Refresh entries
      setPage(page); // This will trigger useEffect
    } catch (err) {
      console.error("Error updating entry:", err);
      alert("Failed to update entry");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this entry?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/waitlist/${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_ADMIN_API_KEY || "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete entry");
      }

      // Refresh entries
      setPage(page); // This will trigger useEffect
    } catch (err) {
      console.error("Error deleting entry:", err);
      alert("Failed to delete entry");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Waitlist Management</h1>
        <p className="text-zinc-400 mt-2">
          Manage and export your waitlist entries
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-2">Subscription Status</label>
          <select
            value={filters.subscribed}
            onChange={(e) => {
              setFilters({ ...filters, subscribed: e.target.value });
              setPage(1);
            }}
            className="h-10 px-3 rounded-lg bg-white/10 border border-white/20 text-white"
          >
            <option value="">All</option>
            <option value="true">Subscribed</option>
            <option value="false">Unsubscribed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-2">Verification Status</label>
          <select
            value={filters.emailVerified}
            onChange={(e) => {
              setFilters({ ...filters, emailVerified: e.target.value });
              setPage(1);
            }}
            className="h-10 px-3 rounded-lg bg-white/10 border border-white/20 text-white"
          >
            <option value="">All</option>
            <option value="true">Verified</option>
            <option value="false">Unverified</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12 text-zinc-400">Loading...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-400">{error}</div>
      ) : (
        <>
          <WaitlistTable
            entries={entries}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                Previous
              </button>
              <span className="text-zinc-400">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
