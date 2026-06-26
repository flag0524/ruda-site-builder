// 뉴스 목록 조회(공개) + 생성(관리자)
import { NextRequest, NextResponse } from "next/server";
import { getNews, createNews } from "@/lib/db";
import { newsSchema } from "@/lib/validators";
import { isAuthed } from "@/lib/auth";

export async function GET() {
  const news = await getNews();
  return NextResponse.json({ ok: true, news });
}

export async function POST(req: NextRequest) {
  if (!isAuthed())
    return NextResponse.json({ ok: false, error: "인증 필요" }, { status: 401 });
  const parsed = newsSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success)
    return NextResponse.json(
      { ok: false, issues: parsed.error.flatten() },
      { status: 400 },
    );
  const news = await createNews(parsed.data);
  return NextResponse.json({ ok: true, news }, { status: 201 });
}
