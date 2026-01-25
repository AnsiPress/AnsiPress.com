import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const ADMIN_COOKIE_NAME = "ansipress_admin_session";
const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_COOKIE_SECRET || "change-this-in-production"
);

/**
 * Verify admin password
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.error("ADMIN_PASSWORD not set in environment");
    return false;
  }

  // Check if password is already hashed (starts with $2)
  if (adminPassword.startsWith("$2")) {
    return bcrypt.compare(password, adminPassword);
  }
  
  // Plain text comparison (for development only)
  return password === adminPassword;
}

/**
 * Create admin session token
 */
export async function createAdminSession(): Promise<string> {
  const token = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(JWT_SECRET);

  return token;
}

/**
 * Verify admin session token
 */
export async function verifyAdminSession(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.admin === true;
  } catch {
    return false;
  }
}

/**
 * Set admin session cookie
 */
export async function setAdminCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

/**
 * Get admin session from cookie
 */
export async function getAdminSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME);
  return cookie?.value || null;
}

/**
 * Check if user is authenticated admin
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const token = await getAdminSession();
  if (!token) return false;
  return verifyAdminSession(token);
}

/**
 * Clear admin session cookie
 */
export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

/**
 * Verify admin API key for API routes
 */
export function verifyAdminApiKey(apiKey: string | null): boolean {
  const validApiKey = process.env.ADMIN_API_KEY;
  
  if (!validApiKey) {
    console.error("ADMIN_API_KEY not set in environment");
    return false;
  }
  
  return apiKey === validApiKey;
}
