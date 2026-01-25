import { Users, CheckCircle, TrendingUp, Mail } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { SignupsChart } from "@/components/admin/SignupsChart";
import { SourcesChart } from "@/components/admin/SourcesChart";
import { db } from "@/lib/db";
import { waitlist, emailLogs } from "@/lib/db/schema";
import { count, eq, gte, sql, desc } from "drizzle-orm";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

/**
 * Fetch stats directly from database
 */
async function getStats() {
  try {
    // Total signups
    const [totalSignups] = await db
      .select({ count: count() })
      .from(waitlist);

    // Verified emails
    const [verifiedEmails] = await db
      .select({ count: count() })
      .from(waitlist)
      .where(eq(waitlist.emailVerified, true));

    // Today's signups
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [todaySignups] = await db
      .select({ count: count() })
      .from(waitlist)
      .where(gte(waitlist.createdAt, today));

    // Last 7 days signups for growth calculation
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const [last7DaysSignups] = await db
      .select({ count: count() })
      .from(waitlist)
      .where(gte(waitlist.createdAt, sevenDaysAgo));

    // Previous 7 days signups for comparison
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
    const [previous7DaysSignups] = await db
      .select({ count: count() })
      .from(waitlist)
      .where(
        sql`${waitlist.createdAt} >= ${fourteenDaysAgo} AND ${waitlist.createdAt} < ${sevenDaysAgo}`
      );

    // Calculate 7-day growth percentage
    const last7Count = last7DaysSignups?.count || 0;
    const prev7Count = previous7DaysSignups?.count || 0;
    const growthPercentage = prev7Count > 0 
      ? ((last7Count - prev7Count) / prev7Count) * 100 
      : 0;

    // Signups by day (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const signupsByDay = await db
      .select({
        date: sql<string>`DATE(${waitlist.createdAt})`,
        count: count(),
      })
      .from(waitlist)
      .where(gte(waitlist.createdAt, thirtyDaysAgo))
      .groupBy(sql`DATE(${waitlist.createdAt})`)
      .orderBy(sql`DATE(${waitlist.createdAt})`);

    // Top referral sources
    const topReferralSources = await db
      .select({
        source: waitlist.referralSource,
        count: count(),
      })
      .from(waitlist)
      .groupBy(waitlist.referralSource)
      .orderBy(desc(count()))
      .limit(10);

    // Email delivery stats
    const [totalEmailsSent] = await db
      .select({ count: count() })
      .from(emailLogs);

    const [deliveredEmails] = await db
      .select({ count: count() })
      .from(emailLogs)
      .where(eq(emailLogs.status, "delivered"));

    const [openedEmails] = await db
      .select({ count: count() })
      .from(emailLogs)
      .where(eq(emailLogs.status, "opened"));

    const totalEmails = totalEmailsSent?.count || 0;
    const deliveredCount = deliveredEmails?.count || 0;
    const openedCount = openedEmails?.count || 0;

    const deliveryRate = totalEmails > 0 ? (deliveredCount / totalEmails) * 100 : 0;
    const openRate = totalEmails > 0 ? (openedCount / totalEmails) * 100 : 0;

    return {
      totalSignups: totalSignups?.count || 0,
      verifiedEmails: verifiedEmails?.count || 0,
      todaySignups: todaySignups?.count || 0,
      growthPercentage: Math.round(growthPercentage * 10) / 10,
      verificationRate: totalSignups?.count 
        ? Math.round((verifiedEmails?.count || 0) / totalSignups.count * 100 * 10) / 10
        : 0,
      signupsByDay,
      topReferralSources,
      emailStats: {
        totalSent: totalEmails,
        delivered: deliveredCount,
        opened: openedCount,
        deliveryRate: Math.round(deliveryRate * 10) / 10,
        openRate: Math.round(openRate * 10) / 10,
      },
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400">Failed to load dashboard stats</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-zinc-400 mt-2">
          Welcome back! Here&apos;s what&apos;s happening with your waitlist.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Signups"
          value={stats.totalSignups}
          change={stats.growthPercentage}
          icon={<Users className="w-8 h-8" />}
        />
        <StatsCard
          title="Verified Emails"
          value={`${stats.verifiedEmails} (${stats.verificationRate}%)`}
          icon={<CheckCircle className="w-8 h-8" />}
        />
        <StatsCard
          title="Today's Signups"
          value={stats.todaySignups}
          icon={<TrendingUp className="w-8 h-8" />}
        />
        <StatsCard
          title="Email Delivery Rate"
          value={`${stats.emailStats.deliveryRate}%`}
          icon={<Mail className="w-8 h-8" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SignupsChart data={stats.signupsByDay} />
        <SourcesChart data={stats.topReferralSources} />
      </div>

      {/* Top Referral Sources Table */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Top Referral Sources
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr className="text-left text-sm text-zinc-400">
                <th className="p-3">Source</th>
                <th className="p-3 text-right">Signups</th>
                <th className="p-3 text-right">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {stats.topReferralSources.map((source: { source: string | null; count: number }) => {
                const percentage = ((source.count / stats.totalSignups) * 100).toFixed(1);
                return (
                  <tr key={source.source} className="text-sm text-white">
                    <td className="p-3">{source.source || "Direct"}</td>
                    <td className="p-3 text-right">{source.count}</td>
                    <td className="p-3 text-right text-zinc-400">{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
