import { Hero } from "@/components/hero";
import { FounderStrip } from "@/components/founder-strip";
import { Features } from "@/components/features";
import { MigrationSection } from "@/components/migration-section";
import { TechSpecsSection } from "@/components/tech-specs";
import { Pricing } from "@/components/pricing";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Hero />
      <FounderStrip />
      <Features />
      <MigrationSection />
      <TechSpecsSection />
      <Pricing />
      <TestimonialsCarousel />
    </main>
  );
}
