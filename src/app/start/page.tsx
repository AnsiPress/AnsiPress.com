"use client";

import { useState, FormEvent, useEffect } from "react";
import Turnstile from "@/components/Turnstile";

type Tab = "waitlist" | "signin" | "quickstart";

export default function StartPage() {
  const [tab, setTab] = useState<Tab>("waitlist");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const getUtmParams = () => {
    if (typeof window === "undefined") return {} as Record<string, string | undefined>;
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      referralSource: params.get("ref") || undefined,
    };
  };

  const handleWaitlistSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    if (!turnstileToken) {
      setError("Please complete the security verification");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const utmParams = getUtmParams();
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstileToken, ...utmParams }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to join waitlist");
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If deep-linked with a tab query, switch initial tab
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tab") as Tab | null;
    if (t && ["waitlist", "signin", "quickstart"].includes(t)) setTab(t);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container py-24">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-2 inline-block">
            AnsiPress
          </h1>
          <p className="text-zinc-400">Choose your path to get started</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => setTab("waitlist")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tab === "waitlist" ? "bg-purple-600 text-white" : "text-zinc-300 hover:bg-white/10"
              }`}
            >
              Join Waitlist
            </button>
            <button
              onClick={() => setTab("signin")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tab === "signin" ? "bg-purple-600 text-white" : "text-zinc-300 hover:bg-white/10"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab("quickstart")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tab === "quickstart" ? "bg-purple-600 text-white" : "text-zinc-300 hover:bg-white/10"
              }`}
            >
              Quick Start
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-lg mx-auto rounded-lg border border-white/10 bg-white/5 p-6">
          {tab === "waitlist" && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Join Early Access</h2>
              <p className="text-zinc-400 mb-4">Get product updates and join the waitlist.</p>
              {success ? (
                <div className="rounded-full bg-green-500/10 border border-green-500/20 px-6 py-4 text-center">
                  <p className="text-green-400 font-medium">✓ Check your email to confirm!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row items-center gap-4">
                    <input
                      type="email"
                      placeholder="hello@ansipress.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      required
                      className="flex-1 h-12 px-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={loading || !turnstileToken}
                      className="h-12 px-8 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
                    >
                      {loading ? "Joining..." : "Join Waitlist"}
                    </button>
                  </form>
                  <div className="flex justify-center">
                    <Turnstile
                      onSuccess={(token) => setTurnstileToken(token)}
                      onError={() => setError("Security verification failed. Please try again.")}
                      onExpire={() => setTurnstileToken(null)}
                    />
                  </div>
                </div>
              )}
              {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
            </div>
          )}

          {tab === "signin" && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Sign In</h2>
              <p className="text-zinc-400 mb-4">User accounts are coming soon. For now, use the admin login if you have access.</p>
              <div className="flex items-center gap-3">
                <a href="/login" className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20">User Login</a>
                <a href="/admin/login" className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white">Admin Login</a>
              </div>
            </div>
          )}

          {tab === "quickstart" && (
            <div>
              <h2 className="text-xl font-semibold mb-3">We’re getting things ready</h2>
                This section is being built and will be live soon as part of AnsiPress.
              <p className="text-zinc-500 text-sm mt-4">
                Detailed docs are coming soon: <a href="/docs" className="text-purple-400 hover:text-purple-300">Documentation</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
