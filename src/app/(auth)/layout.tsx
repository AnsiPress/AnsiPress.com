import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="container py-8">
        <Link href="/">
          <BrandLogo size="md" />
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
