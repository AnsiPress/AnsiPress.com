import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { waitlist, emailLogs } from "@/lib/db/schema";
import { eq, desc, count, and } from "drizzle-orm";
import { verifyAdminApiKey } from "@/lib/auth";
import { z } from "zod";

/**
 * Verify admin authentication
 */
function checkAuth(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  return verifyAdminApiKey(apiKey);
}

/**
 * GET /api/admin/waitlist - List all waitlist entries
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

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "30"), 100);
    const subscribedFilter = searchParams.get("subscribed");
    const emailVerifiedFilter = searchParams.get("emailVerified");

    // Build filter conditions
    const conditions = [];
    if (subscribedFilter !== null) {
      conditions.push(eq(waitlist.subscribed, subscribedFilter === "true"));
    }
    if (emailVerifiedFilter !== null) {
      conditions.push(eq(waitlist.emailVerified, emailVerifiedFilter === "true"));
    }

    // Get total count
    const [totalResult] = await db
      .select({ count: count() })
      .from(waitlist)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const total = totalResult?.count || 0;

    // Get entries with pagination
    const entries = await db
      .select()
      .from(waitlist)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(waitlist.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

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

    return NextResponse.json({
      entries: entriesWithCounts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching waitlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
