// 문의 목록 조회 (관리자)
import { NextResponse } from "next/server";
import { getInquiries } from "@/lib/db";
import { isAuthed } from "@/lib/auth";

export async function GET() {
  if (!isAuthed())
    return NextResponse.json({ ok: false, error: "인증 필요" }, { status: 401 });
  const inquiries = await getInquiries();
  return NextResponse.json({ ok: true, inquiries });
}
