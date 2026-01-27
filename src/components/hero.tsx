"use client";

import { useState, useEffect, FormEvent } from "react";
import { MoveRight } from "lucide-react";
import Turnstile from "@/components/Turnstile";

const terminalCommands = [
  "ansible-playbook -i inventory main.yml",
  "ansible-playbook -i inventory main.yml --tags wordpress",
  "ansible-playbook -i inventory main.yml --tags security",
];

export function Hero() {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // Typing effect
  useEffect(() => {
    let charIndex = 0;
    const command = terminalCommands[currentCommand];
    
    const interval = setInterval(() => {
      if (charIndex <= command.length) {
        setDisplayText(command.slice(0, charIndex));
        charIndex++;
      } else {
        setTimeout(() => {
          setCurrentCommand((prev) => (prev + 1) % terminalCommands.length);
        }, 2000);
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [currentCommand]);

  // Extract UTM parameters from URL
  const getUtmParams = () => {
    if (typeof window === "undefined") return {};
    
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      referralSource: params.get("ref") || undefined,
    };
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          turnstileToken,
          ...utmParams,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to join waitlist");
      }

      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none mt-20" />

      <div className="container relative z-10 flex flex-col items-center text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-purple-300 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          All Systems Operational
        </div>

        <h1 className="max-w-4xl text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          Everything You Need for<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Modern Hosting
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-4 leading-relaxed">
          Deploy, operate, and scale applications using Ansible-powered infrastructure built for real production workloads — predictable, auditable, and proven at scale.
        </p>

        {/* Terminal Preview */}
        <div className="w-full max-w-xl mb-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur p-4 text-left font-mono text-sm text-green-400">
          <div className="flex items-center gap-2 mb-2 text-zinc-500">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-purple-400">$ {displayText}<span className="animate-pulse">|</span></div>
        </div>

        {/* Waitlist Form */}
        {success ? (
          <div className="w-full max-w-md">
            <div className="rounded-full bg-green-500/10 border border-green-500/20 px-6 py-4 text-center">
              <p className="text-green-400 font-medium">
                ✓ Check your email to confirm!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 w-full">
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
                className="h-12 px-8 rounded-full bg-white text-black font-medium inline-flex items-center gap-2 hover:bg-white/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Joining..." : "Join Waitlist"}
                <MoveRight className="w-4 h-4" />
              </button>
            </form>
            <Turnstile
              onSuccess={(token) => setTurnstileToken(token)}
              onError={() => setError("Security verification failed. Please try again.")}
              onExpire={() => setTurnstileToken(null)}
            />
          </div>
        )}

        {error && (
          <p className="text-red-400 text-sm mt-4">{error}</p>
        )}

        {!success && !error && (
          <p className="text-zinc-500 text-sm mt-4">Get early access when we launch</p>
        )}
      </div>
    </section>
  );
}
