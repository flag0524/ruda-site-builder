// 문의 상태 변경 (관리자)
import { NextRequest, NextResponse } from "next/server";
import { updateInquiryStatus } from "@/lib/db";
import { isAuthed } from "@/lib/auth";
import type { InquiryStatus } from "@/types";

const VALID: InquiryStatus[] = ["new", "in_progress", "done"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!isAuthed())
    return NextResponse.json({ ok: false, error: "인증 필요" }, { status: 401 });
  const { status } = await req.json().catch(() => ({}));
  if (!VALID.includes(status))
    return NextResponse.json(
      { ok: false, error: "잘못된 상태" },
      { status: 400 },
    );
  const updated = await updateInquiryStatus(params.id, status);
  if (!updated)
    return NextResponse.json({ ok: false, error: "없음" }, { status: 404 });
  return NextResponse.json({ ok: true, inquiry: updated });
}
