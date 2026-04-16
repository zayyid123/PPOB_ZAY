import api from '@/lib/api';
import type { ProfileResponse, User } from '@/types/auth';

export const apiGetProfile = () => api.get<ProfileResponse>('/profile');

export const apiUpdateProfile = (data: Pick<User, 'first_name' | 'last_name'>) =>
  api.put<ProfileResponse>('/profile/update', data);

export const apiUpdateProfileImage = (formData: FormData) =>
  api.put<ProfileResponse>('/profile/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
