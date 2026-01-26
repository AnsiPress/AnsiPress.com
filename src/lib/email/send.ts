import { Resend } from "resend";
import { render } from "@react-email/components";
import { WelcomeEmail } from "./templates/WelcomeEmail";
import { AdminNotificationEmail } from "./templates/AdminNotificationEmail";
import { WeeklyUpdateEmail } from "./templates/WeeklyUpdateEmail";
import { EnterpriseContactEmail } from "./templates/EnterpriseContactEmail";
import { db } from "../db";
import { emailLogs } from "../db/schema";

/**
 * Initialize Resend client
 */
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Get the "from" email address
 */
const getFromEmail = () => {
  return process.env.RESEND_FROM_EMAIL || "waitlist@ansipress.com";
};

/**
 * Get admin email address for notifications
 */
const getAdminEmail = () => {
  return process.env.ADMIN_EMAIL || "admin@ansipress.com";
};

/**
 * Log email to database
 */
async function logEmail(
  waitlistId: number,
  emailType: string,
  resendId?: string,
  error?: string
) {
  try {
    await db.insert(emailLogs).values({
      waitlistId,
      emailType,
      resendId: resendId || null,
      status: error ? "bounced" : "sent",
      error: error || null,
    });
  } catch (err) {
    console.error("Failed to log email:", err);
  }
}

/**
 * Send welcome email with verification link
 */
export async function sendWelcomeEmail(
  to: string,
  verificationToken: string,
  waitlistId: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const emailHtml = await render(
      WelcomeEmail({ email: to, verificationToken })
    );

    const { data, error } = await resend.emails.send({
      from: getFromEmail(),
      to,
      subject: "Welcome to AnsiPress - Verify Your Email",
      html: emailHtml,
    });

    if (error) {
      await logEmail(waitlistId, "welcome", undefined, error.message);
      return { success: false, error: error.message };
    }

    await logEmail(waitlistId, "welcome", data?.id);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    await logEmail(waitlistId, "welcome", undefined, errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Send admin notification email
 */
export async function sendAdminNotification(data: {
  email: string;
  website?: string;
  currentHost?: string;
  monthlyTraffic?: string;
  referralSource?: string;
  utmSource?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const emailHtml = await render(AdminNotificationEmail(data));

    const { error } = await resend.emails.send({
      from: getFromEmail(),
      to: getAdminEmail(),
      subject: `New Waitlist Signup: ${data.email}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Failed to send admin notification:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to send admin notification:", errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Send weekly update email
 */
export async function sendWeeklyUpdate(
  to: string,
  updates: string[],
  waitlistId: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const emailHtml = await render(
      WeeklyUpdateEmail({ email: to, updates })
    );

    const { data, error } = await resend.emails.send({
      from: getFromEmail(),
      to,
      subject: "AnsiPress Weekly Update",
      html: emailHtml,
    });

    if (error) {
      await logEmail(waitlistId, "weekly_update", undefined, error.message);
      return { success: false, error: error.message };
    }

    await logEmail(waitlistId, "weekly_update", data?.id);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    await logEmail(waitlistId, "weekly_update", undefined, errorMessage);
    return { success: false, error: errorMessage };
  }
}

/**
 * Send enterprise contact notification to admin
 */
export async function sendEnterpriseContactNotification(data: {
  name: string;
  email: string;
  company?: string;
  website?: string;
  useCase?: string;
  message: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referralSource?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const emailHtml = await render(EnterpriseContactEmail(data));

    const { error } = await resend.emails.send({
      from: getFromEmail(),
      to: getAdminEmail(),
      subject: `New Enterprise Contact: ${data.name} <${data.email}>`,
      html: emailHtml,
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}
