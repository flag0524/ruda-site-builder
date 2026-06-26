// 프로젝트 수정/삭제 (관리자)
import { NextRequest, NextResponse } from "next/server";
import { updateProject, deleteProject } from "@/lib/db";
import { isAuthed } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!isAuthed())
    return NextResponse.json({ ok: false, error: "인증 필요" }, { status: 401 });
  const patch = await req.json().catch(() => ({}));
  const updated = await updateProject(params.id, patch);
  if (!updated)
    return NextResponse.json({ ok: false, error: "없음" }, { status: 404 });
  return NextResponse.json({ ok: true, project: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!isAuthed())
    return NextResponse.json({ ok: false, error: "인증 필요" }, { status: 401 });
  const ok = await deleteProject(params.id);
  return NextResponse.json({ ok }, { status: ok ? 200 : 404 });
}
