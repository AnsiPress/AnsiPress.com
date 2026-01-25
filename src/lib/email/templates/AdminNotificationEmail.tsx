import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Heading,
} from "@react-email/components";

export interface AdminNotificationEmailProps {
  email: string;
  website?: string;
  currentHost?: string;
  monthlyTraffic?: string;
  referralSource?: string;
  utmSource?: string;
}

export const AdminNotificationEmail = ({
  email,
  website,
  currentHost,
  monthlyTraffic,
  referralSource,
  utmSource,
}: AdminNotificationEmailProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "https://ansipress.com";
  const dashboardUrl = `${baseUrl}/admin/waitlist`;
  
  // Highlight high-value leads
  const isHighValue = 
    currentHost?.toLowerCase().includes("wp engine") ||
    currentHost?.toLowerCase().includes("kinsta") ||
    monthlyTraffic === "500k-1M" ||
    monthlyTraffic === "1M+";

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>🎉 New Waitlist Signup</Heading>
            {isHighValue && (
              <Text style={highlight}>⭐ HIGH-VALUE LEAD</Text>
            )}
          </Section>

          <Section style={content}>
            <Heading style={h2}>Signup Details</Heading>
            
            <table style={table}>
              <tbody>
                <tr>
                  <td style={labelCell}>Email:</td>
                  <td style={valueCell}>{email}</td>
                </tr>
                {website && (
                  <tr>
                    <td style={labelCell}>Website:</td>
                    <td style={valueCell}>
                      <Link href={website} style={link}>{website}</Link>
                    </td>
                  </tr>
                )}
                {currentHost && (
                  <tr>
                    <td style={labelCell}>Current Host:</td>
                    <td style={valueCell}>{currentHost}</td>
                  </tr>
                )}
                {monthlyTraffic && (
                  <tr>
                    <td style={labelCell}>Monthly Traffic:</td>
                    <td style={valueCell}>{monthlyTraffic}</td>
                  </tr>
                )}
                {referralSource && (
                  <tr>
                    <td style={labelCell}>Referral Source:</td>
                    <td style={valueCell}>{referralSource}</td>
                  </tr>
                )}
                {utmSource && (
                  <tr>
                    <td style={labelCell}>UTM Source:</td>
                    <td style={valueCell}>{utmSource}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <Section style={ctaSection}>
              <Link href={dashboardUrl} style={button}>
                View in Dashboard
              </Link>
            </Section>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              AnsiPress Admin Notifications
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f4f4f5",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0",
  maxWidth: "600px",
};

const header = {
  backgroundColor: "#8b5cf6",
  borderRadius: "12px 12px 0 0",
  padding: "24px",
  textAlign: "center" as const,
};

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
};

const highlight = {
  backgroundColor: "#fbbf24",
  color: "#000000",
  fontSize: "14px",
  fontWeight: "bold",
  padding: "8px 16px",
  borderRadius: "4px",
  display: "inline-block",
  margin: "12px 0 0",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "32px 24px",
  borderRadius: "0 0 12px 12px",
};

const h2 = {
  color: "#18181b",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 0 16px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const labelCell = {
  color: "#71717a",
  fontSize: "14px",
  padding: "12px 16px 12px 0",
  fontWeight: "600",
  verticalAlign: "top" as const,
  width: "140px",
};

const valueCell = {
  color: "#18181b",
  fontSize: "14px",
  padding: "12px 0",
  verticalAlign: "top" as const,
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "32px 0 0",
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
  padding: "12px 32px",
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
  margin: "0",
};

export default AdminNotificationEmail;
