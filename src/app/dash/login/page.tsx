"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientText } from "@/components/ui/gradient-text";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await api.post("/auth/login", { email, password });
      router.push("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid email or password";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSO = (provider: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
    window.location.href = `${apiUrl}/auth/${provider}`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-white/10 bg-white/5">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            <GradientText>AnsiPress</GradientText>
          </CardTitle>
          <CardDescription>
            Welcome back! Please sign in to continue
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
          <form onSubmit={handleLogin} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus:border-purple-500 text-white"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
