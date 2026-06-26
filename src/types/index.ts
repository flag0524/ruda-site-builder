// 도메인 데이터 모델 타입 정의 (Project, Inquiry, News)

export interface Project {
  id: string;
  name: string;
  client: string;
  startDate: string; // YYYY-MM
  durationMonths: number;
  scope: string[];
  tech: string[];
  summary: string;
  order: number;
  published: boolean;
}

export type InquiryStatus = "new" | "in_progress" | "done";

export interface Inquiry {
  id: string;
  company: string;
  manager: string;
  contact: string;
  message: string;
  agreedPrivacy: boolean;
  status: InquiryStatus;
  createdAt: string;
}

export interface News {
  id: string;
  title: string;
  body: string;
  publishedAt: string; // YYYY-MM-DD
}
