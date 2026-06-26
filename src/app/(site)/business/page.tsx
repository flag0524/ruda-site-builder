// 사업영역 페이지 — 4개 영역 카드
import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Card, CardBody } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { BUSINESS_AREAS } from "@/lib/site";

export const metadata: Metadata = {
  title: "사업영역",
  description:
    "SI 개발, 솔루션 개발, UI/UX 개발, R&D — ㈜루다시스템즈의 4대 핵심 사업영역.",
};

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="BUSINESS"
        title="사업영역"
        desc="기업의 디지털 전환을 위한 4대 핵심 영역을 제공합니다."
      />
      <section className="bg-white py-24">
        <div className="container-fixed grid gap-6 md:grid-cols-2">
          {BUSINESS_AREAS.map((area, i) => (
            <Reveal key={area.title} delay={i * 0.08}>
              <Card className="h-full transition hover:shadow-lg">
                <div className="h-1.5 rounded-t-lg bg-gradient-to-r from-primary to-sunshine-500" />
                <CardBody>
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-md bg-primary/10">
                      <Icon name={area.icon} className="h-7 w-7 text-primary" />
                    </span>
                    <h2 className="text-2xl font-bold text-ink-900">
                      {area.title}
                    </h2>
                  </div>
                  <ul className="mt-6 space-y-2 text-ink-500">
                    {area.items.map((it) => (
                      <li key={it} className="flex gap-2">
                        <span className="text-primary">•</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
