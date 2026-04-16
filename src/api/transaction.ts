import api from '@/lib/api';
import type { ResponseBalance, ResponseTopUp, ResponseHistory } from '@/types/transaction';

export const apiGetBalance = () => api.get<ResponseBalance>('/balance');

export const apiTopUp = (top_up_amount: number) => api.post<ResponseTopUp>('/topup', { top_up_amount });

export const apiGetHistory = (offset = 0, limit = 5) =>
  api.get<ResponseHistory>(`/transaction/history?offset=${offset}&limit=${limit}`);

export const apiPostTransaction = (service_code: string) =>
  api.post('/transaction', { service_code });
