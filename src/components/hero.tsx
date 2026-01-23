"use client";

import { MoveRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none mt-20" />

      <div className="container relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-purple-300 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          Access Available on Request
        </div>

        <h1 className="max-w-4xl text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          Everything You Need for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Modern Hosting
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed">
          Deploy, manage, and scale your applications with the power of Ansible automation.
          Simple enough for beginners, powerful enough for enterprises.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/start"
            className="h-12 px-8 rounded-full bg-white text-black font-medium inline-flex items-center gap-2 hover:bg-zinc-200 transition-colors"
          >
            Start Free Trial
            <MoveRight className="w-4 h-4" />
          </Link>
          <Link
            href="/demo"
            className="h-12 px-8 rounded-full border border-white/10 bg-white/5 text-white font-medium inline-flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            Schedule Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
