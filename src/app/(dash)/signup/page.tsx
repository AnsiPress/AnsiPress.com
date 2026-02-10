import { ComingSoon } from "@/components/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - AnsiPress",
  description: "Create your AnsiPress account and start managing servers",
};

export default function SignupPage() {
  return (
    <ComingSoon 
      title="Sign Up" 
      description="Account registration is currently in development. Join our waitlist for early access."
    />
  );
}
