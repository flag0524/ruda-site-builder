// 기술역량 페이지 — 6개 영역 기술 스택 그리드
import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { TECH_STACK } from "@/lib/site";

export const metadata: Metadata = {
  title: "기술역량",
  description:
    "Frontend, Backend, Database, Cloud, System Integration, UI/UX — ㈜루다시스템즈의 검증된 기술 스택.",
};

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="TECHNOLOGY"
        title="기술역량"
        desc="6개 영역의 검증된 기술 스택으로 안정적인 시스템을 구축합니다."
      />
      <section className="bg-white py-24">
        <div className="container-fixed grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_STACK.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.06}>
              <Card className="h-full">
                <CardBody>
                  <h2 className="text-lg font-bold text-primary">{g.group}</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
