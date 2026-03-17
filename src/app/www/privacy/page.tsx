import { PolicyLayout } from "@/components/policy-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - AnsiPress",
  description:
    "Learn how AnsiPress collects, uses, and protects your personal information. Covers both BYOS and Fully Managed hosting services.",
};

const sections = [
  { id: "definitions", title: "1. Definitions" },
  { id: "information-we-collect", title: "2. Information We Collect" },
  { id: "account-info", title: "2.1 Account Information", level: 2 },
  { id: "waitlist-info", title: "2.2 Waitlist & Contact", level: 2 },
  { id: "byos-data", title: "2.3 BYOS Service Data", level: 2 },
  { id: "fully-managed-data", title: "2.4 Fully Managed Data", level: 2 },
  { id: "payment-info", title: "2.5 Payment Information", level: 2 },
  { id: "auto-collected", title: "2.6 Auto-Collected Data", level: 2 },
  { id: "how-we-use", title: "3. How We Use Your Information" },
  { id: "how-we-protect", title: "4. How We Protect Your Information" },
  { id: "third-party-services", title: "5. Third-Party Services" },
  { id: "cookies", title: "6. Cookies & Tracking" },
  { id: "data-retention", title: "7. Data Retention" },
  { id: "your-rights", title: "8. Your Rights" },
  { id: "international-transfers", title: "9. International Data Transfers" },
  { id: "childrens-privacy", title: "10. Children's Privacy" },
  { id: "changes", title: "11. Changes to This Policy" },
  { id: "contact", title: "12. Contact Us" },
];

export default function PrivacyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      effectiveDate="March 17, 2026"
      lastUpdated="March 17, 2026"
      sections={sections}
    >
      <div className="space-y-10 text-zinc-300">

        {/* 1. Definitions */}
        <section id="definitions">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            1. Definitions
          </h2>
          <p className="mb-4">
            The following terms have specific meanings throughout this Privacy Policy:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              <strong className="text-white">AnsiPress</strong> — The platform, website, and services operated by AnsiPress.
            </li>
            <li>
              <strong className="text-white">BYOS (Bring Your Own Server)</strong> — A service model where the customer provides their own server and AnsiPress connects to it via SSH to manage the software stack.
            </li>
            <li>
              <strong className="text-white">Fully Managed</strong> — A service model where AnsiPress provisions servers on AnsiPress-owned cloud provider accounts using Terraform/OpenTofu. The customer pays a single unified bill covering infrastructure and management and does not interact directly with the cloud provider.
            </li>
            <li>
              <strong className="text-white">Customer Data</strong> — Data, files, databases, and content stored on servers managed by AnsiPress, which remain the property of the customer.
            </li>
            <li>
              <strong className="text-white">Platform Data</strong> — Data collected by AnsiPress in connection with operating and delivering the service, including account information, server configurations, and usage analytics.
            </li>
          </ul>
        </section>

        {/* 2. Information We Collect */}
        <section id="information-we-collect">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            2. Information We Collect
          </h2>

          <section id="account-info" className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 scroll-mt-24">
              2.1 Account Information
            </h3>
            <p>
              When you register for an AnsiPress account, we collect your email address, a hashed password (bcrypt), and display name. If you sign up via Single Sign-On (SSO), we receive your name, email, and profile picture from Google or GitHub. We do not store your OAuth access tokens beyond the authentication flow.
            </p>
          </section>

          <section id="waitlist-info" className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 scroll-mt-24">
              2.2 Waitlist and Contact Information
            </h3>
            <p>
              When you join our waitlist or submit our contact form, we collect your name, email address, and optionally company name, website, use case description, and message. We also record UTM parameters and referral source for marketing attribution.
            </p>
          </section>

          <section id="byos-data" className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 scroll-mt-24">
              2.3 BYOS Service Data
            </h3>
            <p className="mb-3">
              For BYOS customers, we collect and store:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Server IP addresses and hostnames</li>
              <li>Server operating system and version</li>
              <li>SSH public keys generated by AnsiPress for server access</li>
              <li>Provisioning and Ansible playbook execution logs</li>
              <li>Website and application configurations (domains, PHP version, database names)</li>
            </ul>
            <p className="mt-3">
              We do not store the content of your databases or files. You retain full ownership and control of your server and all data on it.
            </p>
          </section>

          <section id="fully-managed-data" className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 scroll-mt-24">
              2.4 Fully Managed Service Data
            </h3>
            <p className="mb-3">
              For Fully Managed customers, AnsiPress provisions servers using its own cloud provider accounts via Terraform/OpenTofu. Customers do not provide cloud credentials. We collect and store:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Your preferred region and server size/tier selection</li>
              <li>Resource usage metrics (CPU, RAM, disk, bandwidth)</li>
              <li>Provisioning logs and server lifecycle events</li>
              <li>Website and application configurations</li>
            </ul>
            <p className="mt-3">
              AnsiPress owns the underlying cloud infrastructure. You own your application data and content.
            </p>
          </section>

          <section id="payment-info" className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 scroll-mt-24">
              2.5 Payment Information
            </h3>
            <p>
              Payments are processed by Stripe. We store your Stripe customer ID, subscription status, plan details, and billing history. We never store full card numbers, CVV codes, or raw bank account numbers. Stripe&apos;s Privacy Policy governs the handling of payment card data.
            </p>
          </section>

          <section id="auto-collected" className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 scroll-mt-24">
              2.6 Automatically Collected Information
            </h3>
            <p>
              When you use the AnsiPress website and dashboard, we automatically collect IP addresses, browser type, device type, pages visited, and timestamps via Vercel Analytics and Speed Insights. Error data and stack traces are collected by Sentry for debugging purposes.
            </p>
          </section>
        </section>

        {/* 3. How We Use */}
        <section id="how-we-use">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            3. How We Use Your Information
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-white/5">
                  <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Purpose</th>
                  <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Data Used</th>
                  <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Legal Basis</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Account creation and authentication", "Email, password hash, SSO profile", "Contract performance"],
                  ["Providing BYOS service", "Server IP, SSH keys, configs, logs", "Contract performance"],
                  ["Providing Fully Managed service", "Region/size preferences, usage metrics, configs", "Contract performance"],
                  ["Processing payments and billing", "Stripe customer ID, subscription data", "Contract performance"],
                  ["Sending transactional emails", "Email address", "Contract performance"],
                  ["Preventing fraud and abuse", "IP, device data, rate limiting data", "Legitimate interest"],
                  ["Error monitoring and debugging", "Error data, stack traces (Sentry)", "Legitimate interest"],
                  ["Website analytics and improvement", "Page views, clicks, device info (Vercel)", "Legitimate interest"],
                  ["Responding to support requests", "Email, account details, server logs", "Legitimate interest"],
                  ["Marketing communications (with consent)", "Email address", "Consent"],
                ].map(([purpose, data, basis]) => (
                  <tr key={purpose} className="hover:bg-white/5">
                    <td className="border border-white/10 px-4 py-3">{purpose}</td>
                    <td className="border border-white/10 px-4 py-3 text-zinc-400">{data}</td>
                    <td className="border border-white/10 px-4 py-3 text-zinc-400">{basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. How We Protect */}
        <section id="how-we-protect">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            4. How We Store and Protect Your Information
          </h2>

          <h3 className="text-lg font-semibold text-white mb-3">4.1 Infrastructure Security</h3>
          <p className="mb-4">
            User data is stored in Neon PostgreSQL with SSL/TLS encryption in transit and encryption at rest. Authentication tokens are stored exclusively in HTTP-only, Secure, SameSite cookies — never in localStorage or sessionStorage. Passwords are hashed using bcrypt. SSH private keys stored by AnsiPress are encrypted at rest.
          </p>

          <h3 className="text-lg font-semibold text-white mb-3">4.2 Server Security</h3>
          <p className="mb-4">
            Servers managed by AnsiPress (both BYOS and Fully Managed) have CrowdSec (intrusion prevention), UFW (firewall), and SSH hardening applied. SSL/TLS certificates are issued via Let&apos;s Encrypt using acme.sh.
          </p>

          <h3 className="text-lg font-semibold text-white mb-3">4.3 Application Security</h3>
          <p className="mb-4">
            Public forms are protected by Cloudflare Turnstile to prevent bot abuse. API rate limiting is enforced using Redis. CORS policies restrict API access to authorized origins.
          </p>

          <h3 className="text-lg font-semibold text-white mb-3">4.4 Organizational Security</h3>
          <p>
            Access to customer data follows the principle of least privilege. System activity is monitored for anomalous behavior. We do not sell customer data to third parties.
          </p>
        </section>

        {/* 5. Third-Party Services */}
        <section id="third-party-services">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            5. Third-Party Services
          </h2>
          <p className="mb-4">
            AnsiPress uses the following third-party services to operate the platform. Each sub-processor has its own privacy policy governing how it handles data.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-white/5">
                  <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Service</th>
                  <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Purpose</th>
                  <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Data Shared</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Neon (PostgreSQL)", "Primary database", "All structured data"],
                  ["Stripe", "Payment processing", "Billing info, email"],
                  ["Resend", "Transactional email delivery", "Email address, email content"],
                  ["Cloudflare Turnstile", "Bot protection on forms", "IP, browser fingerprint"],
                  ["Vercel", "Website hosting & analytics", "Page views, IP, device info"],
                  ["Sentry", "Error tracking & debugging", "Error data, stack traces, IP"],
                  ["Google (SSO)", "OAuth authentication", "Profile info (on login)"],
                  ["GitHub (SSO)", "OAuth authentication", "Profile info (on login)"],
                  ["Hetzner / AWS / DigitalOcean", "Fully Managed server infrastructure", "Server specs, region preferences"],
                ].map(([service, purpose, data]) => (
                  <tr key={service} className="hover:bg-white/5">
                    <td className="border border-white/10 px-4 py-3 text-white">{service}</td>
                    <td className="border border-white/10 px-4 py-3">{purpose}</td>
                    <td className="border border-white/10 px-4 py-3 text-zinc-400">{data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Cookies */}
        <section id="cookies">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            6. Cookies and Tracking
          </h2>
          <p className="mb-4">
            AnsiPress uses a minimal set of cookies. We do not use advertising cookies or sell data to ad networks.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-white/5">
                  <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Cookie</th>
                  <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Type</th>
                  <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["access_token", "HTTP-only, Secure — Session", "JWT for authenticating API requests"],
                  ["refresh_token", "HTTP-only, Secure — Persistent", "Refreshing the access token without re-login"],
                  ["cf-turnstile-*", "Session — Cloudflare Turnstile", "Bot detection on public forms"],
                  ["Vercel Analytics", "Analytics (no PII)", "Aggregated page view and performance metrics"],
                ].map(([cookie, type, purpose]) => (
                  <tr key={cookie} className="hover:bg-white/5">
                    <td className="border border-white/10 px-4 py-3 font-mono text-purple-300 text-xs">{cookie}</td>
                    <td className="border border-white/10 px-4 py-3 text-zinc-400">{type}</td>
                    <td className="border border-white/10 px-4 py-3">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-zinc-400 text-sm">
            Authentication tokens are stored in HTTP-only cookies only — never in localStorage or sessionStorage. This prevents cross-site scripting (XSS) attacks from accessing your session.
          </p>
        </section>

        {/* 7. Data Retention */}
        <section id="data-retention">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            7. Data Retention
          </h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-white/5">
                  <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Data Type</th>
                  <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Retention Period</th>
                  <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Account data", "Until account deletion request", "Deleted within 30 days of request"],
                  ["BYOS server records", "Until disconnected + 30 days", "SSH key revoked on disconnect; software remains on your server"],
                  ["Fully Managed server data", "Until cancellation + 30 days", "30-day grace period to export data; servers decommissioned after"],
                  ["Payment records", "7 years", "Required for tax and legal compliance"],
                  ["Audit logs", "1 year", "Security and compliance purposes"],
                  ["Error/Sentry data", "90 days", "Automatically purged by Sentry"],
                  ["Analytics data", "Aggregated, indefinitely", "No PII retained by Vercel analytics"],
                  ["Waitlist data", "Until unsubscribe", "Deleted immediately on unsubscribe"],
                ].map(([type, retention, notes]) => (
                  <tr key={type} className="hover:bg-white/5">
                    <td className="border border-white/10 px-4 py-3 text-white">{type}</td>
                    <td className="border border-white/10 px-4 py-3">{retention}</td>
                    <td className="border border-white/10 px-4 py-3 text-zinc-400">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. Your Rights */}
        <section id="your-rights">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            8. Your Rights
          </h2>
          <p className="mb-4">
            Depending on your jurisdiction, you may have the following rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 mb-4">
            <li><strong className="text-white">Access</strong> — Request a copy of the personal data we hold about you.</li>
            <li><strong className="text-white">Correction</strong> — Request correction of inaccurate or incomplete data.</li>
            <li><strong className="text-white">Deletion</strong> — Request deletion of your account and associated personal data.</li>
            <li><strong className="text-white">Portability</strong> — Request your data in a machine-readable format.</li>
            <li><strong className="text-white">Restriction</strong> — Request that we restrict processing of your data.</li>
            <li><strong className="text-white">Objection</strong> — Object to processing based on legitimate interest.</li>
            <li><strong className="text-white">Withdraw Consent</strong> — Withdraw consent for marketing communications at any time.</li>
          </ul>
          <p className="mb-3">
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:privacy@ansipress.com" className="text-purple-400 hover:text-purple-300 underline">
              privacy@ansipress.com
            </a>. We will respond within 30 days.
          </p>
          <p>
            To unsubscribe from marketing emails, use the unsubscribe link in any email we send or visit{" "}
            <a href="/unsubscribe" className="text-purple-400 hover:text-purple-300 underline">
              ansipress.com/unsubscribe
            </a>.
          </p>
        </section>

        {/* 9. International */}
        <section id="international-transfers">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            9. International Data Transfers
          </h2>
          <p className="mb-3">
            AnsiPress is operated from India. Your data may be transferred to and processed in countries other than your own — including the United States and the European Union — by our sub-processors (such as Neon, Vercel, Stripe, Sentry, and cloud providers).
          </p>
          <p>
            Where we transfer personal data internationally, we rely on appropriate safeguards such as Standard Contractual Clauses (SCCs) or the sub-processor&apos;s own compliance certifications. By using AnsiPress, you acknowledge and consent to these transfers.
          </p>
        </section>

        {/* 10. Children */}
        <section id="childrens-privacy">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            10. Children&apos;s Privacy
          </h2>
          <p>
            AnsiPress services are intended for individuals 18 years of age and older. We do not knowingly collect personal information from anyone under 18. If you believe a minor has provided us with personal data, please contact us at{" "}
            <a href="mailto:privacy@ansipress.com" className="text-purple-400 hover:text-purple-300 underline">
              privacy@ansipress.com
            </a>{" "}
            and we will delete it promptly.
          </p>
        </section>

        {/* 11. Changes */}
        <section id="changes">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            11. Changes to This Policy
          </h2>
          <p className="mb-3">
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify you of material changes by:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 mb-3">
            <li>Posting the updated policy at this URL with a new &quot;Last updated&quot; date</li>
            <li>Sending an email notification to registered users for significant changes</li>
          </ul>
          <p>
            Continued use of the platform after the effective date of the updated policy constitutes acceptance of the changes.
          </p>
        </section>

        {/* 12. Contact */}
        <section id="contact">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            12. Contact Us
          </h2>
          <p className="mb-4">
            For privacy-related inquiries, data requests, or concerns:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>
              Email:{" "}
              <a href="mailto:privacy@ansipress.com" className="text-purple-400 hover:text-purple-300 underline">
                privacy@ansipress.com
              </a>
            </li>
            <li>
              Contact Form:{" "}
              <a href="/contact" className="text-purple-400 hover:text-purple-300 underline">
                ansipress.com/contact
              </a>
            </li>
          </ul>
          <p className="mt-6 text-zinc-500 text-sm">
            AnsiPress is operated by AnsiPress.
          </p>
        </section>

      </div>
    </PolicyLayout>
  );
}
