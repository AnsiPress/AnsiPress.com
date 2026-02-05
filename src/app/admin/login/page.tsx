import { redirect } from "next/navigation";
import { verifyAdminPassword, createAdminSession, setAdminCookie } from "@/lib/auth";
import Link from "next/link";
import { LoginForm } from "@/components/admin/LoginForm";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { BrandLogo } from "@/components/ui/brand-logo";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;
  const redirectTo = params.redirect || "/admin";

  async function handleLogin(formData: FormData) {
    "use server";

    const password = formData.get("password") as string;
    const redirectPath = formData.get("redirect") as string;
    const turnstileToken = formData.get("turnstileToken") as string;

    if (!password || !turnstileToken) {
      throw new Error("Missing required fields");
    }

    // Verify Turnstile token
    const turnstileResult = await verifyTurnstileToken(turnstileToken);
    if (!turnstileResult.success) {
      throw new Error("Security verification failed");
    }

    const isValid = await verifyAdminPassword(password);

    if (isValid) {
      const token = await createAdminSession();
      await setAdminCookie(token);
      redirect(redirectPath || "/admin");
    } else {
      throw new Error("Invalid password");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <BrandLogo size="lg" as="h1" className="mb-2">
            AnsiPress Admin
          </BrandLogo>
          <p className="text-zinc-400">Enter your password to continue</p>
        </div>

        {/* Login Form */}
        <LoginForm action={handleLogin} redirectTo={redirectTo} />

        {/* Back to Site */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
            ← Back to AnsiPress.com
          </Link>
        </div>
      </div>
    </div>
  );
}
