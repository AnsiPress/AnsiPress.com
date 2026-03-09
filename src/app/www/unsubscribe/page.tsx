"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { GradientText } from "@/components/ui/gradient-text";
import Turnstile from "@/components/Turnstile";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [errorAtFeedback, setErrorAtFeedback] = useState<string | null>(null);

  useEffect(() => {
    const email = searchParams.get("email");

    if (!email) {
      setStatus("error");
      setMessage("Invalid unsubscribe link");
      return;
    }

    const unsubscribe = async () => {
      try {
        const response = await fetch("/api/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error("Unsubscribe failed");
        }

        setStatus("success");
        setMessage("You've been unsubscribed successfully.");
        setShowFeedback(true);
      } catch (error) {
        setStatus("error");
        setMessage("Failed to unsubscribe. Please try again later.");
      }
    };

    unsubscribe();
  }, [searchParams]);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      setErrorAtFeedback("Please complete security verification");
      return;
    }

    // In a real implementation, you'd send this feedback and token to your backend
    console.log("Feedback:", feedback, "Turnstile Token:", turnstileToken);
    setShowFeedback(false);
    setMessage("Thank you for your feedback!");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Status Card */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-8">
          {/* Logo/Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight mb-2 inline-block">
              <GradientText>AnsiPress</GradientText>
            </h1>
          </div>
          {status === "loading" && (
            <>
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-zinc-400">Processing your request...</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Unsubscribed</h2>
              <p className="text-zinc-400 mb-6">{message}</p>

              {showFeedback && (
                <form onSubmit={handleFeedbackSubmit} className="mb-6">
                  <p className="text-sm text-zinc-400 mb-3">
                    We&apos;re sorry to see you go. Mind telling us why?
                  </p>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full h-24 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder="Your feedback helps us improve..."
                  />
                  
                  <div className="flex justify-center my-4">
                    <Turnstile
                      onSuccess={(token) => {
                        setTurnstileToken(token);
                        setErrorAtFeedback(null);
                      }}
                      onError={() => setErrorAtFeedback("Security verification failed")}
                      onExpire={() => setTurnstileToken(null)}
                    />
                  </div>

                  {errorAtFeedback && <p className="text-red-400 text-sm mb-3">{errorAtFeedback}</p>}

                  <button
                    type="submit"
                    disabled={!turnstileToken}
                    className="mt-3 w-full px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Feedback
                  </button>
                </form>
              )}

              <p className="text-sm text-zinc-500 mb-4">
                You won&apos;t receive any more emails from us.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
              >
                Back to Homepage
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
              <p className="text-zinc-400 mb-6">{message}</p>
              <Link
                href="/"
                className="inline-block px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
              >
                Go to Homepage
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function UnsubscribeLoading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="rounded-lg border border-white/10 bg-white/5 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight mb-2 inline-block">
              <GradientText>AnsiPress</GradientText>
            </h1>
          </div>
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Processing your request...</p>
        </div>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<UnsubscribeLoading />}>
      <UnsubscribeContent />
    </Suspense>
  );
}
