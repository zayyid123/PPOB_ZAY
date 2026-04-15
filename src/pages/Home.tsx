import { CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import { services } from '@/constant/menus';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
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


        {/* Recent Transactions Placeholder */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Transaksi Terakhir</h2>
          <Card className="border-dashed border-slate-300">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <CreditCard className="w-7 h-7 text-slate-400" />
              </div>
              <p className="text-sm text-muted-foreground">Belum ada transaksi</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Mulai gunakan layanan PPOB untuk melihat riwayat transaksi
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
