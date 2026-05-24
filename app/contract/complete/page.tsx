"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getContract } from "@/lib/storage";
import { downloadContractPdf } from "@/lib/pdf";

export default function CompletePage() {
  const params = useSearchParams();
  const id = params.get("id") || "";
  const data = getContract(id);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow p-8">
          <p>계약서 데이터를 찾을 수 없습니다.</p>
          <Link href="/contract" className="underline">다시 작성하기</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-3">제출 완료</h1>
        <p className="text-gray-600 mb-6">
          계약서가 제출되었습니다. 아래 버튼으로 PDF를 다운로드할 수 있습니다.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm space-y-1">
          <p>제출자: {data.name}</p>
          <p>유형: {data.contractType}</p>
          <p>행사일: {data.eventDate}</p>
          <p>제출시간: {data.submittedAt}</p>
        </div>

        <button onClick={() => downloadContractPdf(data)} className="w-full py-4 rounded-xl bg-black text-white font-semibold">
          PDF 다운로드
        </button>

        <div className="flex justify-between mt-5 text-sm">
          <Link href="/contract" className="underline">새 계약서 작성</Link>
          <Link href="/admin" className="underline">관리자 확인</Link>
        </div>
      </div>
    </main>
  );
}
