import api from '@/lib/api';
import type { ApiResponse } from '@/types/api';
import type { Service } from '@/types/services';

export const apiGetServices = () => api.get<ApiResponse<Service[]>>('/services');
