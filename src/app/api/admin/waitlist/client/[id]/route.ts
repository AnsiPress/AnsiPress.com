import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { waitlist } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

/**
 * Validation schema for updating waitlist entry
 */
const updateSchema = z.object({
  subscribed: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

/**
 * PATCH /api/admin/waitlist/client/[id] - Update waitlist entry (protected by middleware)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const entryId = parseInt(id);

    if (isNaN(entryId)) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = updateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validation.error.issues },
        { status: 400 }
      );
    }

    const updates = validation.data;

    // Update entry
    const [updated] = await db
      .update(waitlist)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(waitlist.id, entryId))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ entry: updated });
  } catch (error) {
    console.error("Error updating waitlist entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/waitlist/client/[id] - Soft delete entry (protected by middleware)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const entryId = parseInt(id);

    if (isNaN(entryId)) {
      return NextResponse.json(
        { error: "Invalid ID" },
        { status: 400 }
      );
    }

    // Soft delete by setting subscribed to false
    const [deleted] = await db
      .update(waitlist)
      .set({
        subscribed: false,
        updatedAt: new Date(),
      })
      .where(eq(waitlist.id, entryId))
      .returning();

    if (!deleted) {
      return NextResponse.json(
        { error: "Entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting waitlist entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
