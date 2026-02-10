import { redirect } from "next/navigation";

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // For now, redirect to home. This will be replaced with actual dashboard layout in Phase 2
  redirect("/");
  
  return <>{children}</>;
}
