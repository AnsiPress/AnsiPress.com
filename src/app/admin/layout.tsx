import { ReactNode } from "react";
import Link from "next/link";
import { clearAdminCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  async function handleLogout() {
    "use server";
    await clearAdminCookie();
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Admin Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-xl font-bold">
                AnsiPress <span className="text-purple-400">Admin</span>
              </Link>
              <nav className="flex gap-6">
                <Link
                  href="/admin"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/waitlist"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Waitlist
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                View Site
              </Link>
              <form action={handleLogout}>
                <button
                  type="submit"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
