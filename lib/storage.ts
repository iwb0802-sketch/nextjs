import { ContractData } from "@/types/contract";

const KEY = "inus_contracts";

export function getContracts(): ContractData[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ContractData[];
  } catch {
    return [];
  }
}

export function saveContract(data: ContractData) {
  const list = getContracts();
  localStorage.setItem(KEY, JSON.stringify([data, ...list]));
}

export function getContract(id: string) {
  return getContracts().find((item) => item.id === id);
}
