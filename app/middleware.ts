import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user")?.value;
  const parsedUser = userCookie ? JSON.parse(userCookie) : null;
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/auth/login', '/auth/signup'];

  // If user is on a public path and is authenticated, redirect to appropriate dashboard
  if (publicPaths.includes(pathname) && parsedUser) {
    const role = parsedUser.role.toLowerCase();
    if (role === 'admin') {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (role === 'vendor') {
      return NextResponse.redirect(new URL("/vendor/dashboard", request.url));
    }
  }

  // If user is not authenticated and tries to access protected routes
  if (
    !parsedUser &&
    (pathname.startsWith("/admin") || pathname.startsWith("/vendor"))
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (parsedUser) {
    const role = parsedUser.role.toLowerCase();

    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/vendor/dashboard", request.url));
    }

    if (pathname.startsWith("/vendor") && role !== "vendor") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/vendor/:path*',
    '/auth/login',
    '/auth/signup',
  ],
};
