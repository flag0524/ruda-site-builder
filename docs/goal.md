<!-- 프로젝트 목표와 성공 기준을 정의하는 문서 -->
# goal.md — ㈜루다시스템즈 홈페이지 구축 목표

| 항목 | 내용 |
|------|------|
| 연관 문서 | [PRD.md](./PRD.md), [TRD.md](./TRD.md), [plan.md](./plan.md), [status.md](./status.md), [tests.md](./tests.md) |
| 최종 수정 | 2026-06-25 |

---

## 1. 한 줄 목표

PRD/TRD를 기준으로 **㈜루다시스템즈 공식 기업 홈페이지**를 Next.js 14(App Router)로 구축하고, 검증 가능한 기준을 모두 충족시킨다.

## 2. 확정된 의사결정 (사용자 승인)

| # | 결정 사항 | 선택 | 근거 |
|---|-----------|------|------|
| D1 | 프레임워크 | **Next.js 14 App Router 신규 구축** | TRD 준수. 동봉 Vite 스캐폴드는 콘텐츠/디자인 참고만. |
| D2 | 백엔드 범위 | **풀스택 + 목(mock) 백엔드** | 로컬 환경에 실 DB/이메일/배포 자격증명 없음. Route Handler·파일 기반 DB·목 메일러·간이 관리자까지 동작 구현, 실 연동은 환경변수 가이드로 제공. |

## 3. 성공 기준 (Definition of Done)

전부 충족되어야 목표 달성으로 간주한다. 각 항목은 [tests.md](./tests.md)에서 검증한다.

### 3.1 페이지/기능 (PRD §6)
- [ ] G1. Main: Hero(메인 카피·서브·CTA 2종·미래형 배경 모션) + 사업영역 요약·프로젝트 하이라이트·기술역량 요약·News·Contact CTA 밴드
- [ ] G2. Company: 기업개요(표) · Vision 3대 가치 · 조직도(CEO+5팀)
- [ ] G3. Business: 4개 영역 카드 (SI/솔루션/UI·UX/R&D)
- [ ] G4. Project: Timeline + 5개 대표 프로젝트 카드 (CMS/ISR로 갱신 가능)
- [ ] G5. Technology: 6개 영역 기술 스택 그리드
- [ ] G6. Contact: 회사정보·지도·문의 폼(회사명·담당자·연락처·문의내용·개인정보 동의) → 검증→저장→알림→완료

### 3.2 백엔드/관리자 (TRD §6–8)
- [ ] G7. `POST /api/contact`: Zod 검증 + honeypot + rate limit + 저장 + (목)메일 알림
- [ ] G8. `GET/POST/PUT/DELETE /api/projects`, `/api/news`, `GET/PATCH /api/inquiries`
- [ ] G9. 파일 기반 목 DB로 프로젝트·뉴스·문의 영속화
- [ ] G10. `/admin`: 간이 인증 + 프로젝트/뉴스 등록·수정, 문의 조회/상태 변경

### 3.3 공통/품질 (PRD §7, TRD §9–12)
- [ ] G11. 반응형 3종 (Mobile <768 / Tablet 768–1023 / Desktop ≥1024)
- [ ] G12. SEO: Metadata API, Open Graph, `sitemap.ts`, `robots.ts`, JSON-LD Organization
- [ ] G13. 디자인 토큰 (TRD §4) Tailwind 매핑, Pretendard+Inter 폰트
- [ ] G14. 모션: Framer Motion reveal + `prefers-reduced-motion` 대응
- [ ] G15. 접근성: 시맨틱 HTML, 키보드 내비, alt 텍스트 (WCAG 2.1 AA 지향)
- [ ] G16. 보안 헤더(CSP/HSTS/X-Frame-Options) via `next.config`

### 3.4 빌드/검증
- [ ] G17. `npm run build` 무오류 통과
- [ ] G18. `npm run lint` 통과
- [ ] G19. [tests.md](./tests.md) 체크리스트 전 항목 PASS

## 4. 범위 제외 (Non-Goals, PRD §2.3 + 환경 제약)
- 다국어(영문) 페이지
- 회원/로그인 커뮤니티, 전자상거래, 실시간 채팅
- 실 DB(Postgres)·실 메일(Resend)·실 CMS(Sanity)·실 Vercel 배포 → **환경변수/연동 가이드 문서로만 제공**
- 실제 도메인/DNS 연결

## 5. 산출물 (PRD §9)
1. Next.js 소스코드 전체
2. 페이지/컴포넌트 설계 (본 docs)
3. 반응형 UI
4. 관리자(CMS) 구조 + 간이 구현
5. 배포 가이드 (`docs/deploy-guide.md`)
6. 유지보수 문서 (`docs/maintenance.md`)
