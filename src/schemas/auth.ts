import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email({ message: 'Format email tidak valid' }),
  password: z
    .string()
    .min(1, { message: 'Password wajib diisi' })
    .min(6, { message: 'Password minimal 6 karakter' }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    first_name: z
      .string()
      .min(1, { message: 'Nama depan wajib diisi' })
      .min(3, { message: 'Nama depan minimal 3 karakter' }),
    last_name: z
      .string()
      .min(1, { message: 'Nama belakang wajib diisi' })
      .min(3, { message: 'Nama belakang minimal 3 karakter' }),
    email: z
      .string()
      .min(1, { message: 'Email wajib diisi' })
      .email({ message: 'Format email tidak valid' }),
    password: z
      .string()
      .min(1, { message: 'Password wajib diisi' })
      .min(6, { message: 'Password minimal 6 karakter' }),
    confirmPassword: z.string().min(1, { message: 'Konfirmasi password wajib diisi' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak sama',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
