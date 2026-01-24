import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hammer } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

export function ComingSoon({
  title = "Coming Soon",
  description = "We are working hard to bring you this feature. Stay tuned!",
}: ComingSoonProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-black px-4 text-center">
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/5 ring-1 ring-white/10 before:absolute before:-inset-4 before:-z-10 before:rounded-[3rem] before:bg-gradient-to-tr before:from-blue-500/20 before:to-purple-500/20 before:blur-2xl">
        <Hammer className="h-10 w-10 text-white animate-pulse" />
      </div>

      <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {title}
      </h1>

      <p className="mb-10 max-w-md text-lg text-white/60">
        {description}
      </p>

      <Button asChild size="lg" className="rounded-full px-8">
        <Link href="/">
          Back to Home
        </Link>
      </Button>
    </div>
  );
}
