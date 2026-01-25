import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { waitlist } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Validation schema for verification request
 */
const verifySchema = z.object({
  token: z.string().min(1, "Token is required"),
});

/**
 * POST /api/verify - Verify email with token
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validation = verifySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.issues },
        { status: 400 }
      );
    }

    const { token } = validation.data;

    // Find entry with matching token
    const [entry] = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.verificationToken, token))
      .limit(1);

    if (!entry) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 404 }
      );
    }

    // Check if already verified
    if (entry.emailVerified) {
      return NextResponse.json({
        success: true,
        message: "Email already verified",
      });
    }

    // Update entry to mark as verified
    await db
      .update(waitlist)
      .set({
        emailVerified: true,
        updatedAt: new Date(),
      })
      .where(eq(waitlist.id, entry.id));

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
