"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import SignatureBox from "@/components/SignatureBox";
import { saveContract } from "@/lib/storage";
import { ContractData } from "@/types/contract";

export default function ContractPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    contractType: "연주자" as "연주자" | "사회자",
    name: "",
    phone: "",
    eventDate: "",
    eventTime: "",
    eventPlace: "",
    roleDetail: "",
    fee: "",
    bankInfo: "",
    memo: "",
    agree: false,
    signature: "",
  });

  const update = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.eventDate || !form.agree || !form.signature) {
      alert("이름, 연락처, 행사일, 동의 체크, 서명은 필수입니다.");
      return;
    }

    const data: ContractData = {
      id: uuidv4(),
      ...form,
      submittedAt: new Date().toLocaleString("ko-KR"),
    };

    saveContract(data);
    router.push(`/contract/complete?id=${data.id}`);
  };

  return (
    <main className="min-h-screen p-5">
      <form onSubmit={submit} className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-bold">이너스뮤직 계약서 작성</h1>
          <p className="text-gray-500 mt-1">테스트 버전입니다. 제출 데이터는 현재 브라우저에 임시 저장됩니다.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium">계약 유형</span>
            <select value={form.contractType} onChange={(e) => update("contractType", e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-3">
              <option value="연주자">연주자</option>
              <option value="사회자">사회자</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium">성명 *</span>
            <input value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-3" placeholder="홍길동" />
          </label>

          <label className="block">
            <span className="text-sm font-medium">연락처 *</span>
            <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-3" placeholder="010-0000-0000" />
          </label>

          <label className="block">
            <span className="text-sm font-medium">행사일 *</span>
            <input type="date" value={form.eventDate} onChange={(e) => update("eventDate", e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-3" />
          </label>

          <label className="block">
            <span className="text-sm font-medium">행사 시간</span>
            <input type="time" value={form.eventTime} onChange={(e) => update("eventTime", e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-3" />
          </label>

          <label className="block">
            <span className="text-sm font-medium">계약 금액</span>
            <input value={form.fee} onChange={(e) => update("fee", e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-3" placeholder="300,000원" />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium">행사 장소</span>
          <input value={form.eventPlace} onChange={(e) => update("eventPlace", e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-3" placeholder="웨딩홀/주소" />
        </label>

        <label className="block">
          <span className="text-sm font-medium">역할 상세</span>
          <input value={form.roleDetail} onChange={(e) => update("roleDetail", e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-3" placeholder="예: 4중주 바이올린 / 본식 사회" />
        </label>

        <label className="block">
          <span className="text-sm font-medium">입금 계좌</span>
          <input value={form.bankInfo} onChange={(e) => update("bankInfo", e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-3" placeholder="은행 / 계좌번호 / 예금주" />
        </label>

        <label className="block">
          <span className="text-sm font-medium">특이사항</span>
          <textarea value={form.memo} onChange={(e) => update("memo", e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-3 h-28" />
        </label>

        <div>
          <span className="text-sm font-medium">서명 *</span>
          <SignatureBox onChange={(dataUrl) => update("signature", dataUrl)} />
        </div>

        <label className="flex gap-3 items-start bg-gray-50 p-4 rounded-xl">
          <input type="checkbox" checked={form.agree} onChange={(e) => update("agree", e.target.checked)} className="mt-1" />
          <span className="text-sm">
            본인은 위 계약 내용을 확인하였으며, 입력 정보와 서명이 본인의 의사에 따른 제출임에 동의합니다.
          </span>
        </label>

        <button className="w-full py-4 rounded-xl bg-black text-white font-semibold">
          계약서 제출하기
        </button>
      </form>
    </main>
  );
}
