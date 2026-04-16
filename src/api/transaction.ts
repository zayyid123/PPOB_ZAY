import api from '@/lib/api';
import type { ResponseBalance, ResponseTopUp } from '@/types/transaction';

export const apiGetBalance = () => api.get<ResponseBalance>('/balance');

export const apiTopUp = (top_up_amount: number) => api.post<ResponseTopUp>('/topup', { top_up_amount });
