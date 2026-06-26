// 루트 레이아웃 — 폰트, 기본 메타데이터, JSON-LD 조직 정보
import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// PP Editorial Old 대체 — 에디토리얼 세리프 디스플레이
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "㈜루다시스템즈 | IT 솔루션·SI 개발 전문기업",
    template: "%s | 루다시스템즈",
  },
  description:
    "독립적인 사고와 실행력으로 공공·기업 IT 혁신을 선도하는 전문 IT 솔루션 기업. SI 개발, 솔루션, UI/UX, AI/Local LLM.",
  keywords: ["IT 솔루션 기업", "SI 개발 전문기업", "공공 시스템 구축", "웹 시스템 개발"],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE.domain,
    siteName: SITE.name,
    title: "㈜루다시스템즈 | IT 솔루션·SI 개발 전문기업",
    description: SITE.subtitle,
  },
  twitter: { card: "summary_large_image" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: SITE.nameEn,
  url: SITE.domain,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address,
    addressCountry: "KR",
  },
  founder: SITE.ceo,
  foundingDate: "2021-05-20",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-canvas font-sans text-ink-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
