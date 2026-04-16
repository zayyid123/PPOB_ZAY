import type { ApiResponse } from "./api";

export type ResponseBalance = ApiResponse<{
    balance: number;
}>

export type ResponseTopUp = ApiResponse<{
    balance: number;
}>

export interface TransactionRecord {
  invoice_number: string;
  transaction_type: 'TOPUP' | 'PAYMENT';
  description: string;
  total_amount: number;
  created_on: string;
}

export type ResponseHistory = ApiResponse<{
  offset: number;
  limit: number;
  records: TransactionRecord[];
}>