import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { AtSign, Eye, EyeOff, LockKeyholeOpen } from 'lucide-react';
import { useState } from 'react';
import { loginSchema, type LoginFormValues } from '@/schemas/auth';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';
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
import { apiLogin, apiProfile } from '@/api/auth';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await apiLogin(data);
      const dataLogin = response.data;
      const responseProfile = await apiProfile({
        Authorization: `Bearer ${dataLogin?.data.token}`,
      });
      const dataProfile = responseProfile.data;

      toast.success('Login berhasil');

      dispatch(
        setCredentials({
          user: {
            email: data.email,
            first_name: dataProfile?.data?.first_name,
            last_name: dataProfile?.data?.last_name,
            profile_image: dataProfile?.data?.profile_image,
          },
          token: dataLogin?.data.token,
        }),
      );
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message || 'Login gagal');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full lg:w-1/2 flex justify-center">
        <Card className="w-full max-w-md relative" border={false} shadow={false}>
          <CardHeader className="space-y-6 text-center mb-2">
            <CardTitle className="text-md text-secondary font-semibold">
              <Logo />
            </CardTitle>
            <CardDescription className="text-secondary text-xl max-w-[250px] font-bold mx-auto">
              Masuk atau buat akun untuk memulai
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

              {/* Password */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan password"
                    icon={<LockKeyholeOpen className="w-4 h-4" />}
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
                Belum punya akun? registrasi{' '}
                <Link
                  to="/register"
                  className="text-primary font-medium underline-offset-4 hover:underline transition-colors"
                >
                  di sini
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
      <div className="bg-foreground w-1/2 h-screen hidden lg:block">
        <img src="/Illustrasi_login.png" alt="Login" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
