/**
 * Simple in-memory rate limiter
 * For production, consider using Upstash Redis or similar
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const ipLimits = new Map<string, RateLimitEntry>();
const emailLimits = new Map<string, RateLimitEntry>();

/**
 * Clean up expired entries (called on-demand during rate limit checks)
 */
function cleanupExpiredEntries() {
  const now = Date.now();
  
  for (const [key, entry] of ipLimits.entries()) {
    if (entry.resetAt < now) {
      ipLimits.delete(key);
    }
  }
  
  for (const [key, entry] of emailLimits.entries()) {
    if (entry.resetAt < now) {
      emailLimits.delete(key);
    }
  }
}

/**
 * Check rate limit for IP address
 * Default: 5 signups per hour per IP
 */
export function checkIpRateLimit(
  ip: string,
  maxRequests = 5,
  windowMs = 60 * 60 * 1000 // 1 hour
): { allowed: boolean; remaining: number; resetAt: number } {
  // Clean up expired entries periodically (every 100 checks)
  if (Math.random() < 0.01) {
    cleanupExpiredEntries();
  }

  const now = Date.now();
  const entry = ipLimits.get(ip);

  if (!entry || entry.resetAt < now) {
    // Create new entry
    const resetAt = now + windowMs;
    ipLimits.set(ip, { count: 1, resetAt });
    return { allowed: true, remaining: maxRequests - 1, resetAt };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Check rate limit for email address
 * Default: 3 signups per day per email
 */
export function checkEmailRateLimit(
  email: string,
  maxRequests = 3,
  windowMs = 24 * 60 * 60 * 1000 // 24 hours
): { allowed: boolean; remaining: number; resetAt: number } {
  // Clean up expired entries periodically (every 100 checks)
  if (Math.random() < 0.01) {
    cleanupExpiredEntries();
  }

  const now = Date.now();
  const normalizedEmail = email.toLowerCase();
  const entry = emailLimits.get(normalizedEmail);

  if (!entry || entry.resetAt < now) {
    // Create new entry
    const resetAt = now + windowMs;
    emailLimits.set(normalizedEmail, { count: 1, resetAt });
    return { allowed: true, remaining: maxRequests - 1, resetAt };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Reset rate limit for testing purposes
 */
export function resetRateLimit(ip?: string, email?: string) {
  if (ip) {
    ipLimits.delete(ip);
  }
  if (email) {
    emailLimits.delete(email.toLowerCase());
  }
}
