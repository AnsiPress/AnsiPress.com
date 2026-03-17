import { GradientText } from "@/components/ui/gradient-text";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - AnsiPress",
  description:
    "Terms of Service for AnsiPress server management platform. Covers BYOS and Fully Managed hosting service models.",
};

const toc = [
  { id: "definitions", label: "1. Definitions" },
  { id: "account-registration", label: "2. Account Registration" },
  { id: "service-description", label: "3. Service Description" },
  { id: "byos-terms", label: "4. BYOS Terms" },
  { id: "fully-managed-terms", label: "5. Fully Managed Terms" },
  { id: "customer-data", label: "6. Customer Data and Content" },
  { id: "acceptable-use", label: "7. Acceptable Use Policy" },
  { id: "payment-billing", label: "8. Payment and Billing" },
  { id: "service-level", label: "9. Service Level and Availability" },
  { id: "intellectual-property", label: "10. Intellectual Property" },
  { id: "limitation-of-liability", label: "11. Limitation of Liability" },
  { id: "indemnification", label: "12. Indemnification" },
  { id: "termination", label: "13. Termination" },
  { id: "dispute-resolution", label: "14. Dispute Resolution" },
  { id: "general", label: "15. General Provisions" },
  { id: "contact", label: "16. Contact Us" },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            <GradientText>AnsiPress</GradientText>{" "}
            <span className="text-white">Terms of Service</span>
          </h1>
          <p className="text-zinc-400">Effective Date: March 17, 2026</p>
          <p className="text-zinc-300 mt-4 leading-relaxed">
            Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using
            the AnsiPress server management platform. By creating an account or
            using any part of the service, you agree to be bound by these Terms.
            If you do not agree, do not use AnsiPress.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="rounded-lg border border-white/10 bg-white/5 p-6 mb-10">
          <h2 className="text-white font-semibold text-lg mb-4">
            Table of Contents
          </h2>
          <ol className="space-y-1">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-purple-400 hover:text-purple-300 underline text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-12">
          {/* 1. Definitions */}
          <section id="definitions" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              1. Definitions
            </h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-3 text-zinc-300">
              <p><span className="text-white font-medium">AnsiPress</span> — The company operating this platform and the AnsiPress service.</p>
              <p><span className="text-white font-medium">Customer / You</span> — Any individual or entity that registers for or uses the AnsiPress platform.</p>
              <p><span className="text-white font-medium">BYOS (Bring Your Own Server)</span> — A service model where you connect your own server to AnsiPress for software stack management.</p>
              <p><span className="text-white font-medium">Fully Managed</span> — A service model where AnsiPress provisions and fully manages servers on AnsiPress-owned cloud accounts. You pay one unified bill.</p>
              <p><span className="text-white font-medium">Customer Data</span> — All content, databases, files, and application data stored on your server(s).</p>
              <p><span className="text-white font-medium">Platform</span> — The AnsiPress dashboard, API, and associated tooling.</p>
              <p><span className="text-white font-medium">Server</span> — A virtual or physical machine managed through AnsiPress, whether customer-owned (BYOS) or AnsiPress-provisioned (Fully Managed).</p>
            </div>
          </section>

          {/* 2. Account Registration */}
          <section id="account-registration" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              2. Account Registration
            </h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-3 text-zinc-300">
              <ul className="list-disc list-inside space-y-2">
                <li>You must be at least <span className="text-white">18 years of age</span> to use AnsiPress.</li>
                <li>You may register using an email address and password, or via SSO with Google or GitHub.</li>
                <li>Email verification is required to activate your account.</li>
                <li>Passwords must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.</li>
                <li>You are responsible for maintaining the security of your account credentials. Do not share your password.</li>
                <li>One account per person. Creating multiple accounts to circumvent restrictions is prohibited.</li>
                <li>You must provide accurate and complete registration information and keep it up to date.</li>
              </ul>
            </div>
          </section>

          {/* 3. Service Description */}
          <section id="service-description" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              3. Service Description
            </h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-4 text-zinc-300">
              <p>
                AnsiPress is a server management platform that automates the
                deployment and management of web server stacks. We offer two
                service models: BYOS and Fully Managed (described in sections 4
                and 5).
              </p>
              <p>The supported software stack includes:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Web server: Nginx</li>
                <li>Database: MariaDB</li>
                <li>PHP runtime: PHP-FPM (multiple versions supported)</li>
                <li>Cache: Redis</li>
                <li>WordPress management: WP-CLI</li>
                <li>SSL certificates: Let&apos;s Encrypt via acme.sh</li>
                <li>Security: CrowdSec (intrusion prevention), UFW (firewall), SSH hardening</li>
                <li>Backups: AnsiSnap / ZFS-based snapshots</li>
              </ul>
            </div>
          </section>

          {/* 4. BYOS Terms */}
          <section id="byos-terms" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              4. BYOS Terms
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-semibold mb-3">Server Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li>Operating system: Ubuntu or Debian (supported LTS versions)</li>
                  <li>Root or sudo SSH access must be available</li>
                  <li>Minimum 1 GB RAM and 10 GB available disk space</li>
                  <li>Public IP address accessible from the internet</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-semibold mb-3">SSH Access Model</h3>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li>AnsiPress generates an SSH key pair for each server connection.</li>
                  <li>You install the AnsiPress public key on your server to authorise management access.</li>
                  <li>AnsiPress uses this key exclusively for software management via Ansible playbooks.</li>
                  <li>Upon disconnecting a server, the SSH key is revoked and removed from AnsiPress systems.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-semibold mb-3">Your Responsibilities (BYOS)</h3>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li>You are solely responsible for your server hardware, uptime, and availability.</li>
                  <li>You maintain your own relationship and billing with your hosting provider (AWS, Hetzner, DigitalOcean, or others).</li>
                  <li>You must comply with your hosting provider&apos;s terms of service.</li>
                  <li>You are responsible for maintaining independent backups of your data.</li>
                  <li>You are responsible for any legal compliance requirements related to data stored on your server.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-semibold mb-3">What AnsiPress Does NOT Control (BYOS)</h3>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li>Server hardware reliability, network uptime, or cloud provider outages</li>
                  <li>Data stored on your server by you or your users</li>
                  <li>Your hosting provider&apos;s billing, policies, or service changes</li>
                  <li>Server availability after AnsiPress access is revoked</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. Fully Managed Terms */}
          <section id="fully-managed-terms" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              5. Fully Managed Terms
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-semibold mb-3">Infrastructure Ownership</h3>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li>AnsiPress provisions servers on AnsiPress-owned cloud provider accounts using Terraform/OpenTofu.</li>
                  <li>You do NOT provide cloud provider API keys or credentials.</li>
                  <li>AnsiPress owns the underlying infrastructure; you own your data and content.</li>
                  <li>AnsiPress may change the underlying cloud provider at any time, provided your data and service continuity are maintained.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-semibold mb-3">Billing</h3>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li>You receive one unified invoice from AnsiPress covering both infrastructure costs and management fees.</li>
                  <li>You do not receive a separate bill from any cloud provider.</li>
                  <li>You select the server region and size; AnsiPress provisions accordingly.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-semibold mb-3">Your Responsibilities (Fully Managed)</h3>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li>You are responsible for your data, applications, and content deployed on the managed server.</li>
                  <li>You must keep your payment method current and up to date.</li>
                  <li>You must comply with AnsiPress&apos;s Acceptable Use Policy (section 7).</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-semibold mb-3">What AnsiPress Manages (Fully Managed)</h3>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li>Operating system updates and security patches</li>
                  <li>Web stack installation and updates (Nginx, MariaDB, PHP-FPM, Redis)</li>
                  <li>SSL certificate provisioning and renewal</li>
                  <li>Firewall configuration (UFW) and intrusion prevention (CrowdSec)</li>
                  <li>Server backups via AnsiSnap/ZFS</li>
                  <li>Server health monitoring and alerting</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. Customer Data */}
          <section id="customer-data" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              6. Customer Data and Content
            </h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-3 text-zinc-300">
              <p><span className="text-white font-medium">Ownership:</span> You retain full ownership of all data and content you store on your server(s). AnsiPress claims no intellectual property rights over your Customer Data.</p>
              <p><span className="text-white font-medium">Licence:</span> You grant AnsiPress a limited, non-exclusive licence to access and process your server environment solely to provide the services described in these Terms.</p>
              <p><span className="text-white font-medium">Data Portability:</span></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><span className="text-white">BYOS:</span> You have direct access to your server at all times via your hosting provider, regardless of AnsiPress connectivity.</li>
                <li><span className="text-white">Fully Managed:</span> Upon termination, you have a 30-day grace period to export your data before servers are decommissioned.</li>
              </ul>
              <p><span className="text-white font-medium">No Liability for Customer Data:</span> AnsiPress is not responsible for the legality, accuracy, or appropriateness of content you store or publish. You are solely responsible for your Customer Data.</p>
            </div>
          </section>

          {/* 7. Acceptable Use */}
          <section id="acceptable-use" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              7. Acceptable Use Policy
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-semibold mb-3">Prohibited Content</h3>
                <p className="text-zinc-300 mb-2">You may not use AnsiPress to host or distribute:</p>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li>Illegal content of any kind</li>
                  <li>Child sexual abuse material (CSAM) — zero tolerance; immediately reported to law enforcement</li>
                  <li>Malware, ransomware, spyware, or similar malicious software</li>
                  <li>Phishing pages or credential harvesting sites</li>
                  <li>Unsolicited bulk email (spam)</li>
                  <li>Pirated software, movies, music, or other copyrighted material</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-semibold mb-3">Prohibited Activities</h3>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li>Attempting to gain unauthorised access to any system, network, or data</li>
                  <li>Cryptocurrency mining (without prior written approval)</li>
                  <li>Operating open proxies or Tor exit nodes</li>
                  <li>Launching or facilitating DDoS attacks</li>
                  <li>Reverse engineering or attempting to extract AnsiPress source code</li>
                  <li>Reselling AnsiPress services without written authorisation</li>
                  <li>Resource abuse that degrades service for other customers</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-semibold mb-3">Enforcement</h3>
                <p className="text-zinc-300">
                  Violations of this Acceptable Use Policy may result in
                  immediate suspension or termination of your account without
                  refund. Where required by law, AnsiPress will report illegal
                  activity to the relevant law enforcement authorities.
                </p>
              </div>
            </div>
          </section>

          {/* 8. Payment and Billing */}
          <section id="payment-billing" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              8. Payment and Billing
            </h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-3 text-zinc-300">
              <ul className="list-disc list-inside space-y-2">
                <li>All prices are in US Dollars (USD) unless otherwise stated.</li>
                <li>Payments are processed securely via <span className="text-white">Stripe</span>.</li>
                <li>Subscriptions are available on monthly or annual billing cycles and renew automatically.</li>
                <li>For Fully Managed plans, you receive a single all-inclusive invoice (infrastructure + management). You are not billed separately by any cloud provider.</li>
                <li>You must keep a valid payment method on file. Failure to maintain a valid payment method may result in service suspension.</li>
                <li><span className="text-white">14-day money-back guarantee:</span> If you are not satisfied within the first 14 days of your initial subscription, contact us for a full refund.</li>
                <li>After 14 days, all fees are non-refundable except as required by applicable law.</li>
                <li>AnsiPress will provide at least 30 days&apos; notice before implementing price increases.</li>
              </ul>
            </div>
          </section>

          {/* 9. Service Level */}
          <section id="service-level" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              9. Service Level and Availability
            </h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-3 text-zinc-300">
              <ul className="list-disc list-inside space-y-2">
                <li>AnsiPress does not guarantee 100% uptime of the Platform or dashboard.</li>
                <li>Scheduled maintenance windows will be communicated in advance where possible.</li>
                <li><span className="text-white">BYOS:</span> Server availability is solely your responsibility via your hosting provider.</li>
                <li><span className="text-white">Fully Managed:</span> AnsiPress is not liable for outages caused by underlying cloud providers (AWS, Hetzner, DigitalOcean, or others) or for DDoS attacks beyond our mitigation capabilities.</li>
                <li>For support enquiries, contact{" "}
                  <a href="mailto:support@ansipress.com" className="text-purple-400 hover:text-purple-300 underline">
                    support@ansipress.com
                  </a>.
                </li>
              </ul>
            </div>
          </section>

          {/* 10. Intellectual Property */}
          <section id="intellectual-property" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              10. Intellectual Property
            </h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-3 text-zinc-300">
              <ul className="list-disc list-inside space-y-2">
                <li><span className="text-white">Platform:</span> The AnsiPress dashboard, API, and backend are proprietary. All rights reserved.</li>
                <li>
                  <span className="text-white">Ansible Playbooks:</span> The Ansible playbooks used for server management are open source and available at{" "}
                  <a
                    href="https://github.com/AnsiPress/AnsiPress"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    github.com/AnsiPress/AnsiPress
                  </a>{" "}
                  under their respective open-source licences.
                </li>
                <li><span className="text-white">Terraform / OpenTofu Modules:</span> Infrastructure provisioning modules used for Fully Managed services are proprietary and confidential.</li>
                <li><span className="text-white">Customer Content:</span> You retain all intellectual property rights in your Customer Data and published content.</li>
                <li><span className="text-white">Feedback:</span> Any feedback, suggestions, or ideas you provide to AnsiPress may be used by us without obligation or compensation to you.</li>
              </ul>
            </div>
          </section>

          {/* 11. Limitation of Liability */}
          <section id="limitation-of-liability" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              11. Limitation of Liability
            </h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-3 text-zinc-300">
              <p>
                THE ANSIPRESS PLATFORM IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;
                WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
                BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ANSIPRESS
                SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS,
                LOSS OF DATA, OR BUSINESS INTERRUPTION, HOWEVER CAUSED.
              </p>
              <p>
                IN NO EVENT SHALL ANSIPRESS&apos;S TOTAL AGGREGATE LIABILITY TO YOU
                EXCEED THE TOTAL FEES YOU PAID TO ANSIPRESS IN THE 12 MONTHS
                IMMEDIATELY PRECEDING THE CLAIM.
              </p>
              <p className="text-zinc-400 text-sm">
                Some jurisdictions do not allow limitation of implied warranties
                or exclusion of certain damages; the above limitations may not
                apply to you to the extent prohibited by applicable law.
              </p>
            </div>
          </section>

          {/* 12. Indemnification */}
          <section id="indemnification" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              12. Indemnification
            </h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-zinc-300">
              <p>
                You agree to indemnify, defend, and hold harmless AnsiPress and
                its officers, directors, employees, and agents from and against
                any claims, liabilities, damages, losses, and expenses
                (including reasonable legal fees) arising out of or in
                connection with: (a) your use of the AnsiPress platform; (b)
                your Customer Data; (c) your violation of these Terms; or (d)
                your violation of any applicable law or the rights of any third
                party.
              </p>
            </div>
          </section>

          {/* 13. Termination */}
          <section id="termination" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              13. Termination
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-semibold mb-3">Termination by You</h3>
                <p className="text-zinc-300">
                  You may cancel your account at any time through the dashboard
                  or by contacting{" "}
                  <a href="mailto:support@ansipress.com" className="text-purple-400 hover:text-purple-300 underline">
                    support@ansipress.com
                  </a>
                  . Cancellation takes effect at the end of the current billing
                  period unless otherwise arranged.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-semibold mb-3">Termination by AnsiPress</h3>
                <p className="text-zinc-300">
                  AnsiPress may suspend or terminate your account immediately
                  for: violation of the Acceptable Use Policy; non-payment after
                  reasonable notice; legal obligations; or activity posing a
                  security risk to the platform or other customers.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-semibold mb-3">Effect of Termination</h3>
                <ul className="list-disc list-inside space-y-1 text-zinc-300">
                  <li><span className="text-white">BYOS:</span> AnsiPress SSH access is revoked and the SSH key is deleted. Software already installed on your server remains and your server continues to operate.</li>
                  <li><span className="text-white">Fully Managed:</span> A 30-day grace period begins during which you can export your data. After 30 days, all provisioned servers are decommissioned and all associated data is permanently deleted.</li>
                  <li>Sections 6, 10, 11, 12, 14, and 15 survive termination.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 14. Dispute Resolution */}
          <section id="dispute-resolution" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              14. Dispute Resolution
            </h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-3 text-zinc-300">
              <p>
                <span className="text-white font-medium">Governing Law:</span>{" "}
                These Terms are governed by the laws of India, without regard to
                its conflict of law provisions.
              </p>
              <p>
                <span className="text-white font-medium">Informal Resolution:</span>{" "}
                Before initiating formal proceedings, both parties agree to
                attempt to resolve disputes informally. Either party must
                provide 30 days&apos; written notice of the dispute and good-faith
                efforts to resolve it before escalating.
              </p>
              <p>
                <span className="text-white font-medium">Binding Arbitration:</span>{" "}
                If informal resolution fails, disputes shall be resolved by
                binding arbitration in accordance with the Arbitration and
                Conciliation Act, 1996 of India. The seat of arbitration shall
                be India.
              </p>
              <p>
                <span className="text-white font-medium">Class Action Waiver:</span>{" "}
                You agree to resolve disputes with AnsiPress on an individual
                basis only. You waive any right to participate in a class action
                or representative proceeding.
              </p>
            </div>
          </section>

          {/* 15. General Provisions */}
          <section id="general" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              15. General Provisions
            </h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 space-y-3 text-zinc-300">
              <p><span className="text-white font-medium">Entire Agreement:</span> These Terms, together with the Privacy Policy, constitute the entire agreement between you and AnsiPress regarding the platform and supersede all prior agreements.</p>
              <p><span className="text-white font-medium">Severability:</span> If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.</p>
              <p><span className="text-white font-medium">Waiver:</span> Failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.</p>
              <p><span className="text-white font-medium">Assignment:</span> You may not assign your rights or obligations under these Terms without AnsiPress&apos;s prior written consent. AnsiPress may assign its rights freely.</p>
              <p><span className="text-white font-medium">Force Majeure:</span> AnsiPress shall not be liable for any failure or delay in performance due to circumstances beyond its reasonable control, including natural disasters, internet outages, or acts of government.</p>
              <p><span className="text-white font-medium">Notices:</span> Notices to AnsiPress should be sent to the relevant email addresses listed in section 16. Notices to you will be sent to the email address on your account.</p>
              <p><span className="text-white font-medium">No Third-Party Beneficiaries:</span> These Terms do not create any third-party beneficiary rights.</p>
            </div>
          </section>

          {/* 16. Contact Us */}
          <section id="contact" className="scroll-mt-24">
            <h2 className="text-xl font-semibold text-white mb-4">
              16. Contact Us
            </h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-zinc-300 space-y-3">
              <p>For any questions or notices under these Terms, contact us at:</p>
              <ul className="space-y-2">
                <li>
                  <span className="text-white">General support:</span>{" "}
                  <a href="mailto:support@ansipress.com" className="text-purple-400 hover:text-purple-300 underline">
                    support@ansipress.com
                  </a>
                </li>
                <li>
                  <span className="text-white">Legal enquiries:</span>{" "}
                  <a href="mailto:legal@ansipress.com" className="text-purple-400 hover:text-purple-300 underline">
                    legal@ansipress.com
                  </a>
                </li>
                <li>
                  <span className="text-white">Billing issues:</span>{" "}
                  <a href="mailto:billing@ansipress.com" className="text-purple-400 hover:text-purple-300 underline">
                    billing@ansipress.com
                  </a>
                </li>
                <li>
                  <span className="text-white">Security reports:</span>{" "}
                  <a href="mailto:security@ansipress.com" className="text-purple-400 hover:text-purple-300 underline">
                    security@ansipress.com
                  </a>
                </li>
                <li>
                  <span className="text-white">Contact form:</span>{" "}
                  <Link href="/contact" className="text-purple-400 hover:text-purple-300 underline">
                    ansipress.com/contact
                  </Link>
                </li>
              </ul>
              <p className="text-zinc-500 text-sm pt-2">
                AnsiPress is operated by AnsiPress.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
