import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { inter, spaceGrotesk } from "@/lib/fonts";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ansipress.com";

export const metadata: Metadata = {
  title: "AnsiPress - Ansible-Powered Hosting Automation",
  description:
    "Enterprise-grade hosting automation with ZFS snapshots, intelligent backups, and one-command deployments.",
  metadataBase: new URL(siteUrl),
  keywords: [
    "Ansible",
    "hosting automation",
    "ZFS snapshots",
    "server management",
    "DevOps",
    "infrastructure",
    "deployment automation",
    "backup solutions",
  ],
  authors: [{ name: "AnsiPress" }],
  creator: "AnsiPress",
  publisher: "AnsiPress",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "AnsiPress",
    title: "AnsiPress - Ansible-Powered Hosting Automation",
    description:
      "Enterprise-grade hosting automation with ZFS snapshots, intelligent backups, and one-command deployments.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnsiPress - Ansible-Powered Hosting Automation",
    description:
      "Enterprise-grade hosting automation with ZFS snapshots, intelligent backups, and one-command deployments.",
    creator: "@ansipress",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased text-white bg-black`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
