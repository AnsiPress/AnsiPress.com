import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  pgSchema,
} from "drizzle-orm/pg-core";

// Define the 'www' schema
export const wwwSchema = pgSchema("www");

/**
 * Waitlist table - stores user signups for AnsiPress hosting
 */
export const waitlist = wwwSchema.table("waitlist", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  website: text("website"),
  currentHost: text("current_host"),
  monthlyTraffic: text("monthly_traffic"),
  referralSource: text("referral_source").default("direct"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  subscribed: boolean("subscribed").default(true).notNull(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  verificationToken: text("verification_token"),
  tags: text("tags").array().default([]),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Email logs table - tracks all emails sent to waitlist users
 */
export const emailLogs = wwwSchema.table("email_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  waitlistId: uuid("waitlist_id")
    .notNull()
    .references(() => waitlist.id, { onDelete: "cascade" }),
  emailType: text("email_type").notNull(), // 'welcome', 'weekly_update', 'launch_notification'
  sentAt: timestamp("sent_at", { withTimezone: true }).defaultNow().notNull(),
  status: text("status").default("sent").notNull(), // 'sent', 'delivered', 'opened', 'clicked', 'bounced'
  resendId: text("resend_id"),
  error: text("error"),
});

// TypeScript types for database operations
export type Waitlist = typeof waitlist.$inferSelect;
export type NewWaitlist = typeof waitlist.$inferInsert;
export type EmailLog = typeof emailLogs.$inferSelect;
export type NewEmailLog = typeof emailLogs.$inferInsert;

/**
 * Enterprise contacts table - stores contact requests from enterprise customers
 */
export const enterpriseContacts = wwwSchema.table("enterprise_contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  website: text("website"),
  useCase: text("use_case"),
  message: text("message").notNull(),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  referralSource: text("referral_source"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type EnterpriseContact = typeof enterpriseContacts.$inferSelect;
export type NewEnterpriseContact = typeof enterpriseContacts.$inferInsert;
