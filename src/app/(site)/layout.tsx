// 공개 사이트 레이아웃 — 헤더 + 본문 + 선셋 스트라이프 + 푸터
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SunsetStripe } from "@/components/layout/SunsetStripe";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <SunsetStripe />
      <Footer />
    </>
  );
}
