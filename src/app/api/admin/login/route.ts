// 관리자 로그인/로그아웃 — 쿠키 세션 발급/삭제
import { NextRequest, NextResponse } from "next/server";
import { checkPassword, sessionToken, cookieName } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({}));
  if (!checkPassword(password ?? "")) {
    return NextResponse.json(
      { ok: false, error: "비밀번호가 올바르지 않습니다." },
      { status: 401 },
    );
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName(), sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName(), "", { path: "/", maxAge: 0 });
  return res;
}
