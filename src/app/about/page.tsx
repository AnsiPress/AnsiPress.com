import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Building2, Server, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">
            Built by Engineers Who've <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Been There Before
            </span>
          </h1>

          <p className="text-xl text-zinc-400 mb-12">
            AnsiPress is founded by Mitesh Shah, the former Product Head of WPMUDEV Hosting and creator of EasyEngine.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <Server className="w-8 h-8 text-purple-400 mb-3" />
              <div className="text-3xl font-bold mb-1">50,000+</div>
              <div className="text-zinc-400">Servers Managed at WPMUDEV</div>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <Building2 className="w-8 h-8 text-purple-400 mb-3" />
              <div className="text-3xl font-bold mb-1">10+ Years</div>
              <div className="text-zinc-400">WordPress Infrastructure</div>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <Shield className="w-8 h-8 text-purple-400 mb-3" />
              <div className="text-3xl font-bold mb-1">Security First</div>
              <div className="text-zinc-400">Independent Consultant</div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">The Problem</h2>
              <p className="text-zinc-300 text-lg leading-relaxed">
                After scaling WPMUDEV Hosting from zero to 50,000+ servers, I saw the same pattern everywhere: 
                managed WordPress hosts promise "performance" but deliver bloated control panels, outdated stacks, 
                and security theater.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">The Solution</h2>
              <p className="text-zinc-300 text-lg leading-relaxed">
                AnsiPress is what I wish existed when I started. It's the hosting stack I built at WPMUDEV—minus 
                the corporate overhead. Ansible-powered automation, LEMP stack optimized for WordPress, and 
                security tools (CrowdSec, WPScan, Wazuh) that actually work.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Built for Developers</h2>
              <p className="text-zinc-300 text-lg leading-relaxed">
                If you care about full SSH access, version-controlled infrastructure, and knowing exactly what's 
                running on your server—AnsiPress is for you. No proprietary platforms. No lock-in. Just open-source 
                tools and transparent practices.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Why Now?</h2>
              <p className="text-zinc-300 text-lg leading-relaxed">
                I left WPMUDEV in 2023 to work as an independent security consultant. After patching CVEs and 
                conducting penetration tests for dozens of WordPress sites, I kept seeing the same vulnerabilities: 
                outdated PHP, misconfigured Nginx, no intrusion detection. AnsiPress fixes that.
              </p>
            </div>

            <blockquote className="border-l-4 border-purple-500 pl-6 py-4 bg-white/5 rounded-r-lg">
              <p className="text-lg italic text-zinc-300 mb-2">
                "A lazy sysadmin is a good sysadmin—because they automate everything."
              </p>
              <footer className="text-sm text-zinc-500">— Mitesh Shah, Founder of AnsiPress</footer>
            </blockquote>

            <div className="mt-12 p-6 rounded-xl border border-purple-500/30 bg-purple-500/10">
              <h3 className="text-xl font-semibold mb-3">From My Resume</h3>
              <ul className="space-y-2 text-zinc-300">
                <li>• Product Head at WPMUDEV (2017-2023) - Led hosting from 0 to 50,000+ servers</li>
                <li>• Creator of EasyEngine - Open-source NGINX control panel (5000+ lines of shell scripts)</li>
                <li>• Independent Security Consultant (2023-Present) - Penetration testing & CVE patching</li>
                <li>• Managed NGINX/ModSecurity packages via Launchpad for WPMUDEV infrastructure</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
