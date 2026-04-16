import api from '@/lib/api';
import type { LoginRequest, AuthResponse, RegisterRequest, ProfileResponse } from '@/types/auth';

export const apiLogin = (data: LoginRequest) => api.post<AuthResponse>('/login', data);

export const apiRegister = (data: RegisterRequest) => api.post<AuthResponse>('/registration', data);

export const apiProfile = (headers?: { Authorization: string }) =>
  api.get<ProfileResponse>('/profile', { headers });
