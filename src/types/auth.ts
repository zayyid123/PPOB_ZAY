import type { ApiResponse } from './api';

export interface User {
  email: string;
  first_name: string;
  last_name: string;
  profile_image?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export type AuthResponse = ApiResponse<{ token: string }>;
export type ProfileResponse = ApiResponse<User>;
