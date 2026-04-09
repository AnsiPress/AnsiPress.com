import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 bg-black">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} AnsiPress. All rights reserved.</p>
        <div className="flex flex-wrap gap-6">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="https://twitter.com/ansipress" className="hover:text-white transition-colors">Twitter</Link>
          <Link href="https://github.com/ansipress" className="hover:text-white transition-colors">GitHub</Link>
        </div>
      </div>
    </footer>
  );
}
