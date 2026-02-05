# AnsiPress Website AI Context

## Overview

This repository (`ansipress.com`) is the public-facing landing page and administrative dashboard for **AnsiPress Managed Hosting**. It showcases high-performance hosting powered by Ansible, ZFS, and CrowdSec.

## Core Mission

- **Convert Visitors**: High-intent Managed WordPress Hosting seekers.
- **Manage Operations**: Admin dashboard for waitlist and lead management.
- **Orchestration**: Planned integration with a Go (Gin/Fiber) API to trigger Ansible playbooks in the `AnsiPress` core repository.

---

## Tech Stack (v2026)

- **Frontend**: Next.js 16.1.4 (App Router)
- **Styling**: Tailwind CSS v4 (Modern CSS-first approach)
- **Database**: Vercel/Neon Postgres via **Drizzle ORM**
- **Authentication**: Custom JWT-based Admin Sessions (`jose` + `bcryptjs`)
- **Security & Bot Protection**: Cloudflare Turnstile (Mandatory for all forms)
- **Email**: Resend with React Email templates
- **Analytics**: Vercel Analytics + Vercel Speed Insights
- **UI Components**: Shadcn UI (Radix Primitives + CVA)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Error Tracking**: **Sentry** (Full-stack integration)

---

## Project Structure

- `src/app/`: The heart of the application.
  - `(public)`: `page.tsx`, `start/`, `contact/`, `verify/`, `unsubscribe/`, `about/`, `terms/`, `privacy/`.
  - `admin/`: Protected administrative dashboard.
  - `api/`: Backend endpoints (`waitlist`, `contact`, `unsubscribe`, etc.).
  - `login/`: Admin login gateway.

- `src/components/`: Modular UI sections.
  - `hero.tsx`, `features.tsx`, `pricing.tsx`, `tech-specs.tsx`, `migration-section.tsx`.
  - `Turnstile.tsx`: Standard widget for security.
  - `ui/`: Shared UI primitives.
    - `gradient-text.tsx`: Reusable animated gradient text.
    - `brand-logo.tsx`: Standardized brand logo component.

- `src/lib/`: Shared utilities.
  - `db/schema.ts`: Drizzle table definitions.
  - `auth.ts`: Password verification and JWT session management.
  - `turnstile.ts`: Server-side token validation logic.
  - `email/`: Notification dispatch logic.

---

## Monitoring & Status

We use a self-hosted **Uptime Kuma** instance for service health monitoring.

- **Status Page**: `https://status.ansipress.com`
- **Proxy**: `/api/status` (Next.js route)
- **Source API**: `https://status.ansipress.com/api/status-page/ansipress`
- **Caching**: 30-second server-side revalidation cache.
- **Frontend**: `<StatusBadge />` in `hero.tsx` displays real-time health (60s poll).

We use **Sentry** for error tracking and performance monitoring.

- **Scope**: Client-side, Server-side, and Edge runtime.
- **Configuration**: `sentry.server.config.ts`, `sentry.edge.config.ts`, `src/instrumentation.ts`, `src/instrumentation-client.ts`, and `src/app/global-error.tsx`.
- **Workflow**: Source maps are automatically uploaded during build/CI.

---

## UI/UX Guidelines (CRITICAL)

### 1. Aesthetic

- **Dark Mode First**: `bg-black`, `text-white`, `selection:bg-purple-500/30`.
- **Glassmorphism**: Use `bg-white/5`, `backdrop-blur-sm`, and `border-white/10`.

### 2. Branding & Gradients

Every mention of "AnsiPress" or key headers MUST use the official animated gradient. Use the provided components instead of manual classes whenever possible:

- **Components**:
  - `<BrandLogo size="sm|md|lg" />`: For the brand name "AnsiPress".
  - `<GradientText as="h1|h2|span">`: For any animated gradient headline.
- **Core Animation**: `animate-gradient` (8-second flow).
- **Tailwind Classes** (underlying): `text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-[length:200%_auto]`.
- **Weight**: `font-bold tracking-tight`
- **Render Rule**: Must be an `inline-block` for the gradient to display properly.

### 3. Typography

- **Primary**: Inter (Variable)
- **Header Accents**: Space Grotesk (Variable)

---

## Security Protocols (Turnstile)

Cloudflare Turnstile is the **default and mandatory** security mechanism.

### Mandatory Protection Checklist

1. **Frontend**: Add `<Turnstile onSuccess={...} />` to every form. Disable submit until token is received.
2. **Backend**: Validate the token using `verifyTurnstileToken(token)` in API routes or Server Actions before processing data.
3. **Theming**: Always use the `dark` theme for the widget.

### Current Protected Paths

1. Waitlist (`/`, `/start`)
2. Migration Form (`/`)
3. Enterprise Contact (`/contact`)
4. Admin Login (`/admin/login`)
5. Unsubscribe Feedback (`/unsubscribe`)

---

## Data Model (Drizzle)

### `waitlist`

Stores user signups for the service. Includes UTM tracking and verification status.

### `enterprise_contacts`

High-value leads for managed migration and specialized hosting needs.

### `email_logs`

Audit trail of system notifications sent via Resend.

---

## Future AI Instructions

- **When adding a new form**: You MUST include the Turnstile widget and implement server-side verification.
- **When modifying UI**: Follow the "Premium Dark" aesthetic. Avoid generic colors; stick to the purple-to-blue palette.
- **When adding routes**: Prefer App Router (React Server Components). Use Server Actions for administrative mutations.
- **Consistency**: Refer to `src/app/layout.tsx` for metadata/SEO standards and `src/components/navbar.tsx` for branding implementation.
- **Security**: 1000% Priority. Never expose sensitive logic. Always use `jose` for session validation on `/admin` routes.
- **Best Practices**: You MUST follow the `next-best-practices` skill instructions. Refer to `.agent/skills/next-best-practices/SKILL.md` for standards on RSC, data patterns, and optimization.
- **Maintenance**: Check `package.json` for current versions; never use EOL libraries.