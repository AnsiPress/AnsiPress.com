"use client";

import { useState, useEffect } from "react";
import { MoveRight } from "lucide-react";

const terminalCommands = [
  "ansible-playbook -i inventory main.yml",
  "ansible-playbook deploy.yml --tags wordpress",
  "ansible-playbook security.yml --tags crowdsec",
];

export function Hero() {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [displayText, setDisplayText] = useState("");

  // Typing effect
  useEffect(() => {
    let charIndex = 0;
    const command = terminalCommands[currentCommand];
    
    const interval = setInterval(() => {
      if (charIndex <= command.length) {
        setDisplayText(command.slice(0, charIndex));
        charIndex++;
      } else {
        setTimeout(() => {
          setCurrentCommand((prev) => (prev + 1) % terminalCommands.length);
        }, 2000);
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [currentCommand]);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none mt-20" />

      <div className="container relative z-10 flex flex-col items-center text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-purple-300 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          All Systems Operational
        </div>

        <h1 className="max-w-4xl text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
          WordPress Hosting for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Engineers Who Care
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-4 leading-relaxed">
          Built by the team behind WPMUDEV Hosting (50K+ servers). <br />
          No control panels. No bloat. Just Ansible, LEMP, and obsessive performance.
        </p>

        {/* Terminal Preview */}
        <div className="w-full max-w-md mb-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur p-4 text-left font-mono text-sm text-green-400">
          <div className="flex items-center gap-2 mb-2 text-zinc-500">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-purple-400">$ {displayText}<span className="animate-pulse">|</span></div>
        </div>

        {/* Static Waitlist Form (Phase 1 - No backend) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md opacity-60 cursor-not-allowed">
          <input
            type="email"
            placeholder="engineer@company.com"
            disabled
            className="flex-1 h-12 px-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-zinc-500"
          />
          <button
            disabled
            className="h-12 px-8 rounded-full bg-white text-black font-medium inline-flex items-center gap-2"
          >
            Join Waitlist
            <MoveRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-zinc-500 text-sm mt-4">Backend integration coming in Phase 2</p>
      </div>
    </section>
  );
}
