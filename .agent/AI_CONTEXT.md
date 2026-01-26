# AnsiPress Website AI Context

## Overview

This repository (`ansipress.com`) contains the source code for the AnsiPress Managed Hosting landing page. It is a modern Next.js application designed to showcase the power and speed of the AnsiPress hosting stack.

## Architecture

- **Orchestration Layer (Planned)**: Go (Golang) using Gin or Fiber framework. This API will trigger Ansible playbooks from AnsiPress repo ( check `AnsiPress/.agent/AI_CONTEXT.md` for details).
- **Frontend**: Next.js 16.1 (App Router)
- **Deployment**: Vercel
- **Database/Storage**: Vercel Postgres (Planned)
- **Analytics**: Vercel Analytics + Speed Insights
- **Security Policy**: 1000% Priority. DO NOT use EOL (End of Life) products. Always verify package maintenance status.
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/UI (Radix Primitives + Class Variance Authority)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Language**: TypeScript

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
  - `admin/`: Admin dashboard pages (Waitlist, Enterprise Contacts).
  - `contact/`: Enterprise contact form page.
  - `start/`: Unified onboarding flow (Waitlist, Sign In, Quick Start).
  - `verify/`: Email verification page.
  - `unsubscribe/`: Unsubscribe page.
  - `demo/`: Demo page (ComingSoon).
  - `docs/`: Documentation (ComingSoon).
  - `login/`: Admin login page.
- `src/components`: Reusable UI components.
  - `navbar.tsx`, `footer.tsx`: Layout elements.
  - `hero.tsx`, `features.tsx`, `pricing.tsx`: Landing page sections.
- `src/lib`: Utility functions and shared logic (db, email, auth).

## Design Philosophy

- **Aesthetic**: Premium, dark mode, vibrant colors, glassmorphism.
- **Goal**: Convert visitors interested in high-performance Managed WordPress Hosting.

## Pages Inventory

- Top-level routes in `src/app`:
  - `/` (landing) → Main product showcase.
  - `/start` (Get Started) → Unified Join Waitlist / Sign In / Quick Start.
  - `/contact` (Contact) → Enterprise inquiry form.
  - `/verify` (Verification) → Email verification flow.
  - `/unsubscribe` (Opt-out) → Newsletter/Waitlist opt-out.
  - `/admin` (Manage) → Waitlist and Contact management.
  - `/docs` (ComingSoon).
  - `/demo` (ComingSoon).
- Admin area: `/admin` with `waitlist`, `contacts`, stats, charts.
- API routes: `/api/waitlist`, `/api/verify`, `/api/unsubscribe`, `/api/contact`, plus admin endpoints.

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
- **DO NOT** use `BrandLogo` component for page headers (due to inheritance issues).
- **DO** hardcode the gradient styling directly on `<h1>` or heading elements.
- **Ensure** full text shows gradient end-to-end.
- **Never** split branding text with separate color spans.

### Example - Correct Branding
```tsx
<h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
  AnsiPress
</h1>
```

## Roadmap / Future Features

- **Lead Generation**: "Check your site speed" interactive tools.
- **Vulnerability scanning**: Highlight scanning capabilities.
- **Monitoring Integration**: Display basic server stats if applicable.