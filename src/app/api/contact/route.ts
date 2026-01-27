import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { enterpriseContacts } from "@/lib/db/schema";
import { sendEnterpriseContactNotification } from "@/lib/email/send";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, website, useCase, message, turnstileToken, utmSource, utmMedium, utmCampaign, referralSource } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify Turnstile token
    if (!turnstileToken) {
      return NextResponse.json({ error: "Security verification required" }, { status: 400 });
    }

    const turnstileResult = await verifyTurnstileToken(turnstileToken);
    if (!turnstileResult.success) {
      return NextResponse.json({ error: "Security verification failed. Please try again." }, { status: 403 });
    }

    const inserted = await db
      .insert(enterpriseContacts)
      .values({
        name,
        email,
        company: company || null,
        website: website || null,
        useCase: useCase || null,
        message,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
        referralSource: referralSource || null,
      })
      .returning({ id: enterpriseContacts.id });

    await sendEnterpriseContactNotification({
      name,
      email,
      company,
      website,
      useCase,
      message,
      utmSource,
      utmMedium,
      utmCampaign,
      referralSource,
    });

    return NextResponse.json({ success: true, id: inserted[0]?.id }, { status: 200 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
