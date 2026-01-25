import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Heading,
} from "@react-email/components";

export interface WelcomeEmailProps {
  email: string;
  verificationToken: string;
}

export const WelcomeEmail = ({
  email,
  verificationToken,
}: WelcomeEmailProps) => {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://ansipress.com"}/verify?token=${verificationToken}`;
  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://ansipress.com"}/unsubscribe?email=${encodeURIComponent(email)}`;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header with gradient */}
          <Section style={header}>
            <Heading style={h1}>Welcome to AnsiPress</Heading>
            <Text style={tagline}>
              Ansible-Powered Hosting for Modern Applications
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={paragraph}>Hi there,</Text>
            <Text style={paragraph}>
              Thank you for joining the AnsiPress waitlist! We're excited to have you on board as we build the future of infrastructure automation.
            </Text>

            {/* Verification CTA */}
            <Section style={ctaSection}>
              <Text style={paragraph}>
                Please verify your email address to stay updated:
              </Text>
              <Link href={verificationUrl} style={button}>
                Verify Email Address
              </Link>
            </Section>

            <Hr style={hr} />

            {/* What's Next Section */}
            <Heading style={h2}>What's Next?</Heading>
            <Text style={paragraph}>
              <strong>🚀 Early Access:</strong> Verified members get priority access when we launch
            </Text>
            <Text style={paragraph}>
              <strong>📬 Weekly Updates:</strong> Get behind-the-scenes insights into our development progress
            </Text>
            <Text style={paragraph}>
              <strong>💬 Your Input Matters:</strong> Help shape AnsiPress with your feedback
            </Text>

            <Hr style={hr} />

            {/* Social Links */}
            <Text style={paragraph}>
              Follow our journey:
            </Text>
            <Text style={paragraph}>
              <Link href="https://twitter.com/ansipress" style={link}>
                Twitter
              </Link>
              {" • "}
              <Link href="https://github.com/ansipress" style={link}>
                GitHub
              </Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Built with ❤️ by Mitesh Shah
            </Text>
            <Text style={footerText}>
              <Link href={unsubscribeUrl} style={unsubscribeLink}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#0a0a0a",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0",
  maxWidth: "600px",
};

const header = {
  background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
  borderRadius: "12px 12px 0 0",
  padding: "40px 24px",
  textAlign: "center" as const,
};

const h1 = {
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0 0 8px",
};

const tagline = {
  color: "#f3e8ff",
  fontSize: "16px",
  margin: "0",
};

const content = {
  backgroundColor: "#1a1a1a",
  padding: "32px 24px",
  borderRadius: "0 0 12px 12px",
};

const paragraph = {
  color: "#d4d4d8",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const h2 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "24px 0 16px",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#8b5cf6",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 32px",
};

const hr = {
  borderColor: "#27272a",
  margin: "32px 0",
};

const link = {
  color: "#8b5cf6",
  textDecoration: "underline",
};

const footer = {
  padding: "24px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#71717a",
  fontSize: "14px",
  margin: "8px 0",
};

const unsubscribeLink = {
  color: "#71717a",
  textDecoration: "underline",
};

export default WelcomeEmail;
