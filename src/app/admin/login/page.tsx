import { redirect } from "next/navigation";
import { verifyAdminPassword, createAdminSession, setAdminCookie } from "@/lib/auth";
import Link from "next/link";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  async function handleLogin(formData: FormData) {
    "use server";

    const password = formData.get("password") as string;

    if (!password) {
      return;
    }

    const isValid = await verifyAdminPassword(password);

    if (isValid) {
      const token = await createAdminSession();
      await setAdminCookie(token);

      const params = await searchParams;
      const redirectTo = params.redirect || "/admin";
      redirect(redirectTo);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            AnsiPress <span className="text-purple-400">Admin</span>
          </h1>
          <p className="text-zinc-400">Enter your password to continue</p>
        </div>

        {/* Login Form */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-8">
          <form action={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>

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
