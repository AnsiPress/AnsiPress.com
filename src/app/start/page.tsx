import { ComingSoon } from "@/components/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started - AnsiPress",
  description: "Get Started with AnsiPress - Coming Soon",
};

export default function StartPage() {
  return (
    <ComingSoon 
      title="Get Started" 
      description="Our quick start guide is under construction. Soon you'll be able to set up your server in minutes."
    />
  );
}
