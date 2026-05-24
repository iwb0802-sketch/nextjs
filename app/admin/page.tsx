"use client";

import { useEffect, useState } from "react";
import { getContracts } from "@/lib/storage";
import { ContractData } from "@/types/contract";
import { downloadContractPdf } from "@/lib/pdf";
import Link from "next/link";

export default function AdminPage() {
  const [list, setList] = useState<ContractData[]>([]);

  useEffect(() => {
    setList(getContracts());
  }, []);

  return (
    <main className="min-h-screen p-5">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-start gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold">관리자 제출 목록</h1>
            <p className="text-gray-500 mt-1">현재 테스트 버전은 같은 브라우저 localStorage 기준으로만 보입니다.</p>
          </div>
          <Link href="/contract" className="px-4 py-2 rounded-xl bg-black text-white">작성 페이지</Link>
        </div>

        {list.length === 0 ? (
          <div className="text-gray-500 py-10 text-center">제출된 계약서가 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-t">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="p-3">제출시간</th>
                  <th className="p-3">유형</th>
                  <th className="p-3">성명</th>
                  <th className="p-3">연락처</th>
                  <th className="p-3">행사일</th>
                  <th className="p-3">PDF</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">{item.submittedAt}</td>
                    <td className="p-3">{item.contractType}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.phone}</td>
                    <td className="p-3">{item.eventDate}</td>
                    <td className="p-3">
                      <button onClick={() => downloadContractPdf(item)} className="px-3 py-2 rounded-lg bg-gray-100">
                        다운로드
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-xs text-gray-500">
          다음 단계에서 Supabase DB를 붙이면 다른 기기에서 제출된 것도 관리자 페이지에 표시됩니다.
        </div>
      </div>
    </main>
  );
}
