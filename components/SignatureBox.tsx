"use client";

import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

export default function SignatureBox({ onChange }: { onChange: (dataUrl: string) => void }) {
  const sigRef = useRef<SignatureCanvas | null>(null);

  const clear = () => {
    sigRef.current?.clear();
    onChange("");
  };

  const save = () => {
    if (!sigRef.current || sigRef.current.isEmpty()) {
      onChange("");
      return;
    }
    onChange(sigRef.current.getTrimmedCanvas().toDataURL("image/png"));
  };

  return (
    <div>
      <div className="border rounded-xl bg-white overflow-hidden">
        <SignatureCanvas
          ref={sigRef}
          canvasProps={{ className: "w-full h-48" }}
          onEnd={save}
        />
      </div>
      <div className="flex gap-2 mt-2">
        <button type="button" onClick={clear} className="px-3 py-2 rounded-lg bg-gray-100">
          서명 지우기
        </button>
      </div>
    </div>
  );
}
