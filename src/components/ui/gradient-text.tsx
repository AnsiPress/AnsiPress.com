"use client";

import React from "react";
import clsx from "clsx";

type GradientTextProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "white";
};

export function GradientText({
  as: Tag = "span",
  className,
  children,
  variant = "default",
}: GradientTextProps) {
  const gradientClass =
    variant === "white"
      ? "from-white via-purple-200 to-white"
      : "from-purple-400 via-pink-400 to-blue-400";

  return (
    <Tag
      className={clsx(
        "inline-block text-transparent bg-clip-text bg-linear-to-r bg-[length:200%_auto] animate-gradient",
        gradientClass,
        className
      )}
    >
      {children}
    </Tag>
  );
}
