import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const authPages = ["/auth/login"];
  const adminRoutes = ["/dashboard"];
  const driverRoutes = ["/driver"];

  const isAuthPage = authPages.includes(pathname);
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isDriverRoute = driverRoutes.some((route) => pathname.startsWith(route));

  // Redirect root
  if (pathname === "/") {
    if (!token) return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (token) {
    try {
      // Decode JWT in Edge Runtime
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const decodedUser = JSON.parse(jsonPayload);
      const role = decodedUser?.role;

      if (isAuthPage) {
        return NextResponse.redirect(
          new URL(role === "DRIVER" ? "/driver/subscription" : "/dashboard", request.url)
        );
      }

      if (role === "DRIVER" && isAdminRoute) {
        return NextResponse.redirect(new URL("/driver/subscription", request.url));
      }

      if (role === "ADMIN" && isDriverRoute) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      // Root redirect for authenticated users
      if (pathname === "/") {
        return NextResponse.redirect(
          new URL(role === "DRIVER" ? "/driver/subscription" : "/dashboard", request.url)
        );
      }
    } catch (e) {
      console.error("Middleware token decode error:", e);
    }
  } else {
    if (isAdminRoute || isDriverRoute) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/driver/:path*", "/auth/login"],
};
