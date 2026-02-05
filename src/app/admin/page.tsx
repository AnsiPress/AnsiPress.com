import { Users, CheckCircle, TrendingUp, Mail, Building2 } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { SignupsChart } from "@/components/admin/SignupsChart";
import { SourcesChart } from "@/components/admin/SourcesChart";
import { db } from "@/lib/db";
import { waitlist, emailLogs, enterpriseContacts } from "@/lib/db/schema";
import { count, eq, gte, sql, desc } from "drizzle-orm";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

/**
 * Fetch stats directly from database
 */
async function getStats() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Parallelize all independent database queries
    const [
      [totalSignups],
      [verifiedEmails],
      [todaySignups],
      [last7DaysSignups],
      [previous7DaysSignups],
      signupsByDay,
      topReferralSources,
      [totalEmailsSent],
      [deliveredEmails],
      [openedEmails],
      [totalEnterpriseContacts],
      [enterpriseThisWeek],
      [enterpriseLastWeek],
      [enterpriseThisMonth],
    ] = await Promise.all([
      db.select({ count: count() }).from(waitlist),
      db.select({ count: count() }).from(waitlist).where(eq(waitlist.emailVerified, true)),
      db.select({ count: count() }).from(waitlist).where(gte(waitlist.createdAt, today)),
      db.select({ count: count() }).from(waitlist).where(gte(waitlist.createdAt, sevenDaysAgo)),
      db.select({
        count: count(),
      }).from(waitlist).where(
        sql`${waitlist.createdAt} >= ${fourteenDaysAgo} AND ${waitlist.createdAt} < ${sevenDaysAgo}`
      ),
      db.select({
        date: sql<string>`DATE(${waitlist.createdAt})`,
        count: count(),
      }).from(waitlist).where(gte(waitlist.createdAt, thirtyDaysAgo)).groupBy(sql`DATE(${waitlist.createdAt})`).orderBy(sql`DATE(${waitlist.createdAt})`),
      db.select({
        source: waitlist.referralSource,
        count: count(),
      }).from(waitlist).groupBy(waitlist.referralSource).orderBy(desc(count())).limit(10),
      db.select({ count: count() }).from(emailLogs),
      db.select({ count: count() }).from(emailLogs).where(eq(emailLogs.status, "delivered")),
      db.select({ count: count() }).from(emailLogs).where(eq(emailLogs.status, "opened")),
      db.select({ count: count() }).from(enterpriseContacts),
      db.select({ count: count() }).from(enterpriseContacts).where(gte(enterpriseContacts.createdAt, sevenDaysAgo)),
      db.select({
        count: count(),
      }).from(enterpriseContacts).where(
        sql`${enterpriseContacts.createdAt} >= ${fourteenDaysAgo} AND ${enterpriseContacts.createdAt} < ${sevenDaysAgo}`
      ),
      db.select({ count: count() }).from(enterpriseContacts).where(gte(enterpriseContacts.createdAt, thirtyDaysAgo)),
    ]);

    // Calculate 7-day growth percentage
    const last7Count = last7DaysSignups?.count || 0;
    const prev7Count = previous7DaysSignups?.count || 0;
    const growthPercentage = prev7Count > 0 
      ? ((last7Count - prev7Count) / prev7Count) * 100 
      : 0;

    // Email delivery stats
    const totalEmails = totalEmailsSent?.count || 0;
    const deliveredCount = deliveredEmails?.count || 0;
    const openedCount = openedEmails?.count || 0;

    const deliveryRate = totalEmails > 0 ? (deliveredCount / totalEmails) * 100 : 0;
    const openRate = totalEmails > 0 ? (openedCount / totalEmails) * 100 : 0;

    // Enterprise contact stats
    const enterpriseThisWeekCount = enterpriseThisWeek?.count || 0;
    const enterpriseLastWeekCount = enterpriseLastWeek?.count || 0;
    
    // Calculate growth - if last week was 0 but this week has signups, show 100%
    let enterpriseGrowth: number | null;
    if (enterpriseLastWeekCount > 0) {
      enterpriseGrowth = ((enterpriseThisWeekCount - enterpriseLastWeekCount) / enterpriseLastWeekCount) * 100;
    } else if (enterpriseThisWeekCount > 0) {
      enterpriseGrowth = 100; // New growth from zero
    } else {
      enterpriseGrowth = null; // Both are 0, no meaningful growth
    }

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
      enterpriseStats: {
        total: totalEnterpriseContacts?.count || 0,
        thisWeek: enterpriseThisWeekCount,
        lastWeek: enterpriseLastWeekCount,
        thisMonth: enterpriseThisMonth?.count || 0,
        growth: enterpriseGrowth !== null ? Math.round(enterpriseGrowth * 10) / 10 : null,
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
        <StatsCard
          title="Enterprise Contacts"
          value={stats.enterpriseStats.total}
          change={stats.enterpriseStats.growth ?? undefined}
          icon={<Building2 className="w-8 h-8" />}
        />
      </div>

      {/* Enterprise Stats */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Enterprise Contact Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-white/5">
            <p className="text-2xl font-bold text-white">{stats.enterpriseStats.thisWeek}</p>
            <p className="text-sm text-zinc-400">This Week</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5">
            <p className="text-2xl font-bold text-white">{stats.enterpriseStats.lastWeek}</p>
            <p className="text-sm text-zinc-400">Last Week</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5">
            <p className="text-2xl font-bold text-white">{stats.enterpriseStats.thisMonth}</p>
            <p className="text-sm text-zinc-400">This Month</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5">
            <p className={`text-2xl font-bold ${stats.enterpriseStats.growth === null ? 'text-zinc-400' : stats.enterpriseStats.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.enterpriseStats.growth === null ? '—' : `${stats.enterpriseStats.growth >= 0 ? '+' : ''}${stats.enterpriseStats.growth}%`}
            </p>
            <p className="text-sm text-zinc-400">Week over Week</p>
          </div>
        </div>
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
