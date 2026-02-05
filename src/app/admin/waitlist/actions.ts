"use server";

import { db } from "@/lib/db";
import { waitlist } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";

/**
 * Update a waitlist entry
 */
export async function updateWaitlistEntry(id: number, updates: any) {
  if (!await isAdminAuthenticated()) {
    throw new Error("Unauthorized");
  }

  try {
    const [updated] = await db
      .update(waitlist)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(waitlist.id, id))
      .returning();

    if (updated) {
      revalidatePath("/admin/waitlist");
    }
    
    return { success: true, entry: updated };
  } catch (error) {
    console.error("Error updating waitlist entry:", error);
    throw new Error("Failed to update entry");
  }
}

/**
 * Soft delete a waitlist entry
 */
export async function deleteWaitlistEntry(id: number) {
  if (!await isAdminAuthenticated()) {
    throw new Error("Unauthorized");
  }

  try {
    const [deleted] = await db
      .update(waitlist)
      .set({
        subscribed: false,
        updatedAt: new Date(),
      })
      .where(eq(waitlist.id, id))
      .returning();

    if (deleted) {
      revalidatePath("/admin/waitlist");
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting waitlist entry:", error);
    throw new Error("Failed to delete entry");
  }
}
