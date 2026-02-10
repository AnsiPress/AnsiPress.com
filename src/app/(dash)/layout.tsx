import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - AnsiPress",
    default: "Dashboard - AnsiPress",
  },
  description: "AnsiPress Dashboard — Manage your servers, sites, and backups",
};

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-black text-white">
      {children}
    </div>
  );
}

