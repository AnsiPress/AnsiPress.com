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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
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
            <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-6 text-center">
              <p className="text-green-400 font-medium">Thank you! We will get back to you shortly.</p>
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
                <input name="useCase" value={form.useCase} onChange={handleChange} className="w-full h-11 px-3 rounded-lg bg-white/10 border border-white/20" />
              </div>
              <div>
                <label className="block text-sm mb-2">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required className="w-full h-28 px-3 py-2 rounded-lg bg-white/10 border border-white/20" />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button type="submit" disabled={loading} className="w-full h-11 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium">
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
