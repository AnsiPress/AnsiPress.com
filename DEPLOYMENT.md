# Deployment Guide

This guide will walk you through deploying AnsiPress.com to production.

## Prerequisites

Before deploying, ensure you have:

1. A [Vercel](https://vercel.com) account
2. A [Neon](https://neon.tech) database account
3. A [Resend](https://resend.com) account with a verified domain
4. Admin credentials prepared

## Step 1: Set Up Neon Database

1. Create a new Neon project at https://console.neon.tech

2. Copy your connection string (it looks like `postgresql://user:password@host/database`)

3. Make sure to note down:
   - Database URL
   - Region (choose one close to your users)

## Step 2: Configure Resend Email

1. Sign up at https://resend.com

2. Add and verify your domain:
   - Go to Domains
   - Click "Add Domain"
   - Follow DNS verification steps
   - Recommended: Use a subdomain like `mail.ansipress.com`

3. Create an API key:
   - Go to API Keys
   - Click "Create API Key"
   - Give it a descriptive name (e.g., "AnsiPress Production")
   - Copy the key (you won't be able to see it again!)

4. Set your "From" email:
   - Use format: `waitlist@yourdomain.com`
   - Make sure it matches your verified domain

## Step 3: Prepare Environment Variables

Generate secure secrets:

```bash
# Generate admin API key
openssl rand -hex 32

# Generate cookie secret
openssl rand -hex 32
```

For the admin password, you can:
- Use a bcrypt generator: https://bcrypt-generator.com/
- Or set a plain password (less secure for production)

Keep these values ready for the next step.

## Step 4: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new

2. Import your GitHub repository

3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. Add Environment Variables (one by one):

   ```
   DATABASE_URL=postgresql://user:password@host/database
   RESEND_API_KEY=re_...
   RESEND_FROM_EMAIL=waitlist@ansipress.com
   ADMIN_EMAIL=admin@ansipress.com
   NEXT_PUBLIC_APP_URL=https://ansipress.com
   ADMIN_PASSWORD=hashed_password_or_plain_password
   ADMIN_API_KEY=generated_api_key_from_step_3
   ADMIN_COOKIE_SECRET=generated_secret_from_step_3
   NEXT_PUBLIC_ADMIN_API_KEY=same_as_ADMIN_API_KEY
   ```

5. Click "Deploy"

### Option B: Deploy via CLI

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:

   ```bash
   vercel login
   ```

3. Deploy:

   ```bash
   vercel
   ```

4. Add environment variables:

   ```bash
   vercel env add DATABASE_URL
   vercel env add RESEND_API_KEY
   vercel env add RESEND_FROM_EMAIL
   # ... add all other variables
   ```

5. Redeploy with environment variables:

   ```bash
   vercel --prod
   ```

## Step 5: Run Database Migrations

After deployment, you need to initialize your database:

### Option A: Using Vercel CLI

```bash
# Set DATABASE_URL locally for migrations
export DATABASE_URL="your_neon_connection_string"

# Generate and push migrations
npm run db:generate
npm run db:push
```

### Option B: Using Drizzle Kit directly

```bash
npx drizzle-kit push
```

## Step 6: Verify Deployment

1. **Test the homepage:**
   - Visit https://ansipress.com
   - Try joining the waitlist
   - Check if the form works

2. **Check your email:**
   - You should receive a welcome email
   - Verify the verification link works

3. **Test admin dashboard:**
   - Go to https://ansipress.com/admin
   - Login with your admin password
   - Verify you can see the new signup
   - Check all dashboard features

4. **Test admin email:**
   - Check if you received the admin notification email
   - Verify all signup details are correct

## Step 7: Configure Custom Domain (Optional)

1. In Vercel dashboard:
   - Go to Project Settings
   - Navigate to Domains
   - Add your custom domain (e.g., ansipress.com)

2. Update DNS records at your domain registrar:
   - Follow Vercel's instructions
   - Wait for DNS propagation (can take up to 48 hours)

3. Update environment variables:
   - Change `NEXT_PUBLIC_APP_URL` to your custom domain
   - Redeploy

## Step 8: Monitoring and Maintenance

### Enable Error Tracking

Consider integrating:
- [Sentry](https://sentry.io) for error tracking
- [Vercel Analytics](https://vercel.com/analytics) for performance monitoring

### Regular Maintenance

1. **Database Backups:**
   - Neon provides automatic backups
   - Consider setting up additional backup strategies

2. **Monitor Email Deliverability:**
   - Check Resend dashboard regularly
   - Monitor bounce rates and spam complaints

3. **Security Updates:**
   - Keep dependencies updated: `npm audit`
   - Rotate API keys periodically

## Troubleshooting

### Build Fails

**Error: Cannot find module 'drizzle-orm'**
- Solution: Make sure all dependencies are installed
- Run: `npm install`

**Error: DATABASE_URL is not set**
- Solution: Add environment variable in Vercel dashboard
- Redeploy after adding

### Emails Not Sending

**Check:**
1. RESEND_API_KEY is correct
2. Domain is verified in Resend
3. "From" email matches verified domain
4. Check Resend logs for errors

### Admin Login Not Working

**Check:**
1. ADMIN_PASSWORD is set correctly
2. ADMIN_COOKIE_SECRET is set
3. Try clearing cookies and logging in again

### Database Connection Issues

**Check:**
1. DATABASE_URL is correct
2. Neon project is active (not suspended)
3. IP allowlist is configured (if enabled)

## Post-Deployment Checklist

- [ ] Waitlist form works on homepage
- [ ] Migration form works
- [ ] Welcome emails are sent
- [ ] Admin notifications are sent
- [ ] Email verification works
- [ ] Unsubscribe works
- [ ] Admin login works
- [ ] Admin dashboard loads
- [ ] Waitlist table displays data
- [ ] Stats are accurate
- [ ] Charts render correctly
- [ ] CSV export works
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate is active
- [ ] Analytics configured (if desired)

## Performance Optimization

1. **Enable Vercel Edge Functions** (if needed):
   - Configure in `next.config.ts`
   - Use for rate limiting and API routes

2. **Database Connection Pooling:**
   - Neon handles this automatically
   - No additional configuration needed

3. **Caching:**
   - Admin stats can be cached for a few minutes
   - Use `revalidate` in fetch options

## Security Best Practices

1. **Never commit secrets:**
   - Always use environment variables
   - Keep `.env.local` in `.gitignore`

2. **Use strong passwords:**
   - Admin password should be complex
   - Use bcrypt hashing for production

3. **Rotate keys regularly:**
   - Change ADMIN_API_KEY every 3-6 months
   - Update Resend API key if compromised

4. **Monitor for suspicious activity:**
   - Check admin logs regularly
   - Set up rate limit alerts

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check Neon database logs
3. Check Resend email logs
4. Review Next.js error messages

For additional help:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)
- [Neon Documentation](https://neon.tech/docs)
- [Resend Documentation](https://resend.com/docs)
