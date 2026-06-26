// 메인 히어로 — 좌측 에디토리얼 헤드라인 + 우측 선셋 하늘/산 비주얼 (Mistral hero-band-sunset)
import { ArrowRight, Download } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { SITE } from "@/lib/site";

export function HeroSunset() {
  return (
    <section className="bg-canvas">
      <div className="container-fixed grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div>
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              RUDA SYSTEMS
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display mt-6 text-5xl font-normal leading-[1.06] tracking-tight text-ink-900 md:text-7xl">
              Think and act,
              <br />
              <span className="italic">independently.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-slate">
              독립적인 사고와 첨단 기술로 공공·기업의 디지털 혁신을 함께
              만들어 갑니다.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="accent" size="lg">
                사업문의 하기
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href={SITE.profilePdf} variant="cream" size="lg">
                <Download className="h-5 w-5" />
                회사소개서 다운로드
              </ButtonLink>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <SunsetPanel />
        </FadeIn>
      </div>
    </section>
  );
}

function SunsetPanel() {
  return (
    <div className="bg-sunset-sky relative h-72 overflow-hidden rounded-xl shadow-mockup md:h-[440px]">
      {/* 태양 */}
      <div className="absolute left-1/2 top-1/3 h-24 w-24 -translate-x-1/2 rounded-full bg-yellow-saturated/90 blur-[2px]" />
      {/* 산 실루엣 */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 600 220"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 160 L120 90 L230 150 L340 70 L460 140 L600 80 L600 220 L0 220 Z" fill="#9A3412" opacity="0.85" />
        <path d="M0 190 L100 140 L210 185 L330 120 L450 180 L560 130 L600 150 L600 220 L0 220 Z" fill="#7C2D12" />
      </svg>
    </div>
  );
}
