import { ReactNode } from "react";
import Link from "next/link";
import { clearAdminCookie, isAdminAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = await isAdminAuthenticated();

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
              <Link href="/admin" className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                AnsiPress Admin
              </Link>
              {isAuthenticated && (
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
                  <Link
                    href="/admin/contacts"
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    Contacts
                  </Link>
                </nav>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                View Site
              </Link>
              {isAuthenticated && (
                <form action={handleLogout}>
                  <button
                    type="submit"
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    Logout
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
