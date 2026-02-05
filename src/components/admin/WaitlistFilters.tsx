"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function WaitlistFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1"); // Reset to page 1 on filter change
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-4">
      <div>
        <label className="block text-sm text-zinc-400 mb-2">Subscription Status</label>
        <select
          value={searchParams.get("subscribed") || ""}
          onChange={(e) => updateFilters("subscribed", e.target.value)}
          className="h-10 px-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All</option>
          <option value="true">Subscribed</option>
          <option value="false">Unsubscribed</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-zinc-400 mb-2">Verification Status</label>
        <select
          value={searchParams.get("emailVerified") || ""}
          onChange={(e) => updateFilters("emailVerified", e.target.value)}
          className="h-10 px-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All</option>
          <option value="true">Verified</option>
          <option value="false">Unverified</option>
        </select>
      </div>
    </div>
  );
}
