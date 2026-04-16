import api from '@/lib/api';
import type { ResponseBalance } from '@/types/transaction';

export const apiGetBalance = () => api.get<ResponseBalance>('/balance');
