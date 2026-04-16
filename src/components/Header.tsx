import { Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';

const Header = () => {
  const user = useAppSelector((state) => state.auth.user);
  const fullName = user ? `${user.first_name} ${user.last_name}` : 'Pengguna';

  const [showSaldo, setShowSaldo] = useState(false);

  return (
    <div className="w-full grid grid-cols-5">
      {/* Account */}
      <div className="text-secondary col-span-2">
        <img src="/icon/profile.png" alt="Profile" className="w-12 h-12 rounded-full" />
        <p className="text-xl mt-3">Selamat Datang,</p>
        <p className="text-3xl font-semibold">{fullName}</p>
      </div>

      {/* Balance Card */}
      <Card className="overflow-hidden border-0 shadow-xl shadow-indigo-200/30 col-span-3">
        <div className="p-6 sm:p-8 text-white relative">
          <div className="relative z-10 flex flex-col gap-y-2">
            <p className="text-lg font-medium mb-1">Saldo Anda</p>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Rp {showSaldo ? '0' : '••••••'}
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
