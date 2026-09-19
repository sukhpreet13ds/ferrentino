import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidSessionToken } from "./lib/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isPublicAdminPath =
    pathname === "/admin/login" || pathname === "/api/admin/login";

  if (!isPublicAdminPath) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const valid = await isValidSessionToken(token);

    if (!valid) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
