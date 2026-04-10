"use client";

import React from "react";
import clsx from "clsx";
import { GradientText } from "./gradient-text";

const DEFAULT_KEYWORDS = [
  "99.99%",
  "administration",
  "amazing",
  "ansipress",
  "architect",
  "architectural",
  "architectural philosophy",
  "audit",
  "automated",
  "automation",
  "battle-tested",
  "better security practices",
  "commitment",
  "complexity",
  "critical",
  "ctos",
  "dedication",
  "devops",
  "easydash",
  "easyengine",
  "ecosystems",
  "engineering",
  "expertise",
  "expert",
  "expertise",
  "extraordinary",
  "genuinely",
  "geekish",
  "giant",
  "he always came up with an innovative and effective solution",
  "he help your business grow in any capacity he can",
  "he managed his team very well",
  "highly passionate",
  "hacker",
  "honesty",
  "honored",
  "honored",
  "ideas",
  "infrastructure",
  "keep it simple",
  "knowledge",
  "laziness",
  "lifesaver",
  "linux",
  "minimal",
  "nginx",
  "open-source",
  "opensource",
  "optimizing",
  "ownership",
  "passion",
  "performance",
  "production",
  "provisioning",
  "reliable",
  "reliability",
  "risk",
  "robust",
  "safe",
  "scales",
  "scale",
  "scalable",
  "scaling",
  "scripting",
  "secure",
  "secure by default",
  "security",
  "seamlessly",
  "self-sustaining",
  "servers",
  "server",
  "sharp",
  "shell",
  "simple",
  "simplicity",
  "solutions",
  "speed",
  "sysadmins",
  "systems",
  "system",
  "system administrator",
  "systems",
  "systems",
  "tech nerd",
  "trust him as an expert",
  "trustworthy",
  "uplifting mentality",
  "vulnerabilities",
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
