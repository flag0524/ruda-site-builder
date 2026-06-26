// 프로젝트 목록 조회(공개) + 생성(관리자)
import { NextRequest, NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/db";
import { projectSchema } from "@/lib/validators";
import { isAuthed } from "@/lib/auth";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json({ ok: true, projects });
}

export async function POST(req: NextRequest) {
  if (!isAuthed()) {
    return NextResponse.json({ ok: false, error: "인증 필요" }, { status: 401 });
  }
  const parsed = projectSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const project = await createProject(parsed.data);
  return NextResponse.json({ ok: true, project }, { status: 201 });
}
