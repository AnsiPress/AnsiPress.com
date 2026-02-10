import { ComingSoon } from "@/components/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - AnsiPress",
  description: "Reset your AnsiPress account password",
};

export default function ForgotPasswordPage() {
  return (
    <ComingSoon 
      title="Forgot Password" 
      description="Password reset functionality is currently in development."
    />
  );
}
