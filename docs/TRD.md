# TRD — ㈜루다시스템즈 기업 홈페이지

**기술요구사항정의서 (Technical Requirements Document)**

| 항목 | 내용 |
|------|------|
| 문서명 | ㈜루다시스템즈 홈페이지 기술 설계서 |
| 버전 | v1.0 |
| 작성일 | 2026-06-25 |
| 관련 문서 | PRD.md |

---

## 1. 기술 스택

| 영역 | 기술 | 비고 |
|------|------|------|
| Framework | **Next.js 14+ (App Router)** | SSG/SSR/ISR, SEO 최적화 |
| Language | TypeScript | 타입 안정성 |
| UI Library | React 18+ | — |
| Styling | **Tailwind CSS** | 디자인 토큰 기반 유틸리티 |
| Animation | **Framer Motion** | 스크롤/진입 모션 |
| Icon | **Lucide React** | 일관된 아이콘셋 |
| Form | React Hook Form + Zod | 검증 |
| 배포 | **Vercel** | Edge Network, 자동 CI |
| 폰트 | Pretendard (KR) + Inter (EN) | next/font 최적화 |

---

## 2. 시스템 아키텍처

```
                ┌──────────────────────────────┐
   사용자  ─▶   │  Vercel Edge (Next.js)       │
                │  - 정적 페이지 (SSG/ISR)      │
                │  - Route Handlers (API)      │
                └───────────────┬──────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
       Headless CMS       Database          Email Service
      (Sanity/Strapi)    (Postgres)        (Resend/SMTP)
       콘텐츠 관리        문의·프로젝트       문의 알림 발송
```

### 2.1 렌더링 전략
| 페이지 | 전략 | 사유 |
|--------|------|------|
| Main, Company, Business, Technology | SSG | 변경 적음, 최고 속도 |
| Project | ISR (revalidate 60s) | CMS에서 갱신 가능 |
| Contact (제출) | Route Handler (서버 액션) | 폼 처리 |
| Admin | CSR + 인증 | 관리자 전용 |

---

## 3. 디렉터리 구조

```
회사홈페이지/
├─ docs/                    # PRD, TRD, 가이드
├─ public/                  # 이미지, og-image, 회사소개서 PDF, robots.txt
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx         # 공통 레이아웃(헤더/푸터/메타)
│  │  ├─ page.tsx           # Main
│  │  ├─ company/page.tsx
│  │  ├─ business/page.tsx
│  │  ├─ project/page.tsx
│  │  ├─ technology/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ admin/             # CMS 관리자
│  │  ├─ api/
│  │  │  ├─ contact/route.ts    # 문의 접수
│  │  │  └─ projects/route.ts   # 프로젝트 CRUD
│  │  ├─ sitemap.ts
│  │  └─ robots.ts
│  ├─ components/
│  │  ├─ layout/   (Header, Footer, Nav, MobileMenu)
│  │  ├─ sections/ (Hero, BusinessCards, ProjectTimeline, TechStack ...)
│  │  ├─ ui/       (Button, Card, Badge, Input, Modal ...)
│  │  └─ motion/   (FadeIn, Reveal, Parallax)
│  ├─ lib/         (cms, db, mailer, validators)
│  ├─ styles/      (globals.css, tokens.css)
│  └─ types/
├─ tailwind.config.ts
├─ next.config.js
└─ package.json
```

---

## 4. 디자인 토큰

```css
:root {
  /* Brand */
  --color-navy-900: #0B1B2B;   /* 최심 배경 */
  --color-navy-800: #111827;   /* 다크 섹션 */
  --color-navy-700: #1F2A37;
  --color-cyan-500: #17B8C4;   /* Accent */
  --color-cyan-400: #22D3EE;   /* Highlight */
  --color-blue-500: #3182F6;   /* Link/Interactive */

  /* Neutral */
  --color-white:    #FFFFFF;
  --color-gray-900: #191F28;   /* 본문 */
  --color-gray-500: #6B7684;   /* 보조 */
  --color-gray-100: #F2F4F6;   /* 밝은 배경 */

  /* Typography */
  --font-sans: "Pretendard", "Inter", sans-serif;
  --text-hero: clamp(2.5rem, 6vw, 5rem);

  /* Radius / Shadow / Spacing */
  --radius-md: 12px;
  --radius-lg: 20px;
  --shadow-card: 0 8px 30px rgba(11,27,43,.08);
  --container: 1200px;
}
```

Tailwind `theme.extend`에 위 토큰을 매핑하여 사용한다.

---

## 5. 컴포넌트 설계

| 컴포넌트 | Props (주요) | 설명 |
|----------|-------------|------|
| `Header` | `transparent?` | 스크롤 시 배경 전환, 모바일 햄버거 |
| `Hero` | `title, subtitle, ctas[]` | 메인 카피 + 배경 그래픽 |
| `SectionTitle` | `eyebrow, title, desc` | 섹션 공통 헤더 |
| `BusinessCard` | `icon, title, items[]` | 사업영역 카드 |
| `OrgChart` | `nodes[]` | CEO 하위 5팀 카드형 조직도 |
| `VisionCard` | `keyword, desc` | 3대 가치 |
| `ProjectCard` | `name, client, period, scope[], tech[]` | 프로젝트 카드 |
| `Timeline` | `items[]` | 연도별 수행 이력 |
| `TechStack` | `groups[]` | 6개 영역 아이콘 그리드 |
| `ContactForm` | — | RHF + Zod 검증 |
| `Footer` | — | 회사정보, 주소, 연락처 |

### 5.1 모션 규칙
- `FadeIn`/`Reveal`: viewport 진입 시 `opacity 0→1`, `y 24→0`, `duration .5s ease-out`
- `prefers-reduced-motion: reduce` 시 모션 비활성화
- Hero 배경은 `<canvas>` 또는 경량 SVG 파티클(성능 우선, lazy)

---

## 6. 데이터 모델

### 6.1 Project
```ts
interface Project {
  id: string;
  name: string;          // 국회 e-의안시스템 차세대 구축
  client: string;        // 베스티안소프트
  startDate: string;     // 2025-09
  durationMonths: number;// 5
  scope: string[];       // ["기획","UI/UX","개발"]
  tech: string[];        // ["Java","Spring","Oracle"]
  summary: string;
  order: number;
  published: boolean;
}
```

### 6.2 Inquiry (문의)
```ts
interface Inquiry {
  id: string;
  company: string;       // 회사명 *
  manager: string;       // 담당자 *
  contact: string;       // 연락처/이메일 *
  message: string;       // 문의내용 *
  agreedPrivacy: boolean;// 개인정보 동의 *
  status: "new" | "in_progress" | "done";
  createdAt: string;
}
```

### 6.3 News
```ts
interface News { id: string; title: string; body: string; publishedAt: string; }
```

---

## 7. API / Route Handler

| 메서드 | 경로 | 기능 | 인증 |
|--------|------|------|------|
| POST | `/api/contact` | 문의 접수 + 이메일 알림 | 공개 (rate limit) |
| GET | `/api/projects` | 프로젝트 목록 | 공개 |
| POST/PUT/DELETE | `/api/projects` | 프로젝트 CRUD | 관리자 |
| POST/PUT/DELETE | `/api/news` | 뉴스 CRUD | 관리자 |
| GET/PATCH | `/api/inquiries` | 문의 조회/상태 변경 | 관리자 |

### 7.1 문의 처리 흐름
`클라이언트 검증(Zod) → POST /api/contact → 서버 검증 → DB 저장 → 관리자 메일 발송 → 200/완료 안내`. 스팸 방지: honeypot 필드 + IP rate limit + 동의 체크 필수.

---

## 8. 관리자(CMS)

권장: **Headless CMS(Sanity 또는 Strapi)** 채택으로 개발 비용 최소화. 자체 구현 시 `/admin` + NextAuth(Credentials) + 역할 기반 접근 제어.

관리 기능: 프로젝트 등록/수정 · 회사소개 수정 · 뉴스 등록 · 문의 관리. 모든 콘텐츠 변경은 ISR revalidate로 즉시 반영.

---

## 9. 반응형 브레이크포인트

| 구분 | 너비 | 레이아웃 |
|------|------|----------|
| Mobile | < 768px | 1단, 햄버거 메뉴, 카드 세로 스택 |
| Tablet | 768–1023px | 2단 그리드 |
| Desktop | ≥ 1024px | 3–4단, 풀 네비게이션 |

지원 브라우저: Chrome, Edge, Safari (최신 2개 버전). 컨테이너 최대 폭 1200px.

---

## 10. SEO / 메타데이터

- Next.js Metadata API로 페이지별 `title`, `description`, Open Graph, Twitter Card 설정
- `app/sitemap.ts`, `app/robots.ts` 자동 생성
- 시맨틱 HTML(`<header><main><section><article>`), 구조화 데이터(JSON-LD `Organization`)
- og-image: 1200×630, 브랜드 메시지 포함
- 타겟 키워드: "IT 솔루션 기업", "SI 개발 전문기업", "공공 시스템 구축", "웹 시스템 개발"

```ts
// 예: app/layout.tsx metadata
export const metadata = {
  title: { default: "㈜루다시스템즈 | IT 솔루션·SI 개발 전문기업",
           template: "%s | 루다시스템즈" },
  description: "독립적인 사고와 실행력으로 공공·기업 IT 혁신을 선도하는 전문 IT 솔루션 기업. SI 개발, 솔루션, UI/UX, AI/Local LLM.",
  openGraph: { type: "website", locale: "ko_KR", url: "https://www.rudasystems.com" },
};
```

---

## 11. 성능 / 품질 목표

| 항목 | 목표 |
|------|------|
| Lighthouse Performance | ≥ 90 (모바일) |
| LCP | < 2.5s |
| CLS | < 0.1 |
| 이미지 | next/image, AVIF/WebP, lazy load |
| 번들 | 코드 스플리팅, 동적 import(모션·차트) |
| 폰트 | next/font, `display: swap` |

---

## 12. 보안

- HTTPS 강제(Vercel 기본), 보안 헤더(CSP, HSTS, X-Frame-Options) via `next.config.js`
- 폼 입력 검증·이스케이프(XSS 방지), CSRF 토큰
- 관리자 인증(NextAuth/세션), 환경변수(.env)로 시크릿 관리
- 개인정보(문의) 암호화 저장 및 보관 기간 정책 명시

---

## 13. 배포 (Vercel)

1. GitHub 저장소 연결 → Vercel 프로젝트 import
2. 환경변수 설정: `DATABASE_URL`, `CMS_TOKEN`, `RESEND_API_KEY`, `NEXTAUTH_SECRET` 등
3. `main` 브랜치 push → 자동 프로덕션 배포, PR → 프리뷰 배포
4. 커스텀 도메인 `www.rudasystems.com` 연결 + DNS(A/CNAME) 설정
5. ISR revalidate, Analytics·Speed Insights 활성화

---

## 14. 환경 변수 (예시)

```
DATABASE_URL=
CMS_API_URL=
CMS_TOKEN=
RESEND_API_KEY=
CONTACT_NOTIFY_EMAIL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

---

## 15. 유지보수

- 콘텐츠(프로젝트·뉴스·소개): CMS에서 비개발자 직접 수정
- 의존성: 분기별 `npm outdated` 점검, Next.js 메이저 업그레이드 검토
- 모니터링: Vercel Analytics + 에러 로깅(Sentry 권장)
- 백업: DB 자동 백업(일 1회), 소스 Git 관리
- 문서: 본 TRD 및 배포 가이드를 변경 시 동기화 갱신
