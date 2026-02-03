# AnsiPress.com

Ansible-powered hosting automation with ZFS snapshots, backups, and one-command deployments.

👉 Get started: [AnsiPress.com](https://ansipress.com/start?utm_source=github&utm_medium=referral&utm_campaign=oss&utm_content=readme)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Neon database account (free tier available)
- A Resend account for emails (free tier available)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AnsiPress/AnsiPress.com.git
cd AnsiPress.com
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

- **DATABASE_URL**: Get from [Neon](https://neon.tech) dashboard
- **RESEND_API_KEY**: Get from [Resend](https://resend.com/api-keys)
- **ADMIN_PASSWORD**: Use [bcrypt generator](https://bcrypt-generator.com/) to hash your password
- **ADMIN_API_KEY**: Generate with `openssl rand -hex 32`
- **ADMIN_COOKIE_SECRET**: Generate with `openssl rand -hex 32`

### Database Setup

1. Generate database migrations:

```bash
npm run db:generate
```

2. Push migrations to database:

```bash
npm run db:push
```

3. (Optional) Seed the database with test data:

```bash
npm run db:seed
```

4. (Optional) Open Drizzle Studio to view your database:

```bash
npm run db:studio
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Accessing the Admin Dashboard

1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Enter your admin password (the one you set in `.env.local`)
3. Manage waitlist entries, view analytics, and more!

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   │   ├── waitlist/     # Waitlist endpoints
│   │   ├── admin/        # Admin endpoints
│   │   ├── verify/       # Email verification
│   │   ├── unsubscribe/  # Unsubscribe endpoint
│   │   └── contact/      # Enterprise contact endpoint
│   ├── admin/            # Admin dashboard pages
│   │   └── contacts/     # Enterprise contacts admin view
│   ├── verify/           # Email verification page
│   ├── unsubscribe/      # Unsubscribe page
│   ├── contact/          # Enterprise contact page
│   └── start/            # Unified get started (waitlist/signin/quickstart)
├── components/           # React components
│   ├── admin/            # Admin dashboard components
│   └── ui/               # UI components (BrandLogo, etc.)
└── lib/
    ├── db/               # Database schema and client
    ├── email/            # Email templates and service
    ├── auth.ts           # Authentication utilities
    └── rate-limit.ts     # Rate limiting
```

## Features

### Waitlist System
- Email collection with UTM tracking
- Email verification flow
- Unsubscribe functionality
- Rate limiting to prevent spam

### Email Service
- Welcome emails with verification links
- Admin notifications for new signups
- Weekly update emails (automated)

### Admin Dashboard
- Real-time statistics and analytics
- Waitlist management (view, edit, delete)
- Email delivery tracking
- Traffic source analysis
- CSV export

### Security
- Password-protected admin access
- API key authentication for admin routes
- Rate limiting (5 signups per IP per hour)
- Input validation with Zod
- CSRF protection

## Database Scripts

- `npm run db:generate` - Generate migrations from schema changes
- `npm run db:push` - Push migrations to database
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:seed` - Seed database with test data

## Database Schema

- `waitlist` - User waitlist entries
- `email_logs` - Email sending logs
- `enterprise_contacts` - Enterprise contact form submissions

After modifying schema run:

```bash
npm run db:generate
npm run db:push
```

## API Endpoints

### Public Endpoints

- `POST /api/waitlist` - Join waitlist
- `GET /api/waitlist?email={email}` - Check subscription status
- `POST /api/verify` - Verify email address
- `POST /api/unsubscribe` - Unsubscribe from waitlist
- `POST /api/contact` - Submit enterprise contact request

### Admin Endpoints (require API key)

- `GET /api/admin/waitlist` - List all waitlist entries
- `PATCH /api/admin/waitlist/[id]` - Update waitlist entry
- `DELETE /api/admin/waitlist/[id]` - Delete waitlist entry
- `GET /api/admin/email-logs` - View email history
- `GET /api/admin/stats` - Get dashboard statistics

### Admin Pages

- `/admin` - Dashboard
- `/admin/waitlist` - Waitlist management
- `/admin/contacts` - Enterprise contact submissions

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Neon Database](https://neon.tech/docs)
- [Resend Email API](https://resend.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## License

MIT

