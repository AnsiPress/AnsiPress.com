import { ComingSoon } from "@/components/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - AnsiPress",
  description: "Terms of Service - Coming Soon",
};

export default function TermsPage() {
  return (
    <ComingSoon 
      title="Terms of Service" 
      description="Our terms of service are currently under review."
    />
  );
}
