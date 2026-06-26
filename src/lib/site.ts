// 사이트 전역 상수 (회사 정보, 내비게이션, 사업영역/비전/조직/기술 데이터)

export const SITE = {
  name: "㈜루다시스템즈",
  nameEn: "Ruda Systems Inc.",
  domain: "https://www.rudasystems.com",
  tagline: "Think And Act, In an Independent Way.",
  subtitle:
    "독립적인 사고와 실행력을 기반으로 공공·기업 IT 혁신을 선도하는 전문 IT 솔루션 기업",
  ceo: "조영석",
  founded: "2021년 05월 20일",
  employees: "3명",
  address: "서울시 금천구 가산디지털1로 204, 802호 (가산동, 아이비밸리)",
  phone: "010-7375-5487",
  email: "flag2@rudasystems.com",
  bizNo: "760-81-02467",
  profilePdf: "/루다시스템즈_회사소개서_2025.pdf",
} as const;

export const NAV = [
  { href: "/company", label: "ABOUT US", ko: "회사소개" },
  { href: "/business", label: "BUSINESS", ko: "사업영역" },
  { href: "/project", label: "PROJECT", ko: "수행 프로젝트" },
  { href: "/technology", label: "TECHNOLOGY", ko: "기술역량" },
  { href: "/contact", label: "CONTACT", ko: "문의" },
] as const;

export const BUSINESS_AREAS = [
  {
    icon: "Network",
    title: "SI 개발",
    items: ["시스템 분석/설계", "업무 시스템 구축", "공공기관 정보화 사업"],
  },
  {
    icon: "Boxes",
    title: "솔루션 개발",
    items: ["기업 맞춤형 솔루션", "업무 자동화 시스템", "데이터 기반 서비스"],
  },
  {
    icon: "Palette",
    title: "UI/UX 개발",
    items: ["사용자 중심 서비스 설계", "Web/App 인터페이스 개발"],
  },
  {
    icon: "FlaskConical",
    title: "R&D",
    items: ["신기술 연구", "IT 융합 기술 개발 (AI·블록체인·Local LLM)"],
  },
] as const;

export const VISION = [
  {
    keyword: "Independent Thinking",
    ko: "독립적 사고",
    desc: "관성에 기대지 않고 문제의 본질을 스스로 정의합니다.",
  },
  {
    keyword: "Smart Technology",
    ko: "스마트 기술",
    desc: "AI·클라우드·Local LLM 등 최신 기술로 더 나은 해법을 만듭니다.",
  },
  {
    keyword: "Reliable Solution",
    ko: "신뢰 가능한 솔루션",
    desc: "공공·기업이 안심하고 운영할 수 있는 결과물을 제공합니다.",
  },
] as const;

export const ORG = {
  head: "CEO",
  teams: ["R&D 연구소", "솔루션 개발팀", "SI 개발팀", "UI/UX 개발팀", "경영지원부"],
} as const;

export const TECH_STACK = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { group: "Backend", items: ["Java", "Spring", "Node.js"] },
  { group: "Database", items: ["Oracle", "PostgreSQL", "MySQL"] },
  { group: "Cloud", items: ["AWS", "Vercel", "Docker"] },
  { group: "System Integration", items: ["연계", "이관", "성능/기능 검증"] },
  { group: "UI/UX", items: ["Figma", "Design System", "Accessibility"] },
] as const;
