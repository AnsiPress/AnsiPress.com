import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

/**
 * Waitlist table - stores user signups for AnsiPress hosting
 */
export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
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
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Email logs table - tracks all emails sent to waitlist users
 */
export const emailLogs = pgTable("email_logs", {
  id: serial("id").primaryKey(),
  waitlistId: integer("waitlist_id")
    .notNull()
    .references(() => waitlist.id, { onDelete: "cascade" }),
  emailType: text("email_type").notNull(), // 'welcome', 'weekly_update', 'launch_notification'
  sentAt: timestamp("sent_at").defaultNow().notNull(),
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
export const enterpriseContacts = pgTable("enterprise_contacts", {
  id: serial("id").primaryKey(),
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
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type EnterpriseContact = typeof enterpriseContacts.$inferSelect;
export type NewEnterpriseContact = typeof enterpriseContacts.$inferInsert;
