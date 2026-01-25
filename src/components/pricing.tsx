import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Developer",
    price: "$10",
    description: "For side projects and experimentation.",
    features: [
      "1 CPU Core",
      "2GB RAM",
      "20GB SSD Storage",
      "Weekly Backups",
      "Community Support",
      "Automated Server Monitoring",
    ],
  },
  {
    name: "Startup",
    price: "$29",
    description: "Ship faster with automation and support.",
    features: [
      "2 CPU Cores",
      "4GB RAM",
      "50GB NVMe Storage",
      "Daily Backups",
      "Priority Support",
      "Automated Threat Detection",
      "Free Migration",
    ],
  },
  {
    name: "Business",
    price: "$79",
    description: "Scale with confidence and performance.",
    highlighted: true,
    features: [
      "4 CPU Cores",
      "8GB RAM",
      "100GB NVMe Storage",
      "Hourly Backups",
      "24/7 Phone Support",
      "Automated Security Scanning",
      "Free Migration + Audit",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "White-glove service for mission-critical workloads.",
    features: [
      "Custom Resources",
      "Dedicated Infrastructure",
      "Hourly Backups",
      "Dedicated Account Manager",
      "Advanced Threat Intelligence",
      "Automated Infrastructure Optimization",
      "SLA Guarantee",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 border-t border-white/10 relative overflow-hidden">
      {/* GitHub-style background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
              Pay for What You Use.
            </span>{" "}
            <br />
            No Hidden Fees.
          </h2>
          <p className="text-zinc-400 text-lg">
            Every plan includes monitoring, security scanning, and automated backups.
          </p>
        </div>

        {/* GitHub-style horizontal scroll grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative p-6 rounded-2xl backdrop-blur transition-all duration-300 hover:scale-105 group ${
                tier.highlighted
                  ? "bg-gradient-to-b from-purple-500/20 via-purple-500/10 to-transparent border-2 border-purple-500/50 shadow-lg shadow-purple-500/20"
                  : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  Recommended
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-white">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-bold text-white">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-zinc-400 text-sm">/mo</span>}
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.price === "Custom" ? "/contact" : "/signup"}
                className={`block w-full py-2.5 rounded-lg text-center font-medium transition-all ${
                  tier.highlighted
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/30"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                }`}
              >
                {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip - GitHub style */}
        <div className="mt-16 text-center">
          <p className="text-zinc-400 mb-4">
            All plans include a 30-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
