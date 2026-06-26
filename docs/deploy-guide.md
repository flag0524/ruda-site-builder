<!-- Vercel 배포 및 실 백엔드 연동 가이드 -->
# 배포 가이드 (Deploy Guide)

| 연관 문서 | [TRD.md](./TRD.md) §13–14, [goal.md](./goal.md) |
|------|------|

## 1. 로컬 실행
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드
npm start        # 빌드 결과 서빙
```

## 2. 환경 변수
`.env.example`를 `.env.local`로 복사 후 채운다.

| 변수 | 용도 | 현재 상태 |
|------|------|-----------|
| `ADMIN_PASSWORD` | 관리자 로그인 비밀번호 | 미설정 시 `ruda-admin` |
| `CONTACT_NOTIFY_EMAIL` | 문의 알림 수신 메일(목 로그 표기) | 선택 |
| `DATABASE_URL` 등 | 실 DB/CMS/메일 연동 | 목 구현(미사용) |

## 3. Vercel 배포 (TRD §13)
1. GitHub 저장소 연결 → Vercel 프로젝트 import
2. Environment Variables에 위 변수 등록 (`ADMIN_PASSWORD` 필수 변경 권장)
3. `main` push → 프로덕션 자동 배포, PR → 프리뷰 배포
4. 커스텀 도메인 `www.rudasystems.com` 연결 + DNS(A/CNAME)
5. Analytics·Speed Insights 활성화

> 주의: 현재 문의/프로젝트/뉴스는 **파일 기반 목 DB(`.data/`)** 에 저장된다. Vercel의 서버리스 파일시스템은 휘발성이므로, 프로덕션에서는 아래 4절의 실 연동이 필요하다.

## 4. 목(mock) → 실 백엔드 전환 지점
TRD가 명시한 실 스택으로 바꿀 때 수정할 파일은 다음과 같다. 인터페이스는 그대로 두고 구현만 교체하면 페이지/API는 변경 불필요.

| 대상 | 파일 | 전환 내용 |
|------|------|-----------|
| 데이터 저장 | `src/lib/db.ts` | 파일 JSON → Postgres(Prisma/Drizzle) 또는 Headless CMS(Sanity) 클라이언트 |
| 메일 발송 | `src/lib/mailer.ts` | 콘솔 로그 → Resend SDK (`RESEND_API_KEY`) |
| 관리자 인증 | `src/lib/auth.ts` | 쿠키 비밀번호 → NextAuth(Credentials) 세션 |
| Rate limit | `src/lib/rate-limit.ts` | 인메모리 → Upstash Redis 등 분산 저장소 |

## 5. ISR / 콘텐츠 갱신
- `/`, `/project`는 `revalidate = 60`. CMS/DB에서 프로젝트 변경 후 최대 60초 내 반영.
- 즉시 반영이 필요하면 `revalidatePath('/project')`를 관리자 저장 시 호출하도록 확장.
