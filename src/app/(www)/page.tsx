import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { MigrationSection } from "@/components/migration-section";
import { TechSpecsSection } from "@/components/tech-specs";
import { Pricing } from "@/components/pricing";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Hero />
      <Features />
      <MigrationSection />
      <TechSpecsSection />
      <Pricing />
    </main>
  );
}
