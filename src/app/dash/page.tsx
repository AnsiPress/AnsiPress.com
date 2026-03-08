"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientText } from "@/components/ui/gradient-text";
import { api } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Ignore errors — clear cookies regardless
    }
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <GradientText>AnsiPress Dashboard</GradientText>
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="bg-white/5 border-white/10 hover:bg-white/10 text-white text-sm"
          >
            Log out
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Coming soon hero */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 px-4 py-1.5 rounded-full text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Building something great
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Dashboard <GradientText>Coming Soon</GradientText>
            </h1>
            <p className="text-lg text-zinc-400 max-w-md mx-auto">
              We&apos;re building your server management dashboard.
              You&apos;ll be able to manage servers, deploy sites, and more.
            </p>
          </div>

          {/* Feature cards preview */}
          <div className="grid sm:grid-cols-3 gap-4 w-full max-w-3xl mt-8">
            <FeatureCard
              emoji="🖥️"
              title="Servers"
              description="Connect and provision your VPS with one click"
            />
            <FeatureCard
              emoji="🌐"
              title="Sites"
              description="Deploy WordPress, PHP, or static sites instantly"
            />
            <FeatureCard
              emoji="⚙️"
              title="Settings"
              description="Manage your account, billing, and preferences"
            />
          </div>

          {/* Status note */}
          <div className="mt-12 bg-white/5 border border-white/10 rounded-xl px-6 py-4 max-w-md">
            <p className="text-sm text-zinc-400">
              <span className="text-green-400 font-medium">✓ You&apos;re logged in.</span>{" "}
              We&apos;ll notify you by email when the dashboard is ready.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <Card className="border-white/10 bg-white/5 text-left">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white flex items-center gap-2">
          <span>{emoji}</span> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-zinc-500 text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
