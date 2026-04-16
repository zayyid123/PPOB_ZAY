import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';
import BannerSlider from '@/components/BannerSlider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import {
  fetchServices,
  selectServices,
  selectServicesLoading,
} from '@/store/slices/servicesSlices';
import { fetchBanners, selectBanners, selectBannersLoading } from '@/store/slices/bannerSlice';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const servicesFromStore = useAppSelector(selectServices);
  const bannersFromStore = useAppSelector(selectBanners);
  const isServicesLoading = useAppSelector(selectServicesLoading);
  const isBannersLoading = useAppSelector(selectBannersLoading);

  useEffect(() => {
    // get services
    if (servicesFromStore.length === 0 && !isServicesLoading) {
      dispatch(fetchServices());
    }
    // get banners
    if (bannersFromStore.length === 0 && !isBannersLoading) {
      dispatch(fetchBanners());
    }
  }, [
    dispatch,
    servicesFromStore.length,
    bannersFromStore.length,
    isServicesLoading,
    isBannersLoading,
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <Header />

        {/* Services Grid */}
        <section>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-y-8 gap-x-2">
            {servicesFromStore.map((service) => (
              <Link
                key={service.service_code}
                to={`/pembelian/${service.service_code}`}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center mb-3 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300">
                  <img
                    src={service.service_icon}
                    alt={service.service_name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <span className="text-[11px] leading-tight font-medium text-center text-slate-600 group-hover:text-primary transition-colors max-w-[80px]">
                  {service.service_name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <BannerSlider />
      </main>
    </div>
  );
}
