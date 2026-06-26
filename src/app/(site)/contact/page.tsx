// 문의 페이지 — 회사정보/위치 + 문의 폼
import type { Metadata } from "next";
import { Phone, Mail, MapPin, Building2, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Card, CardBody } from "@/components/ui/Card";
import { ContactForm } from "@/components/sections/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "문의",
  description: "㈜루다시스템즈 사업 문의 및 연락처. 위치, 이메일, 전화번호 안내.",
};

const mapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(SITE.address)}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="문의"
        desc="프로젝트 협업·사업 문의를 남겨주시면 빠르게 연락드립니다."
      />
      <section className="bg-white py-24">
        <div className="container-fixed grid gap-12 lg:grid-cols-2">
          {/* 회사 정보 */}
          <div>
            <h2 className="text-2xl font-bold text-ink-900">연락처 정보</h2>
            <ul className="mt-6 space-y-5">
              <InfoItem icon={<MapPin className="h-5 w-5" />} label="주소">
                {SITE.address}
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  지도에서 보기 <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </InfoItem>
              <InfoItem icon={<Phone className="h-5 w-5" />} label="전화">
                {SITE.phone}
              </InfoItem>
              <InfoItem icon={<Mail className="h-5 w-5" />} label="이메일">
                <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                  {SITE.email}
                </a>
              </InfoItem>
              <InfoItem icon={<Building2 className="h-5 w-5" />} label="사업자등록번호">
                {SITE.bizNo}
              </InfoItem>
            </ul>
          </div>

          {/* 문의 폼 */}
          <Card>
            <CardBody>
              <h2 className="mb-6 text-2xl font-bold text-ink-900">사업 문의</h2>
              <ContactForm />
            </CardBody>
          </Card>
        </div>
      </section>
    </>
  );
}

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        {icon}
      </span>
      <div>
        <p className="text-sm font-bold text-primary">{label}</p>
        <div className="mt-0.5 text-ink-900">{children}</div>
      </div>
    </li>
  );
}
