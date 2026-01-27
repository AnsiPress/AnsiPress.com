/**
 * Verify Cloudflare Turnstile token on the server side
 */
export async function verifyTurnstileToken(token: string): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.warn("Turnstile secret key not configured, skipping verification");
    return { success: true }; // Allow in development if not configured
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return { success: true };
    }

    return {
      success: false,
      error: data["error-codes"]?.join(", ") || "Verification failed",
    };
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return { success: false, error: "Verification service unavailable" };
  }
}
