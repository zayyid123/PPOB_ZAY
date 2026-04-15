import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useAppDispatch } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/store/slices/authSlice';
import Logo from './Logo';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-slate-200/60 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-1.5 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
