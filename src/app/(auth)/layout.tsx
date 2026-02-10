import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <BrandLogo size="lg" className="mb-2" />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
