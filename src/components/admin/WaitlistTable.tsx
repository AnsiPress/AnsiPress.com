"use client";

import { useState } from "react";
import type { Waitlist } from "@/lib/db/schema";

export interface WaitlistTableProps {
  entries: Array<Waitlist & { emailLogCount: number }>;
  onUpdate?: (id: number, updates: Partial<Waitlist>) => void;
  onDelete?: (id: number) => void;
}

export function WaitlistTable({ entries, onUpdate, onDelete }: WaitlistTableProps) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const toggleSelect = (id: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === entries.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(entries.map((e) => e.id)));
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Email",
      "Website",
      "Current Host",
      "Traffic",
      "Source",
      "Verified",
      "Subscribed",
      "Created At",
    ];
    
    const rows = entries.map((entry) => [
      entry.email,
      entry.website || "",
      entry.currentHost || "",
      entry.monthlyTraffic || "",
      entry.referralSource || "",
      entry.emailVerified ? "Yes" : "No",
      entry.subscribed ? "Yes" : "No",
      new Date(entry.createdAt).toISOString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-lg border border-white/10 bg-white/5">
      {/* Table Header Actions */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          {selectedIds.size > 0 && (
            <span>{selectedIds.size} selected</span>
          )}
        </div>
        <button
          onClick={exportToCSV}
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr className="text-left text-sm text-zinc-400">
              <th className="p-4">
                <input
                  type="checkbox"
                  checked={selectedIds.size === entries.length && entries.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-white/20"
                />
              </th>
              <th className="p-4">Email</th>
              <th className="p-4">Website</th>
              <th className="p-4">Host</th>
              <th className="p-4">Traffic</th>
              <th className="p-4">Source</th>
              <th className="p-4">Created</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {entries.map((entry) => (
              <tr key={entry.id} className="text-sm text-white hover:bg-white/5">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(entry.id)}
                    onChange={() => toggleSelect(entry.id)}
                    className="rounded border-white/20"
                  />
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium">{entry.email}</div>
                    {entry.emailLogCount > 0 && (
                      <div className="text-xs text-zinc-400">
                        {entry.emailLogCount} emails sent
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4 text-zinc-400">
                  {entry.website ? (
                    <a
                      href={entry.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline"
                    >
                      {entry.website.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-4 text-zinc-400">{entry.currentHost || "—"}</td>
                <td className="p-4 text-zinc-400">{entry.monthlyTraffic || "—"}</td>
                <td className="p-4 text-zinc-400">{entry.referralSource || "—"}</td>
                <td className="p-4 text-zinc-400">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {entry.emailVerified && (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                        Verified
                      </span>
                    )}
                    {!entry.subscribed && (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400">
                        Unsubscribed
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {onUpdate && !entry.emailVerified && (
                      <button
                        onClick={() => onUpdate(entry.id, { emailVerified: true })}
                        className="text-xs text-purple-400 hover:text-purple-300"
                      >
                        Verify
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(entry.id)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {entries.length === 0 && (
        <div className="p-8 text-center text-zinc-400">
          No waitlist entries found
        </div>
      )}
    </div>
  );
}
