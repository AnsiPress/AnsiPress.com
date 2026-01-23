import { Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    price: "$10",
    description: "Perfect for personal projects and blogs.",
    features: ["1 CPU Core", "2GB RAM", "20GB SSD Storage", "Weekly Backups", "Community Support"],
  },
  {
    name: "Professional",
    price: "$29",
    description: "For growing businesses and e-commerce.",
    popular: true,
    features: ["2 CPU Cores", "4GB RAM", "50GB NVMe Storage", "Daily Backups", "Priority Support", "Free Migration"],
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "Mission-critical performance.",
    features: ["4 CPU Cores", "8GB RAM", "100GB NVMe Storage", "Hourly Backups", "24/7 Phone Support", "Dedicated Account Manager"],
  },
  ];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 border-t border-white/10 bg-white/5">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
          <p className="text-zinc-400">
            No hidden fees. No long-term contracts. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 rounded-3xl border ${
                tier.popular ? "border-purple-500 bg-purple-500/10" : "border-white/10 bg-black/40"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-zinc-400">/mo</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">{tier.description}</p>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-purple-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`block w-full py-3 rounded-xl text-center font-medium transition-colors ${
                  tier.popular
                    ? "bg-purple-500 hover:bg-purple-600 text-white"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                Choose {tier.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
