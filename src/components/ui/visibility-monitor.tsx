"use client";

import { useEffect } from "react";

/**
 * This component monitors tab visibility and window focus.
 * It's designed to fix an issue where Framer Motion animations or 
 * IntersectionObservers get "stuck" when a user leaves the tab 
 * and comes back after a while (common in local dev or with browser memory saving).
 */
export function VisibilityMonitor() {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Force a tiny layout/intersection recalculation by scrolling 1px
        // This is a known workaround for stuck IntersectionObservers
        window.scrollBy(0, 1);
        window.scrollBy(0, -1);
        
        // Also fire a window resize event to trigger layout recalculations in components
        window.dispatchEvent(new Event("resize"));
      }
    };

    const handleFocus = () => {
      // Same logic for focus
      window.scrollBy(0, 1);
      window.scrollBy(0, -1);
      window.dispatchEvent(new Event("resize"));
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return null;
}
