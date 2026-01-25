import { db } from "./index";
import { waitlist, emailLogs } from "./schema";

/**
 * Seed script to populate the database with test data
 * Run with: npm run db:seed
 */

const seedData = [
  {
    email: "john.doe@example.com",
    website: "https://johndoe.com",
    currentHost: "WP Engine",
    monthlyTraffic: "50k-100k",
    referralSource: "organic",
    utmSource: "google",
    utmMedium: "organic",
    emailVerified: true,
    subscribed: true,
  },
  {
    email: "jane.smith@startup.io",
    website: "https://startup.io",
    currentHost: "Kinsta",
    monthlyTraffic: "100k-500k",
    referralSource: "direct",
    emailVerified: true,
    subscribed: true,
  },
  {
    email: "dev@agency.com",
    website: "https://agency.com",
    currentHost: "SiteGround",
    monthlyTraffic: "10k-50k",
    referralSource: "referral",
    utmSource: "twitter",
    utmMedium: "social",
    emailVerified: false,
    subscribed: true,
  },
  {
    email: "tech@enterprise.com",
    website: "https://enterprise.com",
    currentHost: "AWS",
    monthlyTraffic: "1M+",
    referralSource: "referral",
    utmSource: "linkedin",
    utmMedium: "social",
    emailVerified: true,
    subscribed: true,
  },
  {
    email: "hello@blogger.net",
    currentHost: "Bluehost",
    monthlyTraffic: "1k-10k",
    referralSource: "organic",
    emailVerified: false,
    subscribed: true,
  },
];

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // Insert waitlist entries
    for (const entry of seedData) {
      const [inserted] = await db
        .insert(waitlist)
        .values({
          ...entry,
          verificationToken: `token-${Math.random().toString(36).substring(7)}`,
          ipAddress: "127.0.0.1",
          userAgent: "Mozilla/5.0 (Seeder)",
        })
        .returning();

      console.log(`✅ Created waitlist entry: ${inserted.email}`);

      // Add some email logs for verified users
      if (entry.emailVerified) {
        await db.insert(emailLogs).values({
          waitlistId: inserted.id,
          emailType: "welcome",
          status: "delivered",
          resendId: `resend-${Math.random().toString(36).substring(7)}`,
        });
        console.log(`📧 Added email log for: ${inserted.email}`);
      }
    }

    console.log("✨ Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
