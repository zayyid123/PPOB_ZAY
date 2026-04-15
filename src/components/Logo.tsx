import { Link } from 'react-router-dom';

const Logo = ({ to }: { to?: string }) => {

  if (to) {
    return (
      <Link to={to} className="flex justify-center font-semibold text-secondary items-center gap-x-1">
        <img src="/icon/Logo.png" alt="Logo" className="w-6 h-6" />
        SIMS PPOB
      </Link>
    );
  }

  return (
    <div className="flex justify-center font-semibold text-secondary items-center gap-x-1">
      <img src="/icon/Logo.png" alt="Logo" className="w-6 h-6" />
      SIMS PPOB
    </div>
  );
};

export default Logo;
