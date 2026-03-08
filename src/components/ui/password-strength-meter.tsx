"use client";

import { useMemo } from "react";

interface PasswordStrengthMeterProps {
  password: string;
}

export function getPasswordStrength(password: string) {
  let score = 0;
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  if (checks.length) score++;
  if (checks.uppercase) score++;
  if (checks.lowercase) score++;
  if (checks.digit) score++;
  if (checks.special) score++;

  const labels = ["", "Very Weak", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];
  const textColors = ["", "text-red-400", "text-orange-400", "text-yellow-400", "text-blue-400", "text-green-400"];

  return { score, max: 5, label: labels[score], color: colors[score], textColor: textColors[score], checks };
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  if (password.length === 0) return null;

  return (
    <div className="space-y-2 mt-2">
      {/* Strength meter bar */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < strength.score ? strength.color : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${strength.textColor}`}>{strength.label}</p>
      {/* Requirements checklist */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <span className={strength.checks.length ? "text-green-400" : "text-zinc-500"}>
          {strength.checks.length ? "✓" : "○"} 8+ characters
        </span>
        <span className={strength.checks.uppercase ? "text-green-400" : "text-zinc-500"}>
          {strength.checks.uppercase ? "✓" : "○"} Uppercase letter
        </span>
        <span className={strength.checks.lowercase ? "text-green-400" : "text-zinc-500"}>
          {strength.checks.lowercase ? "✓" : "○"} Lowercase letter
        </span>
        <span className={strength.checks.digit ? "text-green-400" : "text-zinc-500"}>
          {strength.checks.digit ? "✓" : "○"} Digit
        </span>
        <span className={strength.checks.special ? "text-green-400" : "text-zinc-500"}>
          {strength.checks.special ? "✓" : "○"} Special character
        </span>
      </div>
    </div>
  );
}
