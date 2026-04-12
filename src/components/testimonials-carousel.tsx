"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GradientText } from "@/components/ui/gradient-text";
import { Quote, ChevronLeft, ChevronRight, Link2, Check } from "lucide-react";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

import { Recommendation } from "./recommendations";

function RecommendationAvatar({ rec }: { rec: Recommendation }) {
  const [hasError, setHasError] = useState(false);
  
  // Default: FirstLast.jpeg (no spaces, each word capitalized)
  const filename = rec.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("") + ".jpeg";

  const imagePath = `/recommendations/${filename}`;

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white/5 text-zinc-500 text-xs font-bold uppercase tracking-wider">
        {rec.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)}
      </div>
    );
  }

  return (
    <img
      src={imagePath}
      alt={rec.name}
      className="w-full h-full object-cover"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

function CopyLinkButton({ anchor }: { anchor: string }) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const url = new URL(window.location.href);
    url.hash = anchor;
    
    // Update URL hash without jumping
    window.history.replaceState(null, '', `#${anchor}`);

    const fullUrl = url.toString();

    const performCopy = async () => {
      // 1. Try modern Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(fullUrl);
          return true;
        } catch (err) {
          console.error('Clipboard API failed', err);
        }
      }

      // 2. Legacy Fallback (Works on unsecure HTTP/IP connections)
      try {
        const textArea = document.createElement("textarea");
        textArea.value = fullUrl;
        
        // Ensure textarea is not visible but part of DOM
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      } catch (err) {
        console.error('Fallback copy failed', err);
        return false;
      }
    };

    performCopy().then((success) => {
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    });
  };

  return (
    <div className="relative">
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, x: "-50%" }}
        animate={{ 
          opacity: (isHovered || copied) ? 1 : 0, 
          y: (isHovered || copied) ? -40 : -30,
          x: "-50%"
        }}
        className={`absolute left-1/2 -translate-x-1/2 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest whitespace-nowrap pointer-events-none z-50 ${
          copied ? "bg-green-500 text-white" : "bg-zinc-800 text-zinc-300 border border-white/10"
        }`}
      >
        {copied ? "Link Copied!" : "Copy Recommendation Link"}
        <div className={`absolute bottom-[-4px] left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent ${
          copied ? "border-t-green-500" : "border-t-zinc-800"
        }`} />
      </motion.div>

      <button
        onClick={handleCopy}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`p-2 rounded-lg transition-all duration-200 ${
          copied ? "text-green-400 bg-green-500/10" : "text-zinc-500 hover:text-purple-400 hover:bg-white/5"
        }`}
        aria-label="Copy direct link"
      >
        {copied ? <Check size={16} /> : <Link2 size={16} />}
      </button>
    </div>
  );
}


import { HighlightedText } from "@/components/ui/highlighted-text";
import { recommendations } from "./recommendations";

const getAnchor = (name: string) => 
  name.toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

export function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalItems = recommendations.length;

  // Check scroll position for button states
  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);

    const isDesktop = window.innerWidth >= 768;
    const cardWidth = isDesktop ? (clientWidth - 24) / 2 : 380; // 24 is the gap
    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(index);
  };

  // Auto-scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (isPaused) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      if (scrollLeft >= scrollWidth - clientWidth - 5) {
        // Reset to beginning smoothly
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll by 2 cards on desktop
        const scrollAmount = window.innerWidth >= 768 ? clientWidth : 380;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Listen for scroll events
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollState);
    updateScrollState();

    return () => container.removeEventListener("scroll", updateScrollState);
  }, []);

  // Handle initial hash scroll
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && scrollRef.current) {
      // Find the card with this ID
      const element = document.getElementById(hash);
      if (element) {
        // Stop auto-scroll if user came for a specific item
        setIsPaused(true);
        
        // Small delay to ensure layout and animations are ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }, 500);
      }
    }
  }, []);


  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = window.innerWidth >= 768 ? scrollRef.current.clientWidth : 380;
    const amount = direction === "left" ? -scrollAmount : scrollAmount;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-24 border-t border-white/10 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Trusted by{" "}
            <GradientText>Industry Professionals</GradientText>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            What colleagues and clients say about the engineer behind AnsiPress.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all disabled:opacity-0 disabled:pointer-events-none backdrop-blur-sm -translate-x-1 md:translate-x-0"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all disabled:opacity-0 disabled:pointer-events-none backdrop-blur-sm translate-x-1 md:translate-x-0"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {recommendations.map((rec, i) => {
              const anchor = getAnchor(rec.name);
              return (
                <motion.div
                  key={i}
                  id={anchor}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                  className="shrink-0 w-[calc(100vw-32px)] md:w-[calc(50%-12px)] snap-start"
                >
                  <div className="h-full p-6 md:p-10 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors flex flex-col group/card">

                  <div className="text-zinc-300 text-base leading-relaxed flex-1 mb-5 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
                    <Quote className="w-8 h-8 text-purple-500/40 mb-2 shrink-0 inline mr-1 -mt-2" />
                    <HighlightedText text={rec.text} />
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 shrink-0 group">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity" />
                        <div className="relative w-full h-full rounded-full border border-white/20 overflow-hidden bg-zinc-900 flex items-center justify-center">
                          <RecommendationAvatar rec={rec} />
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{rec.name}</p>
                        <p className="text-zinc-500 text-xs">{rec.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CopyLinkButton anchor={anchor} />
                      <a
                        href={rec.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-purple-400 transition-colors p-2 rounded-lg hover:bg-white/5"
                        aria-label={`${rec.name} on LinkedIn`}
                      >
                        <LinkedInIcon size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )})}

          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex gap-1.5 max-w-full px-4 overflow-x-auto scrollbar-hide py-2">
            {recommendations.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!scrollRef.current) return;
                  const isDesktop = window.innerWidth >= 768;
                  const cardWidth = (scrollRef.current.clientWidth - 24) / 2;
                  const scrollAmount = isDesktop ? cardWidth : 380;
                  scrollRef.current.scrollTo({ left: i * scrollAmount, behavior: "smooth" });
                }}
                className={`h-1.5 rounded-full transition-all duration-300 shrink-0 ${
                  currentIndex === i ? "w-6 bg-purple-500" : "w-1.5 bg-white/10"
                }`}
                aria-label={`Go to recommendation ${i + 1}`}
              />
            ))}
          </div>
          <div className="text-zinc-500 text-xs font-mono tracking-widest uppercase flex items-center gap-3">
            <span className="text-purple-400">
              {(currentIndex + 1).toString().padStart(2, "0")}
            </span>
            <span className="w-8 h-px bg-white/10" />
            <span>{totalItems.toString().padStart(2, "0")}</span>
          </div>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          {recommendations.length} recommendations from LinkedIn
        </p>
      </div>
    </section>
  );
}
