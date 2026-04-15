import { Wallet, Zap, CreditCard, Smartphone, Tv, Droplets, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

const services = [
  { icon: Zap, label: 'Listrik', color: 'from-yellow-400 to-orange-500' },
  { icon: Droplets, label: 'PDAM', color: 'from-blue-400 to-cyan-500' },
  { icon: Smartphone, label: 'Pulsa', color: 'from-green-400 to-emerald-500' },
  { icon: Tv, label: 'TV Kabel', color: 'from-purple-400 to-violet-500' },
  { icon: CreditCard, label: 'Kartu Kredit', color: 'from-red-400 to-rose-500' },
  { icon: ShieldCheck, label: 'Asuransi', color: 'from-teal-400 to-cyan-600' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header / Navbar */}
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Balance Card */}
        <Card className="overflow-hidden border-0 shadow-xl shadow-indigo-200/30">
          <div className="bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-500 p-6 sm:p-8 text-white relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative">
              <p className="text-blue-100 text-sm font-medium mb-1">Saldo Anda</p>
              <div className="flex items-center gap-3">
                <Wallet className="w-8 h-8 text-blue-200" />
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Rp 0</h2>
              </div>
              <p className="text-blue-200 text-xs mt-2">Terakhir diperbarui: hari ini</p>
            </div>
          </div>
        </Card>

        {/* Services Grid */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Layanan</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {services.map((service) => (
              <Card
                key={service.label}
                className="group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-slate-200/60"
              >
                <CardContent className="flex flex-col items-center justify-center p-4 gap-2.5">
                  <div
                    className={`w-11 h-11 rounded-xl bg-linear-to-br ${service.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {service.label}
                  </span>
                </CardContent>
              </Card>
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
