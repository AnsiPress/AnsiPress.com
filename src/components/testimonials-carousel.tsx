"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GradientText } from "@/components/ui/gradient-text";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

import { HighlightedText } from "@/components/ui/highlighted-text";
import { recommendations } from "./recommendations";
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

          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {recommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                className="shrink-0 w-[340px] md:w-[calc(50%-12px)] snap-start"
              >
                <div className="h-full p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors flex flex-col">
                  <div className="text-zinc-300 text-sm leading-relaxed flex-1 mb-5 overflow-y-auto max-h-[320px] pr-2 custom-scrollbar">
                    <Quote className="w-8 h-8 text-purple-500/40 mb-2 shrink-0 inline mr-1 -mt-2" />
                    <HighlightedText text={rec.text} />
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <p className="text-white font-medium text-sm">{rec.name}</p>
                      <p className="text-zinc-500 text-xs">{rec.role}</p>
                    </div>
                    <a
                      href={rec.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                      aria-label={`${rec.name} on LinkedIn`}
                    >
                      <LinkedInIcon size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
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
