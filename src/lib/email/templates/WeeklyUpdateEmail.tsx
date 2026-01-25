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

export interface WeeklyUpdateEmailProps {
  email: string;
  updates: string[];
}

export const WeeklyUpdateEmail = ({
  email,
  updates,
}: WeeklyUpdateEmailProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "https://ansipress.com";
  const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}`;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Weekly Update</Heading>
            <Text style={tagline}>
              What's happening at AnsiPress
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={paragraph}>Hi there,</Text>
            <Text style={paragraph}>
              Here's what we've been working on this week:
            </Text>

            {/* Updates List */}
            <Section style={updatesList}>
              {updates.map((update, index) => (
                <Text key={index} style={updateItem}>
                  • {update}
                </Text>
              ))}
            </Section>

            <Hr style={hr} />

            {/* Feature Highlights */}
            <Heading style={h2}>Coming Soon</Heading>
            <Text style={paragraph}>
              We're getting closer to launch! Stay tuned for early access invitations.
            </Text>

            <Hr style={hr} />

            {/* CTA */}
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

const updatesList = {
  margin: "24px 0",
};

const updateItem = {
  color: "#d4d4d8",
  fontSize: "16px",
  lineHeight: "28px",
  margin: "8px 0",
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

export default WeeklyUpdateEmail;
