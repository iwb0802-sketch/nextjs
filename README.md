# 이너스뮤직 계약서 테스트 MVP

연주자/사회자 계약서 작성 → 서명 → 제출 → PDF 다운로드 테스트용 Next.js 프로젝트입니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 접속:

```text
http://localhost:3000
```

## 페이지

```text
/contract  계약서 작성
/contract/complete  제출 완료 + PDF 다운로드
/admin  관리자 제출 목록
```

## 현재 버전 특징

- DB 없음
- 브라우저 localStorage에 임시 저장
- 서명 패드 포함
- PDF 다운로드 가능
- GitHub/Vercel 배포 가능

## 다음 단계

- Supabase DB 연결
- Google Drive 자동 업로드
- 카카오 알림톡/SMS 발송
- 관리자 로그인
- OTP 인증
- 제출 IP/User-Agent 저장
