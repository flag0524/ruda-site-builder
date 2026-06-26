<!-- 작업 진행 상태를 추적하는 문서 -->
# status.md — 진행 상태

| 연관 문서 | [goal.md](./goal.md), [plan.md](./plan.md), [tests.md](./tests.md) |
|------|------|
| 최종 갱신 | 2026-06-25 |
| 현재 상태 | ✅ 전 Phase 완료 — 빌드/린트/검증 통과 |

---

## Phase 진행 현황

| Phase | 내용 | 상태 |
|-------|------|------|
| 0 | 문서 체계 | ✅ 완료 |
| 1 | 스캐폴드 (Next.js 14, 토큰, 폰트, 보안헤더) | ✅ 완료 |
| 2 | 레이아웃·디자인 시스템 (Header/Footer/UI/모션) | ✅ 완료 |
| 3 | 데이터 레이어 (파일 DB·시드·검증·메일·rate limit) | ✅ 완료 |
| 4 | API Route Handlers (contact/projects/news/inquiries/auth) | ✅ 완료 |
| 5 | 페이지 6종 (Main/Company/Business/Project/Technology/Contact) | ✅ 완료 |
| 6 | 관리자(CMS) — 로그인 + 프로젝트/뉴스/문의 관리 | ✅ 완료 |
| 7 | SEO/메타/sitemap/robots/JSON-LD/PDF | ✅ 완료 |
| 8 | QA·검증·문서화 | ✅ 완료 |

## 성공 기준 체크 (goal.md §3)
G1~G19: **전부 ✅** — 상세 검증은 [tests.md](./tests.md) 참조.

## 의사결정 로그
- 2026-06-25 D1: 프레임워크 = Next.js 14 App Router (사용자 승인)
- 2026-06-25 D2: 백엔드 = 풀스택 + 목 백엔드 (사용자 승인)
- 2026-06-25 폴더명이 한글이라 create-next-app 직접 생성 불가 → 임시 폴더 생성 후 루트 이동.
- 2026-06-25 지도: CSP 단순화를 위해 임베드 대신 외부 네이버지도 링크.
- 2026-06-25 전화번호: 참고 자료 원문값(`07-1204-8027`) 유지(임의 보정 금지).

## 검증 결과 요약
- `npm run build` ✅ / `npm run lint` ✅ / API 스모크 ✅ / 페이지 200 ✅ / 반응형·SEO·보안헤더 ✅
- 수정한 이슈: 헤더 로고 `brightness-0 invert` 로 인한 흰 박스 → 필터 제거로 해결. honeypot 스키마가 봇 입력을 400으로 막던 문제 → 라우트에서 silent-accept 하도록 수정.

## 디자인 리뉴얼 v3 — Mistral 컨셉 (2026-06-25)
- 사용자 제공 Mistral DESIGN.md 컨셉으로 전체 재구성. 다크/모노 → **라이트·크림·에디토리얼**.
- 토큰: 오렌지 primary(#F2540B)+선셋 팔레트, 크림 서피스, ink/slate/steel 텍스트. 버튼 8px·카드 12px.
- 폰트: 디스플레이 **Fraunces**(PP Editorial Old 대체) + Inter + Pretendard(한글). 코드 목업은 mono.
- 시그니처: 모든 페이지 하단 **선셋 스트라이프 밴드**([SunsetStripe](src/components/layout/SunsetStripe.tsx))를 (site) 레이아웃에 삽입.
- 홈: 선셋 히어로(좌 에디토리얼 헤드라인 + 우 CSS 선셋하늘/산 SVG) → 로고월 → 스탯(세리프) → 사업영역(크림 카드) → 기술 다크 코드목업 → 프로젝트 → 뉴스 → 크림 CTA.
- 로고: 흰 글자+다크배경 PNG를 sharp로 **투명배경 흑/백 변형**(`ruda-logo-dark.png`/`ruda-logo-white.png`) 생성 → 배경색에 맞춰 라이트 서피스엔 다크 로고 사용. ([scripts/make-logo-variants.mjs](scripts/make-logo-variants.mjs))
- 진입 애니메이션: framer-motion `whileInView` 의존(정적 캡처/저속 환경에서 콘텐츠 미표시 위험) → **CSS 키프레임 기반**으로 교체해 항상 최종 가시 + reduced-motion 대응.
- 결정(미응답 시 권장값 적용): 디스플레이=Fraunces, 히어로 비주얼=CSS 선셋 그라데이션.
- 빌드/린트 통과, 데스크톱·모바일·서브페이지 스크린샷 검증 완료.

## 디자인 리뉴얼 v2 — 다크/모노 테크 (2026-06-25, 이후 v3로 대체됨)
- 첨부 레퍼런스 이미지 기준으로 홈/헤더/푸터를 **다크 + 모노스페이스(Space Mono) + 틸 액센트** 테크 스타일로 재구성.
- 추가 컴포넌트: `HeroAngled`(사선 클립 히어로), `TechVisual`(사진 대체 추상 SVG 비주얼 6종), `FeatureSplit`(교차 분할 패널).
- 홈 구성: 히어로 → ABOUT US → 비대칭 이미지 모자이크(틸 인용 블록) → ADVANCED TECHNOLOGY 3컬럼 → 교차 피처 패널 3종 → LATEST NEWS → 테크 푸터.
- 사진은 라이선스/CSP 안전을 위해 추상 SVG/그라데이션 비주얼로 대체(실사진 교체는 요청 시).
- 빌드/린트 통과, 데스크톱·모바일 스크린샷으로 렌더 확인.

## 남은 작업 / 후속(범위 외)
- 실 DB/메일/CMS/배포 연동: [deploy-guide.md](./deploy-guide.md) §4 가이드 제공(목표 범위 밖).
