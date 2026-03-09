"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GradientText } from "@/components/ui/gradient-text";

function VerifyContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch("/api/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error("Verification failed");
        }

        setStatus("success");
        setMessage("Email verified successfully!");

        // Redirect to homepage after 5 seconds
        setTimeout(() => {
          window.location.href = "/";
        }, 5000);
      } catch (error) {
        setStatus("error");
        setMessage("Failed to verify email. The link may be invalid or expired.");
      }
    };

    verifyEmail();
  }, [searchParams]);

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
              <p className="text-zinc-400">Verifying your email...</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
              <p className="text-zinc-400 mb-6">{message}</p>
              <p className="text-sm text-zinc-500 mb-4">
                You&apos;ll now receive updates about AnsiPress. Get ready for early access!
              </p>
              <div className="flex items-center justify-center gap-4 mb-4">
                <a
                  href="https://twitter.com/ansipress"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Follow on Twitter
                </a>
                <span className="text-zinc-600">•</span>
                <a
                  href="https://github.com/ansipress"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Star on GitHub
                </a>
              </div>
              <p className="text-xs text-zinc-500">
                Redirecting to homepage in 5 seconds...
              </p>
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
              <h2 className="text-2xl font-bold text-white mb-2">Verification Failed</h2>
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

function VerifyLoading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="rounded-lg border border-white/10 bg-white/5 p-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold tracking-tight mb-2 inline-block">
              <GradientText>AnsiPress</GradientText>
            </h1>
          </div>
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Verifying your email...</p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<VerifyLoading />}>
      <VerifyContent />
    </Suspense>
  );
}
