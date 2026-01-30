import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  // ✅ Public & system routes
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/403") ||
    pathname.startsWith("/404") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||   // ✅ REQUIRED
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // ❌ Not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ["HS256"], // ✅ REQUIRED
    });

    const role = String(payload.role).toUpperCase();

    // 🔒 Admin-only
    if (pathname.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/403", req.url));
    }

    // 🔒 Brand-only
    if (pathname.startsWith("/brand") && role !== "BRAND") {
      return NextResponse.redirect(new URL("/403", req.url));
    }

    // ✅ Dashboard allowed for all logged-in users
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT Verification Error:", err);

    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("auth_token");
    return res;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/brand/:path*", "/dashboard/:path*"],
};
