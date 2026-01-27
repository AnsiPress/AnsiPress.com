"use client";

import { Turnstile as TurnstileWidget } from "@marsidev/react-turnstile";

interface TurnstileProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

export default function Turnstile({ onSuccess, onError, onExpire }: TurnstileProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    console.warn("Turnstile site key not configured");
    return null;
  }

  return (
    <TurnstileWidget
      siteKey={siteKey}
      onSuccess={onSuccess}
      onError={onError}
      onExpire={onExpire}
      options={{
        theme: "dark",
        size: "normal",
      }}
    />
  );
}
