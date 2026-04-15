import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import { services } from '@/constant/menus';
import { Link } from 'react-router-dom';
import BannerSlider from '@/components/BannerSlider';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header / Navbar */}
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Header */}
        <Header />

        {/* Services Grid */}
        <section>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-y-8 gap-x-2">
            {services.map((service) => (
              <Link
                key={service.label}
                to={service.to}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`w-16 h-16 rounded-xl ${service.bg} flex items-center justify-center mb-3 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300`}
                >
                  <img src={service.icon} alt={service.label} className="w-12 h-12 object-contain" />
                </div>
                <span className="text-[11px] leading-tight font-medium text-center text-slate-600 group-hover:text-primary transition-colors max-w-[80px]">
                  {service.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Banner Slider */}
        <BannerSlider />
      </main>
    </div>
  );
}

