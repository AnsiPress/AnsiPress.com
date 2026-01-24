import { ComingSoon } from "@/components/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo - AnsiPress",
  description: "AnsiPress Demo - Coming Soon",
};

export default function DemoPage() {
  return (
    <ComingSoon 
      title="Live Demo" 
      description="A fully interactive demo is coming your way. Experience the power of AnsiPress firsthand."
    />
  );
}
