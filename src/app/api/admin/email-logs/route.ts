import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { emailLogs, waitlist } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { verifyAdminApiKey } from "@/lib/auth";

/**
 * Verify admin authentication
 */
function checkAuth(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  return verifyAdminApiKey(apiKey);
}

/**
 * GET /api/admin/email-logs - View email history
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
    const emailType = searchParams.get("emailType");
    const status = searchParams.get("status");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 200);

    // Build query
    let query = db
      .select({
        id: emailLogs.id,
        emailType: emailLogs.emailType,
        sentAt: emailLogs.sentAt,
        status: emailLogs.status,
        resendId: emailLogs.resendId,
        error: emailLogs.error,
        email: waitlist.email,
        waitlistId: waitlist.id,
      })
      .from(emailLogs)
      .innerJoin(waitlist, eq(emailLogs.waitlistId, waitlist.id))
      .orderBy(desc(emailLogs.sentAt))
      .limit(limit);

    // Apply filters
    const conditions = [];
    if (emailType) {
      conditions.push(eq(emailLogs.emailType, emailType));
    }
    if (status) {
      conditions.push(eq(emailLogs.status, status));
    }

    const logs = await query;

    return NextResponse.json({ logs });
  } catch (error) {
    console.error("Error fetching email logs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
