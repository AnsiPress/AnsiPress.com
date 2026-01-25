import { Users, CheckCircle, TrendingUp, Mail } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { SignupsChart } from "@/components/admin/SignupsChart";
import { SourcesChart } from "@/components/admin/SourcesChart";

/**
 * Fetch stats from API
 */
async function getStats() {
  const apiKey = process.env.ADMIN_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/api/admin/stats`, {
      headers: {
        "x-api-key": apiKey || "",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch stats");
    }

    return response.json();
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
          Welcome back! Here's what's happening with your waitlist.
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
