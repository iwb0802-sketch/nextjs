export type ContractData = {
  id: string;
  contractType: "연주자" | "사회자";
  name: string;
  phone: string;
  eventDate: string;
  eventTime: string;
  eventPlace: string;
  roleDetail: string;
  fee: string;
  bankInfo: string;
  memo: string;
  agree: boolean;
  signature: string;
  submittedAt: string;
};
