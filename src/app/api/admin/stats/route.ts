import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { waitlist, emailLogs } from "@/lib/db/schema";
import { count, eq, gte, sql } from "drizzle-orm";
import { verifyAdminApiKey } from "@/lib/auth";

/**
 * Verify admin authentication
 */
function checkAuth(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  return verifyAdminApiKey(apiKey);
}

/**
 * GET /api/admin/stats - Dashboard statistics
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!checkAuth(request)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

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

    // UTM source breakdown
    const utmSources = await db
      .select({
        source: waitlist.utmSource,
        count: count(),
      })
      .from(waitlist)
      .where(sql`${waitlist.utmSource} IS NOT NULL`)
      .groupBy(waitlist.utmSource)
      .orderBy(desc(count()));

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

    return NextResponse.json({
      totalSignups: totalSignups?.count || 0,
      verifiedEmails: verifiedEmails?.count || 0,
      todaySignups: todaySignups?.count || 0,
      growthPercentage: Math.round(growthPercentage * 10) / 10,
      verificationRate: totalSignups?.count 
        ? Math.round((verifiedEmails?.count || 0) / totalSignups.count * 100 * 10) / 10
        : 0,
      signupsByDay,
      topReferralSources,
      utmSources,
      emailStats: {
        totalSent: totalEmails,
        delivered: deliveredCount,
        opened: openedCount,
        deliveryRate: Math.round(deliveryRate * 10) / 10,
        openRate: Math.round(openRate * 10) / 10,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
