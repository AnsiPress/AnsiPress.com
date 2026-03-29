"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientText } from "@/components/ui/gradient-text";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { api } from "@/lib/api";

import { PasswordStrengthMeter, getPasswordStrength } from "@/components/ui/password-strength-meter";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setError("You must accept the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);
    setError("");
    if (!strength.checks.length) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }
    if (!strength.checks.uppercase) {
      setError("Password must contain at least one uppercase letter");
      setIsLoading(false);
      return;
    }
    if (!strength.checks.lowercase) {
      setError("Password must contain at least one lowercase letter");
      setIsLoading(false);
      return;
    }
    if (!strength.checks.digit) {
      setError("Password must contain at least one digit");
      setIsLoading(false);
      return;
    }
    if (!strength.checks.special) {
      setError("Password must contain at least one special character");
      setIsLoading(false);
      return;
    }

    try {
      await api.post("/auth/signup", { name, email, password });
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create account";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSO = (provider: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
    window.location.href = `${apiUrl}/auth/${provider}`;
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-white/10 bg-white/5">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              <GradientText>Check your email</GradientText>
            </CardTitle>
            <CardDescription className="mt-2">
              We&apos;ve sent a verification link to <strong className="text-white">{email}</strong>.
              Click the link to activate your account.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Link href="/login" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-white/10 bg-white/5">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            <GradientText>AnsiPress</GradientText>
          </CardTitle>
          <CardDescription>
            Welcome! Please fill in the details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => handleSSO("github")} className="bg-white/5 border-white/10 hover:bg-white/10 text-white">
              <SiGithub className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" onClick={() => handleSSO("google")} className="bg-white/5 border-white/10 hover:bg-white/10 text-white">
              <SiGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-black px-2 text-zinc-400">or</span>
            </div>
          </div>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus:border-purple-500 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus:border-purple-500 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Min 8 chars, uppercase, digit, special"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus:border-purple-500 text-white"
              />
              <PasswordStrengthMeter password={password} />
            </div>
            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="acceptedTerms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="acceptedTerms" className="text-sm text-zinc-300 cursor-pointer">
                I agree to the{" "}
                <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isLoading || strength.score < 5 || !acceptedTerms}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
