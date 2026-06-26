// 문의 알림 메일 발송 (목 구현: 콘솔/파일 로그, 실 연동은 RESEND_API_KEY 가이드 참조)
import { promises as fs } from "fs";
import path from "path";
import type { Inquiry } from "@/types";

const LOG_FILE = path.join(process.cwd(), ".data", "mail.log");

export async function sendInquiryNotification(inquiry: Inquiry): Promise<void> {
  const to = process.env.CONTACT_NOTIFY_EMAIL || "admin@rudasystems.com";
  const line = `[${new Date().toISOString()}] → ${to} | 신규 문의: ${inquiry.company} / ${inquiry.manager} / ${inquiry.contact}\n  ${inquiry.message}\n`;

  // 실제 연동 지점: RESEND_API_KEY 존재 시 Resend SDK 호출로 교체.
  console.log("[mailer] 문의 알림\n" + line);
  try {
    await fs.mkdir(path.dirname(LOG_FILE), { recursive: true });
    await fs.appendFile(LOG_FILE, line, "utf-8");
  } catch {
    // 로그 실패는 문의 접수를 막지 않는다.
  }
}
