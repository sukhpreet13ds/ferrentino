import { NextResponse } from "next/server";
import { ADMIN_COOKIE, checkPassword, expectedSessionToken } from "../../../../lib/auth";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { password } = body;

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await expectedSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
