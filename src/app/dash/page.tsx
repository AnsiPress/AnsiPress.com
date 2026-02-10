import { ComingSoon } from "@/components/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - AnsiPress",
  description: "Customer Dashboard - Coming Soon",
};

export default function DashboardPage() {
  return (
    <ComingSoon 
      title="Dashboard Coming Soon" 
      description="The customer dashboard is currently in development and will be available soon."
    />
  );
}
