import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { waitlist } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { sendWelcomeEmail, sendAdminNotification } from "@/lib/email/send";
import { checkIpRateLimit, checkEmailRateLimit } from "@/lib/rate-limit";
import { randomUUID } from "crypto";

/**
 * Validation schema for waitlist signup
 */
const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  currentHost: z.string().optional(),
  monthlyTraffic: z.string().optional(),
  referralSource: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

/**
 * Get client IP address from request
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const real = request.headers.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  if (real) {
    return real;
  }
  
  return "unknown";
}

/**
 * POST /api/waitlist - Join waitlist
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate input
    const validation = waitlistSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.errors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Get IP address and User-Agent
    const ipAddress = getClientIp(request);
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Check rate limits
    const ipLimit = checkIpRateLimit(ipAddress);
    if (!ipLimit.allowed) {
      return NextResponse.json(
        { 
          error: "Too many requests from this IP address. Please try again later.",
          resetAt: new Date(ipLimit.resetAt).toISOString(),
        },
        { status: 429 }
      );
    }

    const emailLimit = checkEmailRateLimit(data.email);
    if (!emailLimit.allowed) {
      return NextResponse.json(
        { 
          error: "This email has been used too many times. Please try again later.",
          resetAt: new Date(emailLimit.resetAt).toISOString(),
        },
        { status: 429 }
      );
    }

    // Check for duplicate email
    const existing = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.email, data.email))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "This email is already on the waitlist" },
        { status: 409 }
      );
    }

    // Generate verification token
    const verificationToken = randomUUID();

    // Insert into database
    const [entry] = await db
      .insert(waitlist)
      .values({
        email: data.email,
        website: data.website || null,
        currentHost: data.currentHost || null,
        monthlyTraffic: data.monthlyTraffic || null,
        referralSource: data.referralSource || "direct",
        utmSource: data.utmSource || null,
        utmMedium: data.utmMedium || null,
        utmCampaign: data.utmCampaign || null,
        ipAddress,
        userAgent,
        verificationToken,
      })
      .returning();

    // Send welcome email (don't wait for it)
    sendWelcomeEmail(entry.email, verificationToken, entry.id).catch((error) => {
      console.error("Failed to send welcome email:", error);
    });

    // Send admin notification (don't wait for it)
    sendAdminNotification({
      email: entry.email,
      website: entry.website || undefined,
      currentHost: entry.currentHost || undefined,
      monthlyTraffic: entry.monthlyTraffic || undefined,
      referralSource: entry.referralSource || undefined,
      utmSource: entry.utmSource || undefined,
    }).catch((error) => {
      console.error("Failed to send admin notification:", error);
    });

    // Return sanitized response
    return NextResponse.json(
      {
        success: true,
        data: {
          email: entry.email,
          createdAt: entry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in waitlist signup:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/waitlist?email={email} - Check subscription status
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    // Validate email
    const emailValidation = z.string().email().safeParse(email);
    if (!emailValidation.success) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Query database
    const [entry] = await db
      .select({
        subscribed: waitlist.subscribed,
        emailVerified: waitlist.emailVerified,
        createdAt: waitlist.createdAt,
      })
      .from(waitlist)
      .where(eq(waitlist.email, email))
      .limit(1);

    if (!entry) {
      return NextResponse.json(
        { error: "Email not found on waitlist" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      subscribed: entry.subscribed,
      emailVerified: entry.emailVerified,
      createdAt: entry.createdAt,
    });
  } catch (error) {
    console.error("Error checking waitlist status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
