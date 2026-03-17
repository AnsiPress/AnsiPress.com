import { PolicyLayout } from "@/components/policy-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - AnsiPress",
  description:
    "Terms of Service for AnsiPress server management platform. Covers BYOS and Fully Managed hosting service models.",
};

const sections = [
  { id: "definitions", title: "1. Definitions" },
  { id: "account-registration", title: "2. Account Registration" },
  { id: "service-description", title: "3. Service Description" },
  { id: "byos-terms", title: "4. BYOS Terms" },
  { id: "fully-managed-terms", title: "5. Fully Managed Terms" },
  { id: "customer-data", title: "6. Customer Data & Content" },
  { id: "acceptable-use", title: "7. Acceptable Use Policy" },
  { id: "payment-billing", title: "8. Payment and Billing" },
  { id: "service-level", title: "9. Service Level & Availability" },
  { id: "intellectual-property", title: "10. Intellectual Property" },
  { id: "limitation-liability", title: "11. Limitation of Liability" },
  { id: "indemnification", title: "12. Indemnification" },
  { id: "termination", title: "13. Termination" },
  { id: "dispute-resolution", title: "14. Dispute Resolution" },
  { id: "general-provisions", title: "15. General Provisions" },
  { id: "contact", title: "16. Contact Us" },
];

export default function TermsPage() {
  return (
    <PolicyLayout
      title="Terms of Service"
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
            In these Terms of Service, the following terms have specific meanings:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong className="text-white">AnsiPress</strong> — The company, platform, website, and services provided at ansipress.com.</li>
            <li><strong className="text-white">Customer / You</strong> — Any individual or entity that registers for and uses the AnsiPress platform.</li>
            <li><strong className="text-white">BYOS (Bring Your Own Server)</strong> — A service model where you provide your own server and grant AnsiPress SSH access to manage the software stack.</li>
            <li><strong className="text-white">Fully Managed</strong> — A service model where AnsiPress provisions and owns the server infrastructure on your behalf. You pay one unified bill covering infrastructure and management.</li>
            <li><strong className="text-white">Customer Data</strong> — Websites, databases, files, and content stored on servers managed by AnsiPress that you own.</li>
            <li><strong className="text-white">Platform</strong> — The AnsiPress web dashboard, API, and associated software tools.</li>
            <li><strong className="text-white">Server</strong> — A virtual or physical machine managed by AnsiPress, either customer-provided (BYOS) or AnsiPress-provisioned (Fully Managed).</li>
          </ul>
        </section>

        {/* 2. Account Registration */}
        <section id="account-registration">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            2. Account Registration
          </h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>You must be at least 18 years of age to create an account.</li>
            <li>You may register with an email and password or via Google/GitHub SSO. Email verification is required before accessing the platform.</li>
            <li>Passwords must be at least 8 characters and include an uppercase letter, a lowercase letter, a digit, and a special character.</li>
            <li>You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.</li>
            <li>One account per person or organization. You may not share accounts or create accounts on behalf of third parties without authorization.</li>
            <li>You agree to provide accurate, current, and complete information and to keep it updated.</li>
          </ul>
        </section>

        {/* 3. Service Description */}
        <section id="service-description">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            3. Service Description
          </h2>
          <p className="mb-4">
            AnsiPress is a server management platform that automates the deployment and maintenance of web hosting stacks. We support two service models: BYOS and Fully Managed (described in detail in Sections 4 and 5 respectively).
          </p>
          <p className="mb-3">The managed software stack includes:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Web server: Nginx</li>
            <li>Database: MariaDB</li>
            <li>PHP runtime: PHP-FPM (multiple versions)</li>
            <li>Object cache: Redis</li>
            <li>WordPress management: WP-CLI</li>
            <li>SSL certificates: Let&apos;s Encrypt via acme.sh</li>
            <li>Intrusion prevention: CrowdSec</li>
            <li>Firewall: UFW</li>
            <li>Backups: AnsiSnap (ZFS-based snapshots)</li>
          </ul>
          <p className="mt-3 text-zinc-400 text-sm">
            Feature availability may vary by plan. AnsiPress reserves the right to modify the managed stack over time with reasonable notice.
          </p>
        </section>

        {/* 4. BYOS Terms */}
        <section id="byos-terms">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            4. BYOS (Bring Your Own Server) Terms
          </h2>

          <h3 className="text-lg font-semibold text-white mb-3">4.1 Server Requirements</h3>
          <p className="mb-3">Your server must meet these minimum requirements:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
            <li>Operating system: Ubuntu 22.04 LTS or later, or Debian 11 or later</li>
            <li>SSH access: root or a user with full sudo privileges</li>
            <li>Minimum RAM: 1 GB</li>
            <li>Minimum disk space: 10 GB</li>
            <li>Public IPv4 address</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mb-3">4.2 SSH Access Model</h3>
          <p className="mb-3">
            To manage your server, AnsiPress generates an SSH key pair. The public key is installed on your server. You retain the ability to revoke this access at any time by removing the key from your server&apos;s{" "}
            <code className="text-purple-300 bg-white/5 px-1 rounded">authorized_keys</code>{" "}
            file, which will disable AnsiPress management.
          </p>
          <p className="mb-4">
            When you disconnect your server from AnsiPress, the SSH key is revoked on our end. All software previously installed by AnsiPress remains on your server.
          </p>

          <h3 className="text-lg font-semibold text-white mb-3">4.3 Customer Responsibilities</h3>
          <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
            <li>Maintaining your relationship with your hosting provider (AWS, Hetzner, DigitalOcean, etc.).</li>
            <li>Paying your hosting provider&apos;s invoices directly.</li>
            <li>Ensuring your server meets the requirements above before connecting.</li>
            <li>Complying with your hosting provider&apos;s terms of service.</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mb-3">4.4 What AnsiPress Does Not Control</h3>
          <p>
            For BYOS, AnsiPress is not responsible for: server hardware failures, network outages from your hosting provider, data loss on your server, or any actions taken by your hosting provider. AnsiPress is solely a management layer.
          </p>
        </section>

        {/* 5. Fully Managed Terms */}
        <section id="fully-managed-terms">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            5. Fully Managed Terms
          </h2>

          <h3 className="text-lg font-semibold text-white mb-3">5.1 Infrastructure Ownership</h3>
          <p className="mb-4">
            In the Fully Managed model, AnsiPress provisions servers on cloud infrastructure owned by AnsiPress (using Terraform/OpenTofu on providers such as Hetzner, AWS, or DigitalOcean). You do not need to provide a cloud account, API keys, or credentials. AnsiPress owns and operates the infrastructure on your behalf.
          </p>

          <h3 className="text-lg font-semibold text-white mb-3">5.2 Unified Billing</h3>
          <p className="mb-4">
            You pay one invoice to AnsiPress covering all costs: server infrastructure, storage, bandwidth, and platform management fees. There are no separate cloud provider bills. Pricing is based on the server tier and region you select.
          </p>

          <h3 className="text-lg font-semibold text-white mb-3">5.3 Provisioning and Configuration</h3>
          <p className="mb-4">
            AnsiPress uses Terraform/OpenTofu to provision servers according to your selected region, operating system, and size. Terraform/OpenTofu modules used for provisioning are proprietary to AnsiPress. You select configuration preferences through the dashboard; AnsiPress handles all provisioning automatically.
          </p>
          <p className="mb-4">
            AnsiPress may migrate infrastructure to a different cloud provider at its discretion with at least 30 days&apos; notice, provided there is no material degradation in service.
          </p>

          <h3 className="text-lg font-semibold text-white mb-3">5.4 Customer Responsibilities</h3>
          <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
            <li>Providing accurate billing information for unified invoices.</li>
            <li>Complying with the Acceptable Use Policy (Section 7).</li>
            <li>Maintaining backups of critical Customer Data (AnsiPress provides AnsiSnap backups, but you are ultimately responsible for your data).</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mb-3">5.5 What AnsiPress Manages</h3>
          <p>
            For Fully Managed customers, AnsiPress is responsible for: server provisioning and decommissioning, OS updates, software stack management, security patching, SSL certificate renewals, firewall and CrowdSec configuration, and AnsiSnap backup setup.
          </p>
        </section>

        {/* 6. Customer Data */}
        <section id="customer-data">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            6. Customer Data and Content
          </h2>
          <p className="mb-4">
            <strong className="text-white">You own your data.</strong> AnsiPress does not claim ownership of any Customer Data (websites, databases, files, emails) stored on servers we manage.
          </p>
          <p className="mb-4">
            You grant AnsiPress a limited, non-exclusive license to access and process Customer Data solely to the extent necessary to provide and maintain the services described in these Terms.
          </p>
          <p className="mb-3"><strong className="text-white">Data Portability:</strong></p>
          <ul className="list-disc list-inside space-y-2 pl-2 mb-4">
            <li><strong className="text-white">BYOS:</strong> You have direct SSH access to your server at all times and can export data at any point.</li>
            <li><strong className="text-white">Fully Managed:</strong> On cancellation, you have a 30-day grace period to export your data via provided tools or SSH access. After 30 days, servers are decommissioned and data is permanently deleted.</li>
          </ul>
          <p>
            AnsiPress is not liable for any Customer Data loss resulting from customer actions, third-party software failures, or force majeure events beyond AnsiPress&apos;s reasonable control.
          </p>
        </section>

        {/* 7. Acceptable Use */}
        <section id="acceptable-use">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            7. Acceptable Use Policy
          </h2>
          <p className="mb-4">You may not use AnsiPress services for the following:</p>

          <h3 className="text-lg font-semibold text-white mb-3">7.1 Prohibited Content</h3>
          <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
            <li>Illegal content of any kind under applicable law</li>
            <li>Child sexual abuse material (CSAM) — zero tolerance, reported to authorities</li>
            <li>Malware, ransomware, spyware, or any malicious software distribution</li>
            <li>Phishing websites or credential harvesting pages</li>
            <li>Spam operations or unsolicited bulk email infrastructure</li>
            <li>Pirated software, media, or copyright-infringing content</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mb-3">7.2 Prohibited Activities</h3>
          <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
            <li>Unauthorized access to third-party systems (hacking, port scanning, vulnerability exploitation)</li>
            <li>Cryptocurrency mining (regardless of legality)</li>
            <li>Operating open proxies, VPN resale services, or anonymization services without approval</li>
            <li>Launching denial-of-service (DDoS) attacks against any target</li>
            <li>Reverse engineering, decompiling, or attempting to extract the AnsiPress platform source code</li>
            <li>Reselling AnsiPress services without written permission</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mb-3">7.3 Resource Abuse</h3>
          <p className="mb-4">
            You may not use server resources in a way that materially degrades AnsiPress infrastructure or the services of other customers. AnsiPress may impose resource limits, throttle excessive usage, or suspend accounts that abuse shared systems.
          </p>

          <h3 className="text-lg font-semibold text-white mb-3">7.4 Enforcement</h3>
          <p>
            Violations of this Acceptable Use Policy may result in immediate suspension or termination without refund, reporting to law enforcement where required, and civil or criminal liability where applicable.
          </p>
        </section>

        {/* 8. Payment and Billing */}
        <section id="payment-billing">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            8. Payment and Billing
          </h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>All prices are in USD. Payments are processed securely by Stripe.</li>
            <li>Subscriptions renew automatically on a monthly or annual basis. You authorize AnsiPress to charge your payment method on each renewal date.</li>
            <li>For Fully Managed plans, your single invoice covers all server infrastructure costs plus management fees — there are no additional cloud provider bills.</li>
            <li>A 14-day money-back guarantee applies to new subscriptions. Requests after 14 days are non-refundable.</li>
            <li>AnsiPress will provide 30 days&apos; written notice before increasing prices. Continued use after the effective date constitutes acceptance.</li>
            <li>Failure to pay within 7 days of the due date may result in service suspension. Failure to pay within 30 days may result in account termination and, for Fully Managed, server decommissioning.</li>
          </ul>
        </section>

        {/* 9. Service Level */}
        <section id="service-level">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            9. Service Level and Availability
          </h2>
          <p className="mb-4">
            AnsiPress aims to maintain high availability of the platform but does not guarantee 100% uptime. Scheduled maintenance will be communicated in advance where possible.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong className="text-white">BYOS:</strong> Server uptime is the responsibility of you and your hosting provider. AnsiPress is not liable for server outages on customer-owned infrastructure.</li>
            <li><strong className="text-white">Fully Managed:</strong> AnsiPress is not liable for outages caused by upstream cloud provider failures (AWS, Hetzner, DigitalOcean) that are outside AnsiPress&apos;s reasonable control.</li>
            <li>Support is provided via email at support@ansipress.com. Response times are best-effort and vary by plan.</li>
          </ul>
        </section>

        {/* 10. Intellectual Property */}
        <section id="intellectual-property">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            10. Intellectual Property
          </h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>The AnsiPress platform (web application, API, dashboard) is proprietary software owned by AnsiPress. All rights reserved.</li>
            <li>The Ansible playbooks powering server configuration are open source and available at{" "}
              <a href="https://github.com/AnsiPress/AnsiPress" className="text-purple-400 hover:text-purple-300 underline">
                github.com/AnsiPress/AnsiPress
              </a>{" "}
              under their respective open source licenses.
            </li>
            <li>Terraform/OpenTofu infrastructure provisioning modules used for Fully Managed are proprietary to AnsiPress.</li>
            <li>You retain full ownership of all Customer Data, website content, and applications you deploy on servers managed by AnsiPress.</li>
            <li>Any feedback, suggestions, or feature requests you provide to AnsiPress may be used to improve the platform without compensation or attribution obligation.</li>
          </ul>
        </section>

        {/* 11. Limitation of Liability */}
        <section id="limitation-liability">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            11. Limitation of Liability
          </h2>
          <p className="mb-4">
            THE ANSIPRESS PLATFORM IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
          </p>
          <p className="mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ANSIPRESS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA, REVENUE, PROFITS, OR BUSINESS INTERRUPTION, HOWEVER CAUSED.
          </p>
          <p>
            ANSIPRESS&apos;S TOTAL CUMULATIVE LIABILITY FOR ANY CLAIMS ARISING UNDER THESE TERMS SHALL NOT EXCEED THE TOTAL FEES PAID BY YOU TO ANSIPRESS IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
          </p>
        </section>

        {/* 12. Indemnification */}
        <section id="indemnification">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            12. Indemnification
          </h2>
          <p>
            You agree to indemnify, defend, and hold harmless AnsiPress and its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from: (a) your use of the services; (b) your violation of these Terms; (c) your Customer Data or content; (d) your violation of any third-party rights; or (e) your violation of any applicable law.
          </p>
        </section>

        {/* 13. Termination */}
        <section id="termination">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            13. Termination
          </h2>

          <h3 className="text-lg font-semibold text-white mb-3">13.1 Termination by You</h3>
          <p className="mb-4">
            You may cancel your subscription at any time through the dashboard or by contacting support. Cancellation takes effect at the end of the current billing period.
          </p>

          <h3 className="text-lg font-semibold text-white mb-3">13.2 Termination by AnsiPress</h3>
          <p className="mb-3">AnsiPress may suspend or terminate your account with or without notice for:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
            <li>Violation of the Acceptable Use Policy</li>
            <li>Non-payment of fees</li>
            <li>Legal or regulatory requirements</li>
            <li>Security threats posed by your account to other customers or infrastructure</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mb-3">13.3 Effect of Termination</h3>
          <ul className="list-disc list-inside space-y-2 pl-2 mb-4">
            <li><strong className="text-white">BYOS:</strong> The SSH key generated by AnsiPress is revoked. All software installed on your server remains in place. You retain full control of your server.</li>
            <li><strong className="text-white">Fully Managed:</strong> You have a 30-day grace period from the termination date to export your data. After 30 days, servers are decommissioned and all data is permanently deleted.</li>
          </ul>

          <h3 className="text-lg font-semibold text-white mb-3">13.4 Survival</h3>
          <p>
            Sections 6, 7, 10, 11, 12, 14, and 15 survive termination of these Terms.
          </p>
        </section>

        {/* 14. Dispute Resolution */}
        <section id="dispute-resolution">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            14. Dispute Resolution
          </h2>
          <p className="mb-4">
            These Terms are governed by the laws of India. Before initiating formal proceedings, you agree to attempt to resolve any dispute by contacting AnsiPress at{" "}
            <a href="mailto:legal@ansipress.com" className="text-purple-400 hover:text-purple-300 underline">
              legal@ansipress.com
            </a>. We will make a good-faith effort to resolve the issue within 30 days.
          </p>
          <p className="mb-4">
            If informal resolution fails, disputes shall be resolved by binding arbitration under the Arbitration and Conciliation Act, 1996 of India. The seat of arbitration shall be India. The language of arbitration shall be English.
          </p>
          <p>
            <strong className="text-white">Class Action Waiver:</strong> You agree that any dispute resolution proceedings will be conducted on an individual basis. You waive any right to participate in a class action lawsuit or class-wide arbitration.
          </p>
        </section>

        {/* 15. General Provisions */}
        <section id="general-provisions">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            15. General Provisions
          </h2>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li><strong className="text-white">Entire Agreement:</strong> These Terms, together with the Privacy Policy, constitute the entire agreement between you and AnsiPress.</li>
            <li><strong className="text-white">Severability:</strong> If any provision is found unenforceable, the remaining provisions remain in full effect.</li>
            <li><strong className="text-white">No Waiver:</strong> Failure to enforce any provision is not a waiver of the right to enforce it later.</li>
            <li><strong className="text-white">Assignment:</strong> You may not assign your rights under these Terms without AnsiPress&apos;s written consent. AnsiPress may assign its rights to a successor entity.</li>
            <li><strong className="text-white">Force Majeure:</strong> AnsiPress is not liable for failures due to events beyond its reasonable control, including natural disasters, government actions, or third-party network failures.</li>
            <li><strong className="text-white">Notices:</strong> Legal notices to AnsiPress must be sent to legal@ansipress.com. Notices to you will be sent to the email address on your account.</li>
            <li><strong className="text-white">No Third-Party Beneficiaries:</strong> These Terms do not confer any rights on third parties.</li>
          </ul>
        </section>

        {/* 16. Contact */}
        <section id="contact">
          <h2 className="text-xl font-semibold text-white mb-4 scroll-mt-24">
            16. Contact Us
          </h2>
          <p className="mb-4">For questions about these Terms, reach out to us:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-white/5">
                  <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Department</th>
                  <th className="border border-white/10 px-4 py-3 text-left text-white font-semibold">Email</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["General Support", "support@ansipress.com"],
                  ["Legal & Terms", "legal@ansipress.com"],
                  ["Billing", "billing@ansipress.com"],
                  ["Security", "security@ansipress.com"],
                ].map(([dept, email]) => (
                  <tr key={dept} className="hover:bg-white/5">
                    <td className="border border-white/10 px-4 py-3 text-white">{dept}</td>
                    <td className="border border-white/10 px-4 py-3">
                      <a href={`mailto:${email}`} className="text-purple-400 hover:text-purple-300 underline">
                        {email}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-zinc-500 text-sm">
            AnsiPress is operated by AnsiPress.
          </p>
        </section>

      </div>
    </PolicyLayout>
  );
}
