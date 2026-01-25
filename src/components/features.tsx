import { Shield, Zap, Code2, Eye, Lock, Rocket } from "lucide-react";

const features = [
  {
    title: "Firewall Protection",
    description: "CrowdSec blocks threats in real time using shared threat intelligence from 100k+ production nodes.",
    icon: Shield,
    badge: "Security",
  },
  {
    title: "Intelligent Vulnerability Scans",
    description: "WPScan checks every plugin and theme daily.",
    icon: Lock,
    badge: "Security",
  },
  {
    title: "Auto-Optimized LEMP Stack",
    description: "Automatically tuned configurations based on workload patterns",
    icon: Rocket,
    badge: "Performance",
  },
  {
    title: "Smart Backup System",
    description: "AnsiSnap uses ZFS snapshots with intelligent compression. Minimal performance impact during backups.",
    icon: Zap,
    badge: "Performance",
  },
  {
    title: "Open Roadmap",
    description: "See exactly what we're building. Grafana dashboards, uptime monitoring, and Wazuh IDS integrations coming soon.",
    icon: Eye,
    badge: "Transparency",
  },
  {
    title: "Built for Developers",
    description: "Full SSH access. Ansible source code on GitHub. No proprietary lock-in.",
    icon: Code2,
    badge: "Transparency",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 border-t border-white/10">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Security Isn't an Add-On. <br />It's the Foundation.
          </h2>
          <p className="text-zinc-400">
            We optimize for what actually matters in production: uptime, security, and peace of mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <feature.icon className="w-10 h-10 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
