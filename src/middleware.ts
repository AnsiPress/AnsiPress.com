import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_COOKIE_NAME = "ansipress_admin_session";
const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_COOKIE_SECRET || "change-this-in-production"
);

/**
 * Middleware to protect admin routes
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/* routes (except /admin/login) and /api/admin/*/client routes
  const isAdminPage = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  const isAdminClientApi = pathname.includes("/api/admin/") && pathname.includes("/client");
  
  if (isAdminPage || isAdminClientApi) {
    // Get token from cookies
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

    if (!token) {
      if (isAdminClientApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify token
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (payload.admin !== true) {
        if (isAdminClientApi) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      if (isAdminClientApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

/**
 * Configure which routes the middleware should run on
 */
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*/client/:path*"],
};
