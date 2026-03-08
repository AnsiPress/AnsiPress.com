import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public paths within the dash subdomain that don't require auth
const PUBLIC_PATHS = ["/login", "/signup", "/forgot-password", "/reset-password", "/verify"];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";
  const pathname = url.pathname;

  // Skip internal paths and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isDash = hostname.startsWith("dash.");

  if (isDash) {
    // Auth guard: check cookie for protected routes
    const isPublicPath = PUBLIC_PATHS.some((p) => pathname.startsWith(p));
    const hasToken = request.cookies.has("access_token");

    if (!hasToken && !isPublicPath) {
      // No cookie + protected route → redirect to login
      const loginUrl = new URL(`${url.protocol}//${hostname}/login`);
      return NextResponse.redirect(loginUrl);
    }

    if (hasToken && pathname === "/login") {
      // Has cookie + on login page → redirect to dashboard
      const dashUrl = new URL(`${url.protocol}//${hostname}/`);
      return NextResponse.redirect(dashUrl);
    }

    // Rewrite dash subdomain to /dash/* internal route
    url.pathname = `/dash${pathname}`;
    return NextResponse.rewrite(url);
  }

  // If someone visits ansipress.com/login (or other auth paths), redirect to dash subdomain
  const AUTH_PATHS = ["/login", "/signup", "/forgot-password", "/reset-password", "/verify/signup"];
  if (AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    const dashHost = hostname.replace(/^(www\.)?/, "dash.");
    const dashUrl = new URL(`${url.protocol}//${dashHost}${pathname}${url.search}`);
    return NextResponse.redirect(dashUrl, 308);
  }

  // Everything else → /www/*
  url.pathname = `/www${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
