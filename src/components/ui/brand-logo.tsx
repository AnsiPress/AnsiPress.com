"use client";

import React from "react";
import clsx from "clsx";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  as?: React.ElementType;
  className?: string;
};

export function BrandLogo({ size = "md", as = "span", className }: BrandLogoProps) {
  const Tag = (as || "span") as React.ElementType;
  const sizeClass =
    size === "sm" ? "text-lg" : size === "lg" ? "text-4xl" : "text-xl";

  return (
    <Tag
      className={clsx(
        sizeClass,
        "inline-block font-bold tracking-tight",
        className,
        "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
      )}
    >
      AnsiPress
    </Tag>
  );
}
