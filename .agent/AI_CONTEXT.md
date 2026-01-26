# AnsiPress Website AI Context

## Overview

This repository (`ansipress.com`) contains the source code for the AnsiPress Managed Hosting landing page. It is a modern Next.js application designed to showcase the power and speed of the AnsiPress hosting stack.

## Tech Stack

- **Framework**: Next.js 16.1 (App Router)
- **Deployment**: Vercel
- **Database/Storage**: Vercel Postgres (Planned)
- **Analytics**: Vercel Analytics + Speed Insights
- **Security Policy**: 1000% Priority. DO NOT use EOL (End of Life) products. Always verify package maintenance status.
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/UI (Radix Primitives + Class Variance Authority)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Language**: TypeScript

## Project Structure

- `src/app`: App Router pages.
  - `page.tsx`: Main landing page.
  - `layout.tsx`: Root layout.
  - `globals.css`: Global styles.
  - `login/`: Login page.
  - `start/`: Onboarding flow.
  - `demo/`: Demo page.
  - `docs/`: Documentation.
- `src/components`: Reusable UI components.
  - `navbar.tsx`, `footer.tsx`: Layout elements.
  - `hero.tsx`, `features.tsx`, `pricing.tsx`: Landing page sections.
- `src/lib`: Utility functions and shared logic.

## Design Philosophy

- **Aesthetic**: Premium, dark mode, vibrant colors, glassmorphism.
- **Goal**: Convert visitors interested in high-performance Managed WordPress Hosting.

## Lead Generation (Planned)

- Waitlist / Early Access collection.
- "Check your site speed" interactive tools.
- Vulnerability scanning highlights.

## Brand Consistency Audit (2026-01-26)

- Navbar brand: gradient text from purple → pink → blue with `bg-clip-text` in `src/components/navbar.tsx`.
- Verify/Unsubscribe headers: inline `Ansi` + purple `Press` split, not matching navbar style (`src/app/verify/page.tsx`, `src/app/unsubscribe/page.tsx`).
- Recommendation: add a shared `BrandLogo` component with the navbar gradient style and reuse across standalone pages (verify, unsubscribe, admin login, future contact page).

### Proposed `BrandLogo` component
- Location: `src/components/ui/brand-logo.tsx`
- Props: `size` (sm/md/lg), optional `as` (element), optional `className`.
- Style: `text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400`.
- Usage: replace hardcoded `Ansi<span className="text-purple-400">Press</span>` with `<BrandLogo />`.

## Pages Inventory

- Top-level routes in `src/app`:
  - `/` (landing) → uses `Navbar`, `Hero`, `Features`, `MigrationSection`, `TechSpecsSection`, `Pricing`, `Footer`.
  - `/about` (content present).
  - `/docs` (ComingSoon).
  - `/demo` (ComingSoon).
  - `/login` (ComingSoon).
  - `/start` (ComingSoon).
  - `/privacy`, `/terms` (static policies).
  - `/verify`, `/unsubscribe` (functional flows with custom headers).
  - Missing: `/signup` (linked from Pricing for non-enterprise) → would 404.
  - Missing: `/contact` (linked from Pricing for Enterprise) → would 404.
- Admin area: `/admin` with `login`, `waitlist`, stats, charts.
- API routes: `/api/waitlist`, `/api/verify`, `/api/unsubscribe`, plus admin endpoints.

### Consolidation Opportunity
- Combine `login`, `signup` (waitlist), and `start` into a single unified page.
- Common pattern: a "Get Started" page with segmented/tabs UI:
  - Tab 1 (default): Join Waitlist (email form, UTM capture) → reuses `/api/waitlist`.
  - Tab 2: Sign In (placeholder until auth backend lands).
  - Tab 3: Quick Start (high-level onboarding checklist or link to docs).
- Route suggestion: repurpose `/start` to host this unified flow; update navbar CTA and `Pricing` CTAs to point to `/start` for non-enterprise.

## Enterprise Contact Plan

- Page: `/contact` with form fields (name, email, company, website, use case, message). Optional budget and timeline.
- DB: new `enterprise_contacts` table (drizzle) capturing submissions with timestamps and optional UTM/source fields.
- API: `POST /api/contact` to validate, persist, and notify.
- Email: send notification to `admin@ansipress.com` via existing `src/lib/email/send.ts` with a new template `EnterpriseContactEmail`.
- Admin: optional table view in `/admin` for submissions.
- Update `src/components/pricing.tsx`: non-enterprise → `/start`; enterprise → `/contact` (form).

### Draft Schema (drizzle)
- Table: `enterprise_contacts`
  - `id` (serial PK)
  - `name` (text, required)
  - `email` (text, required, index)
  - `company` (text, optional)
  - `website` (text, optional)
  - `use_case` (text, optional)
  - `message` (text, required)
  - `utm_source`, `utm_medium`, `utm_campaign`, `referral_source` (text, optional)
  - `created_at` (timestamp, default now)

## Action Plan (For Review)

1. Brand consistency
  - Implement `BrandLogo` component and use in `/verify` and `/unsubscribe` headers (and admin login).
2. Unified onboarding
  - Convert `/start` to a unified Login / Signup (Waitlist) / Quick Start page.
  - Update navbar "Get Started" and pricing CTAs to point to `/start`.
3. Enterprise contact
  - Create `/contact` page with form; add `enterprise_contacts` table; build `/api/contact` to persist and email admin.
  - Add email template and wire to `admin@ansipress.com`.
4. Clean-up links
  - Remove `/signup` CTA usage in `Pricing` (replace with `/start`).
5. QA & docs
  - Validate routes, confirm no 404s, and update README.

Notes:
- No code changes executed yet; this is a reviewed plan and analysis. Implementation will follow post-approval.

## Implementation Summary (2026-01-26)

- Created `BrandLogo` and applied to verify, unsubscribe, and admin login headers for consistent branding.
- Unified onboarding: implemented `/start` with tabs (Waitlist, Sign In, Quick Start) and updated non-enterprise pricing CTAs to `/start`.
- Enterprise contact: added `/contact` page, `enterprise_contacts` table, API `POST /api/contact`, and admin notification email via `EnterpriseContactEmail`.
- Admin: added `/admin/contacts` page and nav link to list enterprise contact submissions.
- README updated to reflect new routes/pages and schema.
## Brand Guidelines (CRITICAL - 100% Consistency Required)

**All branding across the site MUST use the exact same gradient styling:**

### Gradient Specification
- **Tailwind Classes**: `text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400`
- **Font Weight**: `font-bold`
- **Letter Spacing**: `tracking-tight`
- **Display**: `inline-block` (required for gradient rendering on inline elements)

### Size Usage
- **Navbar** (main site header): `text-xl`
- **Page Headers** (verify, unsubscribe, start, contact, admin login): `text-4xl`
- **Admin Dashboard Header**: `text-xl`

### Pages with Brand Headers
1. [src/components/navbar.tsx](src/components/navbar.tsx) - main brand link
2. [src/app/admin/layout.tsx](src/app/admin/layout.tsx) - admin header
3. [src/app/admin/login/page.tsx](src/app/admin/login/page.tsx) - admin login page
4. [src/app/start/page.tsx](src/app/start/page.tsx) - unified onboarding page
5. [src/app/contact/page.tsx](src/app/contact/page.tsx) - enterprise contact page
6. [src/app/verify/page.tsx](src/app/verify/page.tsx) - email verification page
7. [src/app/unsubscribe/page.tsx](src/app/unsubscribe/page.tsx) - unsubscribe page

### Implementation Rules
- **DO NOT** use `BrandLogo` component for page headers (it had rendering issues with text-white parent inheritance).
- **DO** hardcode the gradient styling directly on `<h1>` or heading elements.
- **DO** ensure full text shows gradient end-to-end (e.g., "AnsiPress Admin" not "AnsiPress" + purple "Admin" span).
- **DO** include `inline-block` for spans/inline elements to ensure gradient renders.
- **Never** split branding text with separate color spans—this breaks the gradient flow.

### Example - Correct Branding
```tsx
<h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
  AnsiPress
</h1>
```

### Example - Incorrect Branding (DO NOT USE)
```tsx
<h1>
  <span className="text-purple-400">Ansi</span>
  <span className="text-pink-400">Press</span>
</h1>
```