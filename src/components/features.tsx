import { Server, Shield, Zap, RefreshCw, Database, Terminal } from "lucide-react";

const features = [
  {
    title: "Ansible Powered",
    description: "Built on industry-standard automation. No proprietary black boxes.",
    icon: Terminal,
  },
  {
    title: "ZFS Storage",
    description: "Enterprise-grade data integrity, snapshots, and compression.",
    icon: Database,
  },
  {
    title: "Instant Scaling",
    description: "Scale your resources up or down with a single click.",
    icon: Zap,
  },
  {
    title: "Auto-Healing",
    description: "Services automatically restart if they become unresponsive.",
    icon: RefreshCw,
  },
  {
    title: "DDoS Protection",
    description: "Advanced mitigation layers keep your sites online.",
    icon: Shield,
  },
  {
    title: "Global Edge",
    description: "Deploy close to your users in 25+ distinct regions.",
    icon: Server,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 border-t border-white/10">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Built for Performance</h2>
          <p className="text-zinc-400">
            Our platform combines raw metal performance with the flexibility of cloud orchestration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <feature.icon className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
