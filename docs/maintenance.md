<!-- 유지보수 가이드 -->
# 유지보수 문서 (Maintenance)

| 연관 문서 | [TRD.md](./TRD.md) §15, [deploy-guide.md](./deploy-guide.md) |
|------|------|

## 1. 콘텐츠 운영
- 프로젝트·뉴스·문의는 `/admin`에서 관리한다. (기본 비밀번호 `ruda-admin`, 운영 시 `ADMIN_PASSWORD` 변경 필수)
- 회사 정보(주소/연락처/사업영역/비전/조직/기술)는 코드 상수 `src/lib/site.ts` 한 곳에서 관리한다.

## 2. 코드 구조 요약
```
src/
├─ app/
│  ├─ (site)/        # 공개 페이지 (헤더/푸터 포함 레이아웃)
│  │  ├─ page.tsx    # 메인
│  │  └─ company|business|project|technology|contact/
│  ├─ admin/         # 관리자 (단독 레이아웃)
│  ├─ api/           # contact, projects, news, inquiries, admin/login
│  ├─ sitemap.ts / robots.ts
│  └─ layout.tsx     # 폰트·메타·JSON-LD
├─ components/  layout / sections / ui / motion / admin
├─ lib/         site, db, validators, mailer, rate-limit, auth, utils
└─ types/
```

## 3. 정기 점검 (TRD §15)
- 분기별 `npm outdated` → 의존성 점검, Next.js 메이저 업그레이드 검토
- 모니터링: Vercel Analytics + 에러 로깅(Sentry 권장)
- 백업: 실 DB 전환 시 일 1회 자동 백업, 소스는 Git 관리

## 4. 품질 기준 재검증
변경 후에는 항상 다음을 수행한다.
```bash
npm run lint && npm run build
```
그리고 [tests.md](./tests.md)의 해당 항목을 재확인한다.

## 5. 알려진 제약 (현재 목 구현)
- `.data/` 파일 DB는 휘발성 — 프로덕션 영속화는 [deploy-guide.md](./deploy-guide.md) §4 참조.
- 지도는 임베드 대신 외부 지도 링크 사용 (CSP 단순화). 임베드 필요 시 `next.config.mjs` CSP의 `frame-src` 허용 추가.
- 다국어/실시간 채팅 등은 PRD Non-Goal.
