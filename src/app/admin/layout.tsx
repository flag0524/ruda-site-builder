// 관리자 영역 레이아웃 — 공개 헤더/푸터 없이 단독 구성
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "관리자",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-ink-100/40">{children}</div>;
}
