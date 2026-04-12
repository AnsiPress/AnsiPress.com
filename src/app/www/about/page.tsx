"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GradientText } from "@/components/ui/gradient-text";
import { HighlightedText } from "@/components/ui/highlighted-text";
import {
  ExternalLink,
  Shield,
  Server,
  Star,
  MessageSquareQuote,
  Clock,
  Terminal,
  Award,
  Bug,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

/* ────────────────────────────────────────────── */
/*  Data                                          */
/* ────────────────────────────────────────────── */

const milestones = [
  {
    year: "2010",
    role: "Linux System Administrator",
    company: "Illuminati Solutions",
    insight: "Foundation — learned servers from bare metal. DNS, SSH, IPTables,Squid3 & system hardening.",
  },
  {
    year: "2012",
    role: "Linux SysAdmin → Created EasyEngine",
    company: "rtCamp",
    insight: "Built EasyEngine from scratch — a CLI to automate NGINX + WordPress on Ubuntu. 2.1K ★ on GitHub.",
  },
  {
    year: "2013",
    role: "Product Head — EasyEngine",
    company: "rtCamp",
    insight: "Scaled EasyEngine to 5,000+ Shell Scripts. Set up CI/CD with Jenkins across 6 VMs Ubuntu/Debian/OpenSuse. Patched Heartbleed & POODLE like multiple vulnerabilities.",
  },
  {
    year: "2014",
    role: "System Administrator",
    company: "Perk.com & Corona Labs",
    insight: "Enterprise-scale ops: ELK stack, GitLab infrastructure, cross-platform management.",
  },
  {
    year: "2016",
    role: "Senior DevOps Engineer",
    company: "Nolte.io",
    insight: "Refined automation-first approach with Ansible. Monitoring, hardening, weekly audits.",
  },
  {
    year: "2017",
    role: "Product Head — Hosting",
    company: "WPMUDEV",
    highlight: true,
    insight: "Managed 50,000+ servers. Built hosting infrastructure from scratch using Ansible automation at scale.",
  },
  {
    year: "2023",
    role: "Security Consultant",
    company: "Independent",
    insight: "Bug bounties (HDFC Security), penetration testing.",
  },
    {
    year: "2023",
    role: "Product Owner - EasyDash",
    company: "rtCamp.com",
    insight: "Built EasyDash from scratch — a fully automated server platform to manage EasyEngine and wp.cloud Hosting - Include Multiple WordPress Sites, Servers, Backups, Security, Monitoring, and RBAC.",
  },
  {
    year: "2026",
    role: "Founded AnsiPress",
    company: "AnsiPress",
    highlight: true,
    insight: "Everything converges — 16 years of infrastructure expertise distilled into one platform.",
  },
];

const openSourceProjects = [
  { name: "EasyEngine", stars: "2.1K ★", desc: "Creator — CLI control panel for NGINX + WordPress", url: "https://github.com/EasyEngine/easyengine" },
  { name: "WP-CLI", desc: "Fixed WordPress subdomain issue", url: "https://github.com/wp-cli/wp-cli" },
  { name: "Google Chrome Labs", desc: "Privacy Sandbox tool contribution", url: "https://github.com/GoogleChromeLabs/ps-analysis-tool" },
  { name: "Facebook ATC", desc: "Fixed issues in augmented-traffic-control", url: "https://github.com/facebookarchive/augmented-traffic-control" },
  { name: "Discourse", desc: "Improved curl retry mechanism", url: "https://github.com/discourse/discourse" },
  { name: "10up/WordPress Configs", desc: "NGINX auto variable optimization", url: "https://github.com/10up/WordPress-Server-Configs" },
];

import { recommendations } from "@/components/recommendations";

/* ────────────────────────────────────────────── */
/*  Animated Counter                              */
/* ────────────────────────────────────────────── */

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ────────────────────────────────────────────── */
/*  Page Component                                */
/* ────────────────────────────────────────────── */

export default function AboutPage() {

  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* ───────────── Hero ───────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-28 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-500/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="container relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-6"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-40" />
            <Image
              src="https://avatars.githubusercontent.com/u/1223371?v=4"
              alt="Mitesh Shah - Founder of AnsiPress"
              width={120}
              height={120}
              className="relative rounded-full border-3 border-white/20"
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-3"
          >
            Mitesh Shah
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 mb-6"
          >
            Founder & Creator of{" "}
            <GradientText>AnsiPress</GradientText>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-zinc-500 text-sm mb-8"
          >
            Linux Expert · Automation Engineer · Security Consultant
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-4"
          >
            <a
              href="https://github.com/MiteshShah"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/40 transition-all"
              aria-label="GitHub"
            >
              <SiGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/MiteshShah05"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/40 transition-all"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={20} />
            </a>
            <a
              href="https://twitter.com/MiteshShah05"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/40 transition-all"
              aria-label="Twitter"
            >
              <SiX size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ───────────── Stats ───────────── */}
      <section className="py-16 border-t border-white/10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
            {[
              { icon: Clock, value: 16, suffix: "+", label: "Years Experience" },
              { icon: Server, value: 50000, suffix: "+", label: "Servers Managed" },
              { icon: Star, value: 2100, suffix: "+", label: "GitHub Stars" },
              { icon: MessageSquareQuote, value: 25, suffix: "+", label: "Recommendations" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <stat.icon className="w-6 h-6 text-purple-400 mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-zinc-500 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Why I Built AnsiPress ───────────── */}
      <section className="py-24 border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                Why I Built{" "}
                <GradientText>AnsiPress</GradientText>
              </h2>

              <div className="space-y-6 text-zinc-300 text-lg leading-relaxed">
                <p>
                  In 2012, I built <a href="https://easyengine.io" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline underline-offset-4 decoration-purple-400/30">EasyEngine </a>
                  a CLI tool that helped thousands of developers provision NGINX and WordPress servers with confidence.
                </p>

                <p> 
                  I later spent nearly 7 years at WPMUDEV, where I built the core hosting infrastructure from scratch through Ansible automation, scaling day-to-day production operations to
                  <span className="text-white font-medium"> 50,000+ production servers</span>.
                </p>

                <p>
                  That journey exposed every challenge serious infrastructure faces — scaling bottlenecks, operational failures, performance trade-offs, and security incidents that only surface at real scale.
                </p>

                <p>That experience proved something fundamental:
                  Reliable infrastructure at scale doesnot require more abstraction — it requires simplicity and better automation.
                </p>

                <p>AnsiPress is built on that belief.</p>

                <ul className="list-disc list-inside mt-3 space-y-1">
                  <li>Every server is hardened from day one.</li>
                  <li>Every configuration change is tracked and auditable.</li>
                  <li>Every deployment is deterministic and repeatable.</li>
                </ul>
                <p>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
                    AnsiPress is 16 years of Linux, DevOps & Production Hosting Experience distilled into one platform.
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── Timeline ───────────── */}
      <section className="py-24 border-t border-white/10 bg-zinc-900/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              The Journey to{" "}
              <GradientText>AnsiPress</GradientText>
            </h2>
            <p className="text-zinc-400 text-lg">
              16 years of infrastructure experience, converging into one platform.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-blue-500/50" />

            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`relative flex items-start gap-6 mb-10 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div
                  className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 z-10 mt-2 ${
                    milestone.highlight
                      ? "border-purple-400 bg-purple-500 shadow-lg shadow-purple-500/50"
                      : "border-zinc-500 bg-zinc-800"
                  }`}
                />

                {/* Content */}
                <div className={`ml-14 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:text-right md:pr-10" : "md:text-left md:pl-10"}`}>
                  <span className="text-purple-400 text-sm font-mono font-medium">{milestone.year}</span>
                  <h3 className={`text-white font-semibold mt-1 ${milestone.highlight ? "text-lg" : ""}`}>
                    {milestone.role}
                  </h3>
                  <p className="text-zinc-500 text-sm">{milestone.company}</p>
                  <p className="text-zinc-400 text-sm mt-2 leading-relaxed">{milestone.insight}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* ───────────── Security Credentials ───────────── */}
      <section className="py-24 border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Security-First{" "}
              <GradientText>Mindset</GradientText>
            </h2>
            <p className="text-zinc-400 text-lg">
              When your hosting provider thinks like a hacker, your servers are in safer hands.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Bug className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">HDFC Security Bug Bounty</h3>
                  <p className="text-zinc-500 text-sm">September 2023</p>
                </div>
              </div>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  Identified AWS misconfiguration exposing sensitive information
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  Found API endpoint leaking client data without validation
                </li>
                <li className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                  Awarded iPhone 15 + Certificate of Appreciation
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Industry Recognition</h3>
                  <p className="text-zinc-500 text-sm">Awards & Honors</p>
                </div>
              </div>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                  Geekish rtCamper of the Year — 2014
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                  Newbie rtCamper of the Year — 2013
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── Open Source ───────────── */}
      <section className="py-24 border-t border-white/10 bg-zinc-900/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Open Source{" "}
              <GradientText>Contributions</GradientText>
            </h2>
            <p className="text-zinc-400 text-lg">
              Contributing to projects used by millions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {openSourceProjects.map((project, i) => (
              <motion.a
                key={i}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">
                  {project.name}
                  {project.stars && (
                    <span className="text-yellow-500 text-xs ml-2">{project.stars}</span>
                  )}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{project.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Recommendations ───────────── */}
      <TestimonialsCarousel />

      {/* ───────────── CTA ───────────── 
      <section className="py-20 border-t border-white/10">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to try hosting built the{" "}
              <GradientText>engineer way</GradientText>?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
              Join the waitlist to get early access when AnsiPress launches.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-black font-medium hover:bg-zinc-200 transition-colors"
            >
              Join the Waitlist
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
      */}
    </main>
  );
}
