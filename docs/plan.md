<!-- 목표 달성을 위한 단계별 실행 계획 문서 -->
# plan.md — 실행 계획

| 연관 문서 | [goal.md](./goal.md), [status.md](./status.md), [tests.md](./tests.md) |
|------|------|

각 단계는 `작업 → verify: 검증 방법` 형식. 검증은 [tests.md](./tests.md)와 연결된다.

---

## Phase 0 — 문서 체계 (현재)
- 0.1 goal/plan/status/tests 작성 → verify: docs 폴더에 4파일 존재
- 0.2 의사결정 확정 기록 → verify: goal.md §2 채움

## Phase 1 — 프로젝트 스캐폴드
- 1.1 Next.js 14 + TS + Tailwind + 의존성(`framer-motion`, `lucide-react`, `react-hook-form`, `zod`) 설치 → verify: `package.json` 생성, `npm install` 성공
- 1.2 디렉터리 구조(TRD §3) 생성 → verify: `src/app`, `src/components/{layout,sections,ui,motion}`, `src/lib`, `src/types`, `src/styles` 존재
- 1.3 디자인 토큰(TRD §4) → `tokens.css` + `tailwind.config.ts` theme.extend → verify: 색/폰트/radius 토큰 매핑
- 1.4 폰트(Pretendard+Inter), 전역 스타일 → verify: `layout.tsx`에서 폰트 적용
- 1.5 보안 헤더 + 이미지 설정 `next.config` → verify: 헤더 함수 존재
- **verify(Phase1):** `npm run dev` 기동, 빈 페이지 200

## Phase 2 — 공통 레이아웃 & 디자인 시스템
- 2.1 UI 프리미티브: Button, Card, Badge, Input, Textarea, Checkbox → verify: import 가능
- 2.2 motion 컴포넌트: FadeIn, Reveal (reduced-motion 대응) → verify: prop 동작
- 2.3 layout: Header(스크롤 전환·모바일 메뉴), Footer, Nav → verify: 전 페이지 공통 렌더
- 2.4 SectionTitle 공통 → verify: eyebrow/title/desc 렌더

## Phase 3 — 데이터 레이어 (목 백엔드)
- 3.1 `types/`: Project, Inquiry, News (TRD §6) → verify: 타입 컴파일
- 3.2 `lib/db.ts`: 파일 기반(JSON) CRUD, 시드 데이터(프로젝트 5건·뉴스 샘플) → verify: read/write 동작
- 3.3 `lib/validators.ts`: Zod 스키마(Inquiry 등) → verify: 유효/무효 케이스
- 3.4 `lib/mailer.ts`: 목 메일러(콘솔/파일 로그) → verify: 호출 시 로그
- 3.5 `lib/rate-limit.ts`: IP 기반 간이 rate limit → verify: 초과 시 차단

## Phase 4 — API Route Handlers (TRD §7)
- 4.1 `POST /api/contact` (검증+honeypot+rate limit+저장+메일) → verify: tests T-API-1
- 4.2 `/api/projects` CRUD → verify: T-API-2
- 4.3 `/api/news` CRUD → verify: T-API-3
- 4.4 `/api/inquiries` GET/PATCH → verify: T-API-4

## Phase 5 — 페이지 구현 (PRD §6)
- 5.1 Main (`/`) — Hero+요약 섹션들 → verify: G1
- 5.2 Company (`/company`) → verify: G2
- 5.3 Business (`/business`) → verify: G3
- 5.4 Project (`/project`) — ISR, API 연동 → verify: G4
- 5.5 Technology (`/technology`) → verify: G5
- 5.6 Contact (`/contact`) — RHF+Zod 폼 → verify: G6

## Phase 6 — 관리자(CMS)
- 6.1 `/admin` 간이 인증(env 비밀번호 + 쿠키 세션) → verify: 미인증 차단
- 6.2 프로젝트/뉴스 등록·수정 UI → verify: CRUD 반영
- 6.3 문의 조회/상태 변경 UI → verify: 상태 PATCH 반영

## Phase 7 — SEO / 메타 / 부가
- 7.1 페이지별 Metadata + OG → verify: G12
- 7.2 `sitemap.ts`, `robots.ts` → verify: 경로 200
- 7.3 JSON-LD Organization → verify: 스크립트 존재
- 7.4 회사소개서 PDF를 `public/`에 배치 + 다운로드 링크 → verify: 링크 동작

## Phase 8 — QA / 검증 / 문서화
- 8.1 반응형 점검(3 브레이크포인트) → verify: G11
- 8.2 접근성 점검 → verify: G15
- 8.3 `npm run lint` + `npm run build` → verify: G17,G18
- 8.4 [tests.md](./tests.md) 전 항목 수행 기록 → verify: G19
- 8.5 `deploy-guide.md`, `maintenance.md` 작성 → verify: 파일 존재
- 8.6 status.md 최종 업데이트

---

## 검증 전략
- **자동:** `npm run build`, `npm run lint`, API 스모크(라우트 핸들러 응답)
- **수동:** dev 서버 페이지 육안 + 반응형 + 폼 제출 + 관리자 흐름
- 각 Phase 종료 시 status.md 갱신, 실패 시 해당 Phase 재진입(읽고-고치고-재검증).
