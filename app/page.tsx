import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-3">계약서 테스트 프로그램</h1>
        <p className="text-gray-600 mb-6">
          연주자/사회자가 링크로 접속해 계약 정보를 작성하고 서명 후 PDF를 다운로드하는 MVP입니다.
        </p>
        <div className="flex gap-3">
          <Link className="px-5 py-3 rounded-xl bg-black text-white" href="/contract">
            계약서 작성
          </Link>
          <Link className="px-5 py-3 rounded-xl bg-gray-100" href="/admin">
            관리자 확인
          </Link>
        </div>
      </div>
    </main>
  );
}
