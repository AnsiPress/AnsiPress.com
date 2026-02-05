import { db } from "@/lib/db";
import { waitlist, emailLogs } from "@/lib/db/schema";
import { eq, desc, count, and } from "drizzle-orm";
import { WaitlistTable } from "@/components/admin/WaitlistTable";
import { WaitlistFilters } from "@/components/admin/WaitlistFilters";
import { updateWaitlistEntry, deleteWaitlistEntry } from "./actions";
import Link from "next/link";
import { Suspense } from "react";

// Force dynamic rendering
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    subscribed?: string;
    emailVerified?: string;
  }>;
}

async function WaitlistContent({ searchParams }: PageProps) {
  const { page: pageStr = "1", subscribed, emailVerified } = await searchParams;
  
  const page = parseInt(pageStr);
  const limit = 30;

  // Build filter conditions
  const conditions = [];
  if (subscribed) {
    conditions.push(eq(waitlist.subscribed, subscribed === "true"));
  }
  if (emailVerified) {
    conditions.push(eq(waitlist.emailVerified, emailVerified === "true"));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Parallelize count and entries fetch
  const [[totalResult], entries] = await Promise.all([
    db.select({ count: count() }).from(waitlist).where(whereClause),
    db.select()
      .from(waitlist)
      .where(whereClause)
      .orderBy(desc(waitlist.createdAt))
      .limit(limit)
      .offset((page - 1) * limit)
  ]);

  const total = totalResult?.count || 0;
  const totalPages = Math.ceil(total / limit);

  // Get email log counts for each entry
  const entriesWithCounts = await Promise.all(
    entries.map(async (entry) => {
      const [logCount] = await db
        .select({ count: count() })
        .from(emailLogs)
        .where(eq(emailLogs.waitlistId, entry.id));

      return {
        ...entry,
        emailLogCount: logCount?.count || 0,
      };
    })
  );

  return (
    <>
      <WaitlistTable
        entries={entriesWithCounts}
        onUpdate={updateWaitlistEntry}
        onDelete={deleteWaitlistEntry}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Link
            href={{
              query: { 
                ... (subscribed ? { subscribed } : {}),
                ... (emailVerified ? { emailVerified } : {}),
                page: Math.max(1, page - 1).toString() 
              },
            }}
            className={`px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors ${
              page === 1 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Previous
          </Link>
          <span className="text-zinc-400">
            Page {page} of {totalPages}
          </span>
          <Link
            href={{
              query: { 
                ... (subscribed ? { subscribed } : {}),
                ... (emailVerified ? { emailVerified } : {}),
                page: Math.min(totalPages, page + 1).toString() 
              },
            }}
            className={`px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors ${
              page === totalPages ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </>
  );
}

export default function AdminWaitlistPage({ searchParams }: PageProps) {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Waitlist Management</h1>
        <p className="text-zinc-400 mt-2">
          Manage and export your waitlist entries
        </p>
      </div>

      <WaitlistFilters />

      <Suspense fallback={<div className="text-center py-12 text-zinc-400">Loading entries...</div>}>
        <WaitlistContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

