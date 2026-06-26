// 메인 페이지 — Mistral 컨셉 (선셋 히어로·로고월·스탯·사업영역·기술쇼케이스·프로젝트·CTA)
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HeroSunset } from "@/components/sections/HeroSunset";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { BUSINESS_AREAS, TECH_STACK, SITE } from "@/lib/site";
import { getProjects, getNews } from "@/lib/db";

export const revalidate = 60;

const CLIENTS = [
  "베스티안소프트",
  "㈜클라우디아",
  "㈜이노그루",
  "NIA 한국지능정보사회진흥원",
  "SNET",
  "삼양데이터시스템",
];

const STATS = [
  { n: "2021", l: "설립 연도" },
  { n: "5+", l: "공공 핵심 프로젝트" },
  { n: "6", l: "기술 영역" },
  { n: "100%", l: "독립적 사고" },
];

export default async function HomePage() {
  const projects = (await getProjects(true)).slice(0, 3);
  const news = (await getNews()).slice(0, 3);

  return (
    <>
      <HeroSunset />

      {/* 고객/레퍼런스 로고월 */}
      <section className="border-y border-hairline-soft bg-surface py-10">
        <div className="container-fixed">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.1em] text-steel">
            공공·기업 고객과 함께한 프로젝트
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {CLIENTS.map((c) => (
              <span key={c} className="text-sm font-medium text-steel">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 스탯 */}
      <section className="bg-canvas py-20">
        <div className="container-fixed grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08} className="text-center">
              <p className="font-display text-5xl font-normal text-ink-900 md:text-6xl">
                {s.n}
              </p>
              <p className="mt-2 text-sm text-slate">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 사업영역 — 크림 피처 카드 */}
      <section className="bg-cream-soft py-24">
        <div className="container-fixed">
          <SectionTitle
            eyebrow="Business"
            title="핵심 사업영역"
            desc="SI 개발부터 솔루션·UI/UX·R&D까지, 기업의 디지털 전환을 끝까지 책임집니다."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {BUSINESS_AREAS.map((area, i) => (
              <Reveal key={area.title} delay={i * 0.08}>
                <div className="h-full rounded-lg border border-beige-deep bg-cream p-7 transition-colors duration-200 hover:bg-cream-deeper">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10">
                    <Icon name={area.icon} className="h-6 w-6 text-primary" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink-900">
                    {area.title}
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate">
                    {area.items.map((it) => (
                      <li key={it}>· {it}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 기술역량 쇼케이스 — 다크 코드 목업 */}
      <section className="bg-canvas py-24">
        <div className="container-fixed grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Technology"
              title="검증된 기술 스택"
              align="left"
              desc="Frontend부터 Cloud, 시스템 연계까지 — 안정적이고 확장 가능한 시스템을 구축합니다."
            />
            <ButtonLink href="/technology" variant="ghost">
              기술역량 살펴보기 <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-lg bg-surface-code shadow-mockup">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="h-2.5 w-2.5 rounded-full bg-sunshine-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-saturated" />
                <span className="ml-3 text-xs text-white/40">ruda — stack</span>
              </div>
              <div className="space-y-3 p-6 font-mono text-sm">
                {TECH_STACK.map((g) => (
                  <div key={g.group} className="flex flex-wrap gap-x-3">
                    <span className="w-44 shrink-0 text-sunshine-300">
                      {g.group}
                    </span>
                    <span className="text-white/70">
                      {g.items.join("  ·  ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 대표 프로젝트 */}
      <section className="bg-cream-soft py-24">
        <div className="container-fixed">
          <SectionTitle
            eyebrow="Project"
            title="대표 수행 프로젝트"
            desc="국회·관세청 등 공공 핵심 시스템 구축 경험을 보유하고 있습니다."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <Card className="h-full">
                  <CardBody>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{p.startDate.replace("-", ".")}</Badge>
                      <Badge>{p.client}</Badge>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-ink-900">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">
                      {p.summary}
                    </p>
                  </CardBody>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/project" variant="ghost">
              전체 프로젝트 보기 <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 최신 소식 */}
      {news.length > 0 && (
        <section className="bg-canvas py-24">
          <div className="container-fixed">
            <SectionTitle eyebrow="Newsroom" title="최신 소식" />
            <div className="grid gap-5 md:grid-cols-2">
              {news.map((n, i) => (
                <Reveal key={n.id} delay={i * 0.08}>
                  <Link
                    href="/project"
                    className="group flex h-full flex-col rounded-lg border border-hairline-soft p-6 transition-colors duration-200 hover:border-primary"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                      Notice
                    </span>
                    <h3 className="mt-4 truncate text-base font-semibold text-ink-900 group-hover:text-primary">
                      {n.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate">
                      {n.body}
                    </p>
                    <div className="mt-6 flex items-center justify-between text-xs text-steel">
                      <span>{n.publishedAt}</span>
                      <ArrowUpRight className="h-4 w-4 text-primary" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA 크림 배너 */}
      <section className="bg-canvas pb-24">
        <div className="container-fixed">
          <div className="rounded-2xl bg-cream px-8 py-16 text-center md:py-20">
            <h2 className="font-display text-3xl font-normal tracking-tight text-ink-900 md:text-5xl">
              다음 IT 혁신의 시작을 함께합니다.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate">
              사업 문의를 남겨주시면 담당자가 빠르게 연락드립니다.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact" variant="primary" size="lg">
                사업문의 하기 <ArrowRight className="h-5 w-5" />
              </ButtonLink>
              <ButtonLink href={SITE.profilePdf} variant="accent" size="lg">
                회사소개서 다운로드
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
