import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { waitlist } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Validation schema for unsubscribe request
 */
const unsubscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

/**
 * POST /api/unsubscribe - Unsubscribe from waitlist
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validation = unsubscribeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.issues },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Find entry with matching email
    const [entry] = await db
      .select()
      .from(waitlist)
      .where(eq(waitlist.email, email))
      .limit(1);

    if (!entry) {
      return NextResponse.json(
        { error: "Email not found on waitlist" },
        { status: 404 }
      );
    }

    // Update entry to mark as unsubscribed
    await db
      .update(waitlist)
      .set({
        subscribed: false,
        updatedAt: new Date(),
      })
      .where(eq(waitlist.id, entry.id));

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed",
    });
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
