<!-- 검증 구조와 테스트 체크리스트 문서 -->
# tests.md — 검증 구조

| 연관 문서 | [goal.md](./goal.md), [plan.md](./plan.md), [status.md](./status.md) |
|------|------|
| 최종 검증 | 2026-06-25 / 프로덕션 빌드(`npm start`) 기준 |

각 항목은 goal.md의 성공 기준(G#)과 연결된다. 상태: ⬜ 미수행 / ✅ PASS / ❌ FAIL

---

## A. 빌드/정적 검증 (자동)
| ID | 검증 | 방법 | 연관 | 상태 |
|----|------|------|------|------|
| T-BUILD-1 | 타입체크+빌드 무오류 | `npm run build` → 18 routes 생성 | G17 | ✅ |
| T-BUILD-2 | 린트 통과 | `npm run lint` → No warnings/errors | G18 | ✅ |
| T-BUILD-3 | 서버 기동 | `npm start` 후 `/` 200 | G1 | ✅ |

## B. API 스모크 (자동)
| ID | 검증 | 결과 | 연관 | 상태 |
|----|------|------|------|------|
| T-API-1 | 문의 정상 접수 | 200 + id 반환 + 저장 + 메일 로그 | G7 | ✅ |
| T-API-1b | 문의 검증 실패 | 동의 누락 → 400 | G7 | ✅ |
| T-API-1c | honeypot/rate limit | honeypot→200(미저장), 6연속→429 | G7 | ✅ |
| T-API-2 | 프로젝트 목록 | 시드 5건 | G8 | ✅ |
| T-API-2b | 프로젝트 CRUD | POST 201 / PUT 200 / DELETE 200, 복귀 5건 | G8 | ✅ |
| T-API-3 | 뉴스 CRUD | POST 201 / DELETE 200 | G8 | ✅ |
| T-API-4 | 문의 조회/상태 | 무인증 401, 인증 후 목록 / PATCH | G10 | ✅ |
| T-API-auth | CRUD 무인증 차단 | POST /api/projects 무쿠키 → 401 | G10 | ✅ |

## C. 페이지 렌더 (자동 HTML 검증 + 스크린샷)
| ID | 검증 | 결과 | 연관 | 상태 |
|----|------|------|------|------|
| T-PAGE-1 | Main | 200, Hero 카피·CTA 2종·파티클 배경·요약 섹션 렌더 | G1 | ✅ |
| T-PAGE-2 | Company | 200, 개요표·Vision·조직도·대표/조영석 | G2 | ✅ |
| T-PAGE-3 | Business | 200, 4개 카드 + 아이콘 (스크린샷 확인) | G3 | ✅ |
| T-PAGE-4 | Project | 200, Timeline + 시드 5건(국회/관세청/베스티안) | G4 | ✅ |
| T-PAGE-5 | Technology | 200, 6영역 스택 | G5 | ✅ |
| T-PAGE-6 | Contact | 200, 폼 4필드 + 개인정보 동의 | G6 | ✅ |
| T-PAGE-7 | 회사소개서 PDF | `/ruda-systems-company-profile.pdf` 배치, Hero/CTA 링크 | deliv | ✅ |

## D. 관리자 (자동)
| ID | 검증 | 결과 | 연관 | 상태 |
|----|------|------|------|------|
| T-ADMIN-1 | 미인증 차단 | 로그인 폼 노출, API 401 | G10 | ✅ |
| T-ADMIN-2 | 로그인/CRUD | 잘못된 PW 401, 정상 200 쿠키, 프로젝트/뉴스 CRUD | G10 | ✅ |
| T-ADMIN-3 | 문의 상태 변경 | GET 목록 + PATCH status | G10 | ✅ |

## E. 품질/공통
| ID | 검증 | 결과 | 연관 | 상태 |
|----|------|------|------|------|
| T-Q-1 | 반응형 | 390px 모바일: 햄버거 + 1단 스택 (스크린샷) | G11 | ✅ |
| T-Q-2 | SEO | 페이지별 title/OG, sitemap.xml/robots.txt 200, JSON-LD Organization | G12 | ✅ |
| T-Q-3 | 디자인 토큰 | 네이비/시안 팔레트·Pretendard 적용 (스크린샷) | G13 | ✅ |
| T-Q-4 | 모션 | Reveal 스크롤 진입 동작 + `prefers-reduced-motion` 분기 코드 | G14 | ✅ |
| T-Q-5 | 접근성 | 시맨틱(header/main/section), alt, aria-label, 키보드 포커스 링 | G15 | ✅ |
| T-Q-6 | 보안 헤더 | CSP/HSTS/X-Frame-Options/X-Content-Type 응답 확인 | G16 | ✅ |

---

## 실행 기록 (로그)
- 2026-06-25 `npm run build`: ✓ Compiled, 18 routes 정적/동적 생성.
- 2026-06-25 `npm run lint`: ✔ No ESLint warnings or errors.
- 2026-06-25 API 스모크(`npm start` :3100/3101): 위 B/D 표 전부 기대값 일치.
- 2026-06-25 페이지 200 확인: / company business project technology contact admin sitemap.xml robots.txt.
- 2026-06-25 스크린샷: 메인 Hero(로고/파티클/CTA), Business 카드, 모바일 390px 검증. 헤더 로고 invert 버그 수정 후 정상.
