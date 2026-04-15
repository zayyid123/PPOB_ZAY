import { Link } from 'react-router-dom';
import Logo from './Logo';
import { menus } from '@/constant/menus';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-slate-200/60 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Logo to="/" />
        <div className="flex items-center gap-8">
          {menus.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-secondary font-medium text-regular hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};


export default Navbar;
