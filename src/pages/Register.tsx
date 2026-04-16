import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { User, Eye, EyeOff, AtSign, Lock } from 'lucide-react';
import { useState } from 'react';
import { registerSchema, type RegisterFormValues } from '@/schemas/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Logo from '@/components/Logo';
import { apiRegister } from '@/api/auth';
import { toast } from 'sonner';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await apiRegister(data);

      toast.success('Akun berhasil dibuat');

      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message || 'Gagal membuat akun');
    }
  };

  return (
    <div className="min-h-screen h-full flex items-center justify-center">
      <div className="w-full lg:w-1/2 h-full flex justify-center items-center">
        <Card className="w-full max-w-md relative" border={false} shadow={false}>
          <CardHeader className="space-y-6 text-center mb-2">
            <CardTitle className="text-md text-secondary font-semibold">
              <Logo />
            </CardTitle>
            <CardDescription className="text-secondary text-xl max-w-[250px] font-bold mx-auto">
              Lengkapi data untuk membuat akun
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email anda"
                  icon={<AtSign className="w-4 h-4" />}
                  error={!!errors.email}
                  {...register('email')}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              {/* First Name */}
              <div className="space-y-2">
                <Input
                  id="first_name"
                  type="text"
                  placeholder="Nama depan"
                  icon={<User className="w-4 h-4" />}
                  error={!!errors.first_name}
                  {...register('first_name')}
                />
                {errors.first_name && (
                  <p className="text-sm text-destructive">{errors.first_name.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Nama belakang"
                  icon={<User className="w-4 h-4" />}
                  error={!!errors.last_name}
                  {...register('last_name')}
                />
                {errors.last_name && (
                  <p className="text-sm text-destructive">{errors.last_name.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Buat password"
                    icon={<Lock className="w-4 h-4" />}
                    error={!!errors.password}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Konfirmasi password"
                    icon={<Lock className="w-4 h-4" />}
                    error={!!errors.confirmPassword}
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors cursor-pointer"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-6 mt-6">
              <Button type="submit" disabled={isSubmitting} className="w-full h-11">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memproses...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">Masuk</span>
                )}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Sudah punya akun? login{' '}
                <Link
                  to="/login"
                  className="text-primary font-medium underline-offset-4 hover:underline transition-colors"
                >
                  di sini
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
      <div className="w-1/2 h-full hidden lg:block" />
      {/* decoration */}
      <div className="bg-foreground w-1/2 h-full hidden lg:block fixed top-0 right-0">
        <img src="/Illustrasi_login.png" alt="Login" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
