"use client";

import { useState } from "react";
import Turnstile from "@/components/Turnstile";

interface LoginFormProps {
  action: (formData: FormData) => Promise<void>;
  redirectTo: string;
}

export function LoginForm({ action, redirectTo }: LoginFormProps) {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    if (!turnstileToken) {
      setError("Please complete the security verification");
      return;
    }

    formData.append("turnstileToken", turnstileToken);
    try {
      await action(formData);
    } catch (err) {
      setError("Login failed. Please check your password.");
    }
  };

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-8">
      <form action={handleSubmit} className="space-y-6">
        <input type="hidden" name="redirect" value={redirectTo} />
        <div>
          <label htmlFor="password" theological-sm font-medium mb-2 className="block text-sm font-medium mb-2">
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

        <div className="flex justify-center">
          <Turnstile
            onSuccess={(token) => {
              setTurnstileToken(token);
              setError(null);
            }}
            onError={() => setError("Security verification failed")}
            onExpire={() => setTurnstileToken(null)}
          />
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={!turnstileToken}
          className="w-full h-12 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
