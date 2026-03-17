"use client";

import { useState, useEffect, useRef } from "react";
import { GradientText } from "@/components/ui/gradient-text";
import { ChevronDown } from "lucide-react";

interface PolicySection {
  id: string;
  title: string;
  level?: number;
}

interface PolicyLayoutProps {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  sections: PolicySection[];
  children: React.ReactNode;
}

export function PolicyLayout({
  title,
  effectiveDate,
  lastUpdated,
  sections,
  children,
}: PolicyLayoutProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [tocOpen, setTocOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const ids = sections.map((s) => s.id);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sections]);

  const handleTocClick = (id: string) => {
    setTocOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const TocLinks = () => (
    <ul className="space-y-1">
      {sections.map((section) => {
        const isActive = activeId === section.id;
        const indent = section.level === 2 ? "pl-6" : "pl-3";
        return (
          <li key={section.id}>
            <button
              onClick={() => handleTocClick(section.id)}
              className={`w-full text-left text-sm transition-colors border-l-2 py-0.5 ${indent} ${
                isActive
                  ? "text-purple-400 border-purple-400"
                  : "text-zinc-400 hover:text-purple-400 border-transparent"
              }`}
            >
              {section.title}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page header */}
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            <GradientText>AnsiPress</GradientText>{" "}
            <span className="text-white">{title}</span>
          </h1>
          <p className="text-zinc-500 text-sm">
            Effective: {effectiveDate} &nbsp;·&nbsp; Last updated: {lastUpdated}
          </p>
        </div>

        {/* Mobile TOC */}
        <div className="lg:hidden mb-6">
          <div className="border border-white/10 bg-white/5 rounded-xl">
            <button
              onClick={() => setTocOpen((o) => !o)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-wider text-zinc-400"
            >
              Contents
              <ChevronDown
                className={`w-4 h-4 transition-transform ${tocOpen ? "rotate-180" : ""}`}
              />
            </button>
            {tocOpen && (
              <div className="px-4 pb-4">
                <TocLinks />
              </div>
            )}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-12 items-start">
          {/* Sticky left sidebar — desktop only */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="border border-white/10 bg-white/5 rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                On This Page
              </p>
              <TocLinks />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="border border-white/10 bg-white/5 rounded-xl p-6 sm:p-10 prose-policy">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
