// 글로벌 푸터 — 크림 서피스 멀티컬럼 (Mistral 컨셉)
import Link from "next/link";
import Image from "next/image";
import { NAV, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-cream-footer">
      <div className="container-fixed grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1.4fr]">
        {/* 브랜드 */}
        <div>
          <Image
            src="/ruda-logo-dark.png"
            alt="RUDA SYSTEMS"
            width={132}
            height={30}
            className="h-7 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate">
            {SITE.subtitle}
          </p>
        </div>

        {/* 내비게이션 */}
        <nav className="flex flex-col gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-primary transition-colors hover:text-primary-deep"
            >
              {item.ko}
            </Link>
          ))}
        </nav>

        {/* 회사 정보 */}
        <dl className="space-y-1.5 text-sm text-slate">
          <Row label="대표이사" value={`${SITE.ceo} · 설립 ${SITE.founded}`} />
          <Row label="사업자등록번호" value={SITE.bizNo} />
          <Row label="주소" value={SITE.address} />
          <Row label="연락처" value={`${SITE.phone} · ${SITE.email}`} />
        </dl>
      </div>

      <div className="border-t border-beige-deep/60">
        <div className="container-fixed py-5 text-xs text-steel">
          © {new Date().getFullYear()} {SITE.name} ({SITE.nameEn}). All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="shrink-0 font-medium text-ink-700">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
