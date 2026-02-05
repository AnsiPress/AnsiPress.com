"use client";

import clsx from "clsx";
import { GradientText } from "./gradient-text";

type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
};

export function BrandLogo({ size = "md", as = "span", className, children }: BrandLogoProps) {
  const sizeClass =
    size === "sm" ? "text-lg" : size === "lg" ? "text-4xl" : "text-xl";

  return (
    <GradientText
      as={as}
      className={clsx(sizeClass, "font-bold tracking-tight", className)}
    >
      {children || "AnsiPress"}
    </GradientText>
  );
}
