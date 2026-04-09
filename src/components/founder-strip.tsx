"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight, Star, Server, Clock, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Clock, label: "16+ Years", sublabel: "Linux/DevOps & Hosting Automation" },
  { icon: Server, label: "50K+", sublabel: "Servers Managed" },
  { icon: Star, label: "2.1K ★", sublabel: "EasyEngine on GitHub" },
  { icon: ShieldCheck, label: "Security", sublabel: "Bug Bounty Hunter" },
];

export function FounderStrip() {
  return (
    <section className="py-16 border-t border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
            {/* Photo + Name */}
            <div className="flex flex-col items-center md:items-start gap-3 shrink-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm opacity-50" />
                <Image
                  src="https://avatars.githubusercontent.com/u/1223371?v=4"
                  alt="Mitesh Shah - Founder of AnsiPress"
                  width={80}
                  height={80}
                  className="relative rounded-full border-2 border-white/20"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="text-white font-semibold">Mitesh Shah</p>
                <p className="text-zinc-500 text-sm">Founder & Creator</p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <blockquote className="text-zinc-300 text-lg leading-relaxed mb-4 italic">
                After building EasyEngine and managing 50,000+ servers at WPMUDEV Hosting,
                I created AnsiPress hosting engineered for scale, security, and peace of mind from day one.
              </blockquote>
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm"
                  >
                    <stat.icon className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <span className="text-white font-medium">{stat.label}</span>
                      <span className="text-zinc-500 block text-xs">{stat.sublabel}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors group"
              >
                Meet the Founder
                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
