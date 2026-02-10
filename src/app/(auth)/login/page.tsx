import { ComingSoon } from "@/components/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - AnsiPress",
  description: "Login to AnsiPress - Coming Soon",
};

export default function LoginPage() {
  return (
    <ComingSoon 
      title="Login" 
      description="User accounts and dashboard access are currently in development."
    />
  );
}
