import { Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { apiGetBalance } from '@/api/transaction';
import { toast } from 'sonner';

const Header = () => {
  const [showSaldo, setShowSaldo] = useState(true);
  const [balance, setBalance] = useState(0);

  const user = useAppSelector((state) => state.auth.user);
  const fullName = user ? `${user.first_name} ${user.last_name}` : 'Pengguna';

  useEffect(() => {
    try {
      apiGetBalance().then((res) => {
        setBalance(res.data.data.balance);
      });
    } catch (error) {
      console.log(error);
      toast.error('Gagal mengambil saldo');
    }
  }, []);

  return (
    <div className="w-full grid grid-cols-5">
      {/* Account */}
      <div className="text-secondary col-span-5 md:col-span-2 mb-5 md:mb-0 flex flex-col gap-y-2 items-center md:items-start justify-end">
        <img src={user.profile_image.includes('/null') ? '/icon/profile.png' : user.profile_image} alt="Profile" className="w-12 h-12 rounded-full" />
        <p className="text-xl mt-3">Selamat Datang,</p>
        <p className="text-3xl font-semibold">{fullName}</p>
      </div>

      {/* Balance Card */}
      <Card className="overflow-hidden border-0 shadow-xl shadow-indigo-200/30 col-span-5 md:col-span-3">
        <div className="p-6 sm:p-8 text-white relative">
          <div className="relative z-10 flex flex-col gap-y-2">
            <p className="text-lg font-medium mb-1">Saldo Anda</p>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Rp {showSaldo ? balance.toLocaleString('id-ID') : '••••••'}
              </h2>
            </div>
            <Button
              variant="outliner-primary"
              className="w-fit"
              onClick={() => setShowSaldo(!showSaldo)}
            >
              {showSaldo ? 'Sembunyikan Saldo' : 'Lihat Saldo'}
              {showSaldo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <img
            src="/bg-saldo.png"
            alt="BG"
            className="absolute top-0 right-0 w-full h-full object-cover"
          />
        </div>
      </Card>
    </div>
  );
};

export default Header;
