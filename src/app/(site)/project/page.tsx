// 주요 수행 프로젝트 페이지 — Timeline + 카드 (ISR 60s, CMS 갱신 반영)
import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { getProjects } from "@/lib/db";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "수행 프로젝트",
  description:
    "국회 e-의안시스템, 관세청 솔루션 검증, 국회 입안지원 시스템 등 ㈜루다시스템즈의 주요 공공 프로젝트 수행 이력.",
};

export default async function ProjectPage() {
  const projects = await getProjects(true);

  return (
    <>
      <PageHero
        eyebrow="PROJECT"
        title="주요 수행 프로젝트"
        desc="공공 핵심 시스템 구축·검증 경험을 시간순으로 소개합니다."
      />
      <section className="bg-white py-24">
        <div className="container-fixed">
          <ol className="relative border-l-2 border-ink-100 pl-6 md:pl-10">
            {projects.map((p, i) => (
              <li key={p.id} className="mb-10 last:mb-0">
                <span className="absolute -left-[9px] mt-2 h-4 w-4 rounded-full border-2 border-canvas bg-primary" />
                <Reveal delay={i * 0.05}>
                  <Card className="transition hover:shadow-lg">
                    <CardBody>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge>{p.startDate.replace("-", ".")}</Badge>
                        <Badge>{p.durationMonths}개월</Badge>
                        <Badge>{p.client}</Badge>
                      </div>
                      <h2 className="mt-4 text-xl font-bold text-ink-900">
                        {p.name}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500">
                        {p.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-ink-900">
                            수행내용{" "}
                          </span>
                          <span className="text-ink-500">
                            {p.scope.join(", ")}
                          </span>
                        </div>
                      </div>
                      {p.tech.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {p.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded bg-ink-100 px-2 py-0.5 text-xs text-ink-500"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ol>

          <p className="mt-12 text-center text-sm text-ink-500">
            그 외 SNET 강원랜드 유지보수, 삼양데이터시스템 모바일 구축, 인디에프
            통합관리시스템 연계, NIA 인공지능 이미지 인식 등 다수 수행.
          </p>
        </div>
      </section>
    </>
  );
}
