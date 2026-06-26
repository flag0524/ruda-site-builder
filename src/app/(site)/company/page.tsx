// 회사소개 페이지 — 기업개요 + Vision 3대 가치 + 조직도
import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card, CardBody } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { SITE, VISION, ORG } from "@/lib/site";

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "㈜루다시스템즈의 기업개요, 비전, 조직구성을 소개합니다. 독립적 사고와 신뢰 가능한 솔루션.",
};

const OVERVIEW: { label: string; value: string }[] = [
  { label: "회사명", value: `${SITE.name} (${SITE.nameEn})` },
  { label: "대표이사", value: SITE.ceo },
  { label: "설립일", value: SITE.founded },
  { label: "직원수", value: SITE.employees },
  { label: "주소", value: SITE.address },
  { label: "홈페이지", value: "www.rudasystems.com" },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT US"
        title="회사소개"
        desc="독립적인 사고와 실행력으로 공공·기업 IT 혁신을 선도합니다."
      />

      {/* 기업개요 */}
      <section className="bg-white py-24">
        <div className="container-fixed">
          <SectionTitle
            eyebrow="OVERVIEW"
            title="기업개요"
            align="left"
            desc="㈜루다시스템즈는 공공기관 및 민간기업 대상 SI/SM, 솔루션 개발, UI/UX, AI·블록체인·Local LLM 구축을 수행하는 IT 전문 기업입니다."
          />
          <Card>
            <CardBody className="p-0">
              <dl className="divide-y divide-ink-100">
                {OVERVIEW.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-4 sm:gap-4"
                  >
                    <dt className="text-sm font-bold text-primary">
                      {row.label}
                    </dt>
                    <dd className="text-sm text-ink-900 sm:col-span-3">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-ink-100/60 py-24">
        <div className="container-fixed">
          <SectionTitle
            eyebrow="VISION"
            title="Independent Thinking, Smart Technology, Reliable Solution"
            desc="우리가 일하는 방식을 정의하는 3대 가치입니다."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {VISION.map((v, i) => (
              <Reveal key={v.keyword} delay={i * 0.1}>
                <Card className="h-full">
                  <CardBody>
                    <p className="font-display text-3xl font-normal text-primary">0{i + 1}</p>
                    <h3 className="mt-3 text-xl font-bold text-ink-900">
                      {v.keyword}
                    </h3>
                    <p className="text-sm font-semibold text-ink-500">{v.ko}</p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-500">
                      {v.desc}
                    </p>
                  </CardBody>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 조직구성 */}
      <section className="bg-white py-24">
        <div className="container-fixed">
          <SectionTitle eyebrow="ORGANIZATION" title="조직구성" />
          <div className="mx-auto max-w-4xl">
            <div className="mx-auto mb-8 w-48">
              <Card className="border-2 border-primary/30">
                <CardBody className="py-6 text-center">
                  <p className="text-xl font-bold text-ink-900">{ORG.head}</p>
                </CardBody>
              </Card>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {ORG.teams.map((team, i) => (
                <Reveal key={team} delay={i * 0.06}>
                  <Card className="h-full">
                    <CardBody className="py-6 text-center">
                      <p className="text-sm font-semibold text-ink-900">
                        {team}
                      </p>
                    </CardBody>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
