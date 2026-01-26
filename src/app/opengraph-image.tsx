import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "AnsiPress - Ansible-Powered Hosting Automation";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
        }}
      >
        {/* Logo Text with Gradient */}
        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            backgroundImage:
              "linear-gradient(90deg, #a855f7 0%, #ec4899 25%, #ec4899 50%, #a78bfa 75%, #60a5fa 100%)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 30,
          }}
        >
          AnsiPress
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#a1a1aa",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Ansible-Powered Hosting Automation
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
