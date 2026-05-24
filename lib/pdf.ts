import jsPDF from "jspdf";
import { ContractData } from "@/types/contract";

export function downloadContractPdf(data: ContractData) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(18);
  doc.text("INUS MUSIC CONTRACT", 105, 18, { align: "center" });

  doc.setFontSize(10);
  doc.text("Korean text requires font setup for final production PDF.", 105, 26, { align: "center" });

  let y = 42;
  const line = (label: string, value: string) => {
    doc.setFontSize(11);
    doc.text(`${label}: ${value || "-"}`, 20, y);
    y += 9;
  };

  line("Contract Type", data.contractType);
  line("Name", data.name);
  line("Phone", data.phone);
  line("Event Date", data.eventDate);
  line("Event Time", data.eventTime);
  line("Event Place", data.eventPlace);
  line("Role Detail", data.roleDetail);
  line("Fee", data.fee);
  line("Bank Info", data.bankInfo);
  line("Memo", data.memo);
  line("Submitted At", data.submittedAt);

  y += 6;
  doc.setFontSize(13);
  doc.text("Agreement", 20, y);
  y += 8;
  doc.setFontSize(10);

  [
    "The contractor confirms that all entered information is true.",
    "The contractor agrees to perform the agreed role at the event.",
    "This test version stores data locally in the browser.",
    "For production use, add DB, OTP, audit log, and Google Drive upload."
  ].forEach((t) => {
    doc.text(`- ${t}`, 24, y);
    y += 7;
  });

  y += 8;
  doc.setFontSize(13);
  doc.text("Signature", 20, y);
  y += 5;

  if (data.signature) {
    doc.addImage(data.signature, "PNG", 20, y, 70, 35);
  }

  doc.setFontSize(10);
  doc.text(`Contract ID: ${data.id}`, 20, 285);

  const safeName = data.name || "contract";
  doc.save(`${data.eventDate || "date"}_${safeName}_${data.contractType}_contract.pdf`);
}
