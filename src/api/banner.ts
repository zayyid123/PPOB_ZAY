import api from '@/lib/api';
import type { ApiResponse } from '@/types/api';
import type { Banner } from '@/types/banner';

export const apiGetBanners = () => api.get<ApiResponse<Banner[]>>('/banner');
