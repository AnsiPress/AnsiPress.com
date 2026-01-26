"use client";

import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    useCase: "",
    message: "",
  });
  const [joinWaitlist, setJoinWaitlist] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waitlistAdded, setWaitlistAdded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const utmParams = new URLSearchParams(window.location.search);
      const payload = {
        name: form.name,
        email: form.email,
        company: form.company || undefined,
        website: form.website || undefined,
        useCase: form.useCase || undefined,
        message: form.message,
        utmSource: utmParams.get("utm_source") || undefined,
        utmMedium: utmParams.get("utm_medium") || undefined,
        utmCampaign: utmParams.get("utm_campaign") || undefined,
        referralSource: utmParams.get("ref") || undefined,
      };

      // Submit contact form
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");

      // If checkbox is checked, also add to waitlist
      if (joinWaitlist) {
        try {
          // Only include website if it's a valid URL
          let websiteForWaitlist: string | undefined = undefined;
          if (form.website) {
            try {
              new URL(form.website.startsWith("http") ? form.website : `https://${form.website}`);
              websiteForWaitlist = form.website.startsWith("http") ? form.website : `https://${form.website}`;
            } catch {
              // Invalid URL, skip it
            }
          }

          const waitlistRes = await fetch("/api/waitlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: form.email,
              website: websiteForWaitlist,
              referralSource: "enterprise_customer",
              utmSource: utmParams.get("utm_source") || undefined,
              utmMedium: utmParams.get("utm_medium") || undefined,
              utmCampaign: utmParams.get("utm_campaign") || undefined,
            }),
          });
          const waitlistData = await waitlistRes.json();
          console.log("Waitlist response:", waitlistRes.status, waitlistData);
          if (waitlistRes.ok) {
            setWaitlistAdded(true);
          }
        } catch (waitlistErr) {
          console.error("Waitlist error:", waitlistErr);
          // Silently fail waitlist - contact form was still submitted
        }
      }

      setSuccess(true);
      setForm({ name: "", email: "", company: "", website: "", useCase: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container py-24 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-2 inline-block">
            AnsiPress
          </h1>
          <p className="text-zinc-400">Enterprise Contact</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          {success ? (
            <div className="text-center py-4">
              <h2 className="text-2xl font-bold text-green-400 mb-2">Thank you!</h2>
              <p className="text-zinc-400">We&apos;ve received your message and will get back to you soon.</p>
              {waitlistAdded && (
                <p className="text-zinc-400 mt-2">
                  ✓ Check your email to verify your waitlist signup.
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="w-full h-11 px-3 rounded-lg bg-white/10 border border-white/20" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full h-11 px-3 rounded-lg bg-white/10 border border-white/20" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Company</label>
                  <input name="company" value={form.company} onChange={handleChange} className="w-full h-11 px-3 rounded-lg bg-white/10 border border-white/20" />
                </div>
                <div>
                  <label className="block text-sm mb-2">Website</label>
                  <input name="website" value={form.website} onChange={handleChange} className="w-full h-11 px-3 rounded-lg bg-white/10 border border-white/20" />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">Use Case</label>
                <input name="useCase" value={form.useCase} onChange={handleChange} className="w-full h-11 px-3 rounded-lg bg-white/10 border border-white/20" placeholder="e.g., E-commerce, Blog, SaaS" />
              </div>
              <div>
                <label className="block text-sm mb-2">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required className="w-full h-28 px-3 py-2 rounded-lg bg-white/10 border border-white/20" placeholder="Tell us about your requirements..." />
              </div>
              
              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="joinWaitlist"
                  checked={joinWaitlist}
                  onChange={(e) => setJoinWaitlist(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="joinWaitlist" className="text-sm text-zinc-300 cursor-pointer">
                  Also join the waitlist for early access updates
                </label>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button type="submit" disabled={loading} className="w-full h-11 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
