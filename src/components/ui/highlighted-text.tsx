"use client";

import React from "react";
import clsx from "clsx";
import { GradientText } from "./gradient-text";

const DEFAULT_KEYWORDS = [
  "CTOs",
  "lifesaver",
  "automated",
  "speed",
  "safe",
  "robust",
  "keep it simple",
  "vulnerabilities",
  "audit",
  "architectural philosophy",
  "simplicity",
  "systems",
  "scalable",
  "secure by default",
  "secure",
  "simple",
  "reliable",
  "security",
  "reliability",
  "99.99%",
  "EasyEngine",
  "AnsiPress",
  "EasyDash",
  "automation",
  "hardened",
  "performance",
  "scaling",
  "production",
  "infrastructure",
  "hacker",
  "battle-tested",
  "provisioning",
  "hardened production",
];

interface HighlightedTextProps {
  text: string;
  keywords?: string[];
  className?: string;
}

export function HighlightedText({ text, keywords = DEFAULT_KEYWORDS, className }: HighlightedTextProps) {
  if (!text) return null;

  // Create regex pattern from keywords
  const pattern = new RegExp(`(${keywords.join("|")})`, "gi");
  const parts = text.split(pattern);

  return (
    <span className={clsx("whitespace-pre-line", className)}>
      {parts.map((part, i) => {
        const isMatch = keywords.some(
          (keyword) => part.toLowerCase() === keyword.toLowerCase()
        );

        if (isMatch) {
          return (
            <GradientText key={i} className="font-semibold px-0.5">
              {part}
            </GradientText>
          );
        }

        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}
