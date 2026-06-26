// 문의 접수 API — Zod 검증 + honeypot + rate limit + 저장 + 알림 메일(목)
import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validators";
import { createInquiry } from "@/lib/db";
import { sendInquiryNotification } from "@/lib/mailer";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "잘못된 요청입니다." },
      { status: 400 },
    );
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "입력값을 확인해 주세요.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // honeypot: website 필드가 채워지면 봇으로 간주 (성공인 척 무시)
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { company, manager, contact, message, agreedPrivacy } = parsed.data;
  const inquiry = await createInquiry({
    company,
    manager,
    contact,
    message,
    agreedPrivacy,
  });
  await sendInquiryNotification(inquiry);

  return NextResponse.json({ ok: true, id: inquiry.id });
}
