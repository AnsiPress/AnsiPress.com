import { ComingSoon } from "@/components/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - AnsiPress",
  description: "Privacy Policy - Coming Soon",
};

export default function PrivacyPage() {
  return (
    <ComingSoon 
      title="Privacy Policy" 
      description="Our privacy policy is being drafted to ensure your data is protected."
    />
  );
}
