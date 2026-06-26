// 입력 검증 Zod 스키마 모음
import { z } from "zod";

export const inquirySchema = z.object({
  company: z.string().min(1, "회사명을 입력해 주세요.").max(100),
  manager: z.string().min(1, "담당자명을 입력해 주세요.").max(50),
  contact: z.string().min(1, "연락처 또는 이메일을 입력해 주세요.").max(100),
  message: z.string().min(5, "문의내용을 5자 이상 입력해 주세요.").max(2000),
  agreedPrivacy: z
    .boolean()
    .refine((v) => v === true, "개인정보 수집·이용에 동의해 주세요."),
  // 스팸 봇 유인용 honeypot (사람은 비워둠; 값이 있으면 라우트에서 봇으로 처리)
  website: z.string().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const projectSchema = z.object({
  name: z.string().min(1),
  client: z.string().min(1),
  startDate: z.string().regex(/^\d{4}-\d{2}$/, "YYYY-MM 형식"),
  durationMonths: z.coerce.number().int().min(1),
  scope: z.array(z.string()).default([]),
  tech: z.array(z.string()).default([]),
  summary: z.string().default(""),
  order: z.coerce.number().int().default(99),
  published: z.boolean().default(true),
});

export const newsSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD 형식"),
});
