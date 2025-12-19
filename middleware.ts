import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

// Routes that require authentication
const protectedRoutes = {
  organizer: ["/organizer"],
  admin: ["/admin"],
};

// Public auth routes (unified)
const authRoutes = ["/auth"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's a protected route
  const isOrganizerRoute = pathname.startsWith("/organizer");
  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Get session from cookie
  const sessionCookie = request.cookies.get("session")?.value;
  let session = null;
  
  if (sessionCookie) {
    session = await decrypt(sessionCookie);
  }

  // Redirect to unified login if accessing protected route without session
  if (isOrganizerRoute && (!session || session.role !== "organizer")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAdminRoute && (!session || session.role !== "admin")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect to dashboard if accessing auth routes while logged in
  if (isAuthRoute && session) {
    // Don't redirect from pending-approval or verify-email pages
    if (
      pathname.startsWith("/auth/pending-approval") ||
      pathname.startsWith("/auth/verify-email")
    ) {
      return NextResponse.next();
    }

    if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) {
      if (session.role === "organizer") {
        return NextResponse.redirect(new URL("/organizer/dashboard", request.url));
      }
      if (session.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      }
    }
  }

  // Check account status for organizer routes
  if (isOrganizerRoute && session && session.status === "pending") {
    return NextResponse.redirect(new URL("/auth/pending-approval", request.url));
  }

  if (isOrganizerRoute && session && session.status === "suspended") {
    return NextResponse.redirect(new URL("/auth/login?error=suspended", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/organizer/:path*",
    "/admin/:path*",
    "/auth/:path*",
  ],
};

