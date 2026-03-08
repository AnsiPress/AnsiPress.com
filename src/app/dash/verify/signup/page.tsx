"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientText } from "@/components/ui/gradient-text";
import { api } from "@/lib/api";

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("Invalid verification link");
      return;
    }

    const verify = async () => {
      try {
        await api.get(`/auth/verify?token=${token}`);
        setStatus("success");
      } catch (err: unknown) {
        setStatus("error");
        const message = err instanceof Error ? err.message : "Verification failed";
        setErrorMessage(message);
      }
    };

    verify();
  }, [token]);

  return (
    <Card className="w-full max-w-md border-white/10 bg-white/5">
      {status === "loading" && (
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
          </div>
          <CardTitle className="text-xl">Verifying your email...</CardTitle>
        </CardHeader>
      )}

      {status === "success" && (
        <>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              <GradientText>Email verified!</GradientText>
            </CardTitle>
            <CardDescription className="mt-2">
              Your account is now active. You can sign in to your dashboard.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Link href="/login" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              Go to login
            </Link>
          </CardFooter>
        </>
      )}

      {status === "error" && (
        <>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-400">Verification failed</CardTitle>
            <CardDescription className="mt-2">{errorMessage}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Link href="/login" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              Go to login
            </Link>
          </CardFooter>
        </>
      )}
    </Card>
  );
}

export default function VerifySignupPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <Suspense fallback={
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
        </div>
      }>
        <VerifyContent />
      </Suspense>
    </div>
  );
}
