"use client";

import { useState, FormEvent } from "react";
import Turnstile from "@/components/Turnstile";

export function MigrationSection() {
  const [formData, setFormData] = useState({
    email: "",
    website: "",
    currentHost: "",
    monthlyTraffic: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      setError("Please complete the security verification");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
          referralSource: "migration_customer",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setSuccess(true);
      setFormData({
        email: "",
        website: "",
        currentHost: "",
        monthlyTraffic: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 border-t border-white/10">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Moving Hosts is a Pain. <br />We&apos;ll Do It For You.
            </h2>
            <p className="text-zinc-400">
              Tell us about your current setup. We&apos;ll send you a custom migration plan—free, no obligations.
            </p>
          </div>

          {success ? (
            <div className="p-8 rounded-2xl border border-green-500/20 bg-green-500/10 text-center">
              <h3 className="text-xl font-bold text-green-400 mb-2">
                ✓ Request Received!
              </h3>
              <p className="text-zinc-300">
                We&apos;ll send your migration plan within 24 hours. Check your email!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl border border-white/10 bg-white/5">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Website URL</label>
                  <input
                    type="url"
                    placeholder="https://yoursite.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    disabled={loading}
                    className="w-full h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={loading}
                    required
                    className="w-full h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Host (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., Kinsta, WP Engine"
                    value={formData.currentHost}
                    onChange={(e) => setFormData({ ...formData, currentHost: e.target.value })}
                    disabled={loading}
                    className="w-full h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly Traffic</label>
                  <select
                    value={formData.monthlyTraffic}
                    onChange={(e) => setFormData({ ...formData, monthlyTraffic: e.target.value })}
                    disabled={loading}
                    className="w-full h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select range</option>
                    <option value="<1k">Less than 1k</option>
                    <option value="1k-10k">1k - 10k</option>
                    <option value="10k-50k">10k - 50k</option>
                    <option value="50k-100k">50k - 100k</option>
                    <option value="100k-500k">100k - 500k</option>
                    <option value="500k-1M">500k - 1M</option>
                    <option value="1M+">1M+</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center">
                <Turnstile
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => setError("Security verification failed. Please try again.")}
                  onExpire={() => setTurnstileToken(null)}
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !turnstileToken}
                className="w-full h-12 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Get Free Migration Plan"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
