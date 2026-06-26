// 관리자 간이 인증 (쿠키 세션 + 환경변수 비밀번호)
import { cookies } from "next/headers";

const COOKIE = "ruda_admin";

function expectedToken(): string {
  const pw = process.env.ADMIN_PASSWORD || "ruda-admin";
  // 단순 토큰: 비밀번호 자체를 세션 토큰으로 사용 (목 구현)
  return Buffer.from(pw).toString("base64");
}

export function checkPassword(pw: string): boolean {
  return pw === (process.env.ADMIN_PASSWORD || "ruda-admin");
}

export function sessionToken(): string {
  return expectedToken();
}

export function cookieName(): string {
  return COOKIE;
}

export function isAuthed(): boolean {
  const token = cookies().get(COOKIE)?.value;
  return !!token && token === expectedToken();
}
