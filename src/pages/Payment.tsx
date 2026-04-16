import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { useAppSelector } from '@/store/hooks';
import { selectServices } from '@/store/slices/servicesSlices';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Banknote, CheckCircle2, XCircle, Wallet } from 'lucide-react';
import { apiPostTransaction } from '@/api/transaction';
import { toast } from 'sonner';

const Payment = () => {
  const { serviceCode } = useParams<{ serviceCode: string }>();
  const navigate = useNavigate();
  const services = useAppSelector(selectServices);
  const service = services.find((s) => s.service_code === serviceCode);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (services.length > 0 && !service) {
      toast.error('Layanan tidak ditemukan');
      navigate('/');
    }
  }, [services, service, navigate]);

  if (!service) return null;

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      await apiPostTransaction(service.service_code);
      setIsSuccess(true);
      setIsResultOpen(true);
      setIsConfirmOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsSuccess(false);
      setIsResultOpen(true);
      setIsConfirmOpen(false);
      toast.error(error?.response?.data?.message || 'Gagal melakukan pembayaran');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 relative">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <Header />

        <section className="space-y-6">
          <div className="space-y-1">
            <p className="text-secondary text-lg font-medium">PemBayaran</p>
            <div className="flex items-center gap-3">
              <img src={service.service_icon} alt={service.service_name} className="w-8 h-8" />
              <h1 className="text-xl font-bold text-secondary">{service.service_name}</h1>
            </div>
          </div>

          <div className="space-y-4 max-w-full">
            <Input
              type="text"
              readOnly
              value={service.service_tariff.toLocaleString('id-ID')}
              icon={<Banknote className="w-5 h-5 text-muted-foreground" />}
              className="h-12 text-secondary bg-white"
            />
            <Button
              className="w-full h-12 text-white font-medium"
              variant="default"
              onClick={() => setIsConfirmOpen(true)}
            >
              Bayar
            </Button>
          </div>
        </section>
      </main>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <p className="text-secondary font-medium">
                Beli {service.service_name.toLowerCase()} senilai
              </p>
              <h3 className="text-2xl font-bold text-secondary">
                Rp{service.service_tariff.toLocaleString('id-ID')} ?
              </h3>
            </div>
            <div className="w-full space-y-3">
              <button
                disabled={isLoading}
                onClick={handlePayment}
                className="w-full text-primary cursor-pointer font-bold py-2 hover:underline disabled:opacity-50"
              >
                Ya, lanjutkan Bayar
              </button>
              <button
                disabled={isLoading}
                onClick={() => setIsConfirmOpen(false)}
                className="w-full text-muted-foreground cursor-pointer font-medium py-2 hover:underline"
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {isResultOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full flex flex-col items-center text-center space-y-6">
            <div
              className={`w-16 h-16 ${isSuccess ? 'bg-emerald-500' : 'bg-primary'} rounded-full flex items-center justify-center`}
            >
              {isSuccess ? (
                <CheckCircle2 className="w-8 h-8 text-white" />
              ) : (
                <XCircle className="w-8 h-8 text-white" />
              )}
            </div>
            <div className="space-y-2">
              <p className="text-secondary font-medium">
                Pembayaran {service.service_name.toLowerCase()} sebesar
              </p>
              <h3 className="text-2xl font-bold text-secondary">
                Rp{service.service_tariff.toLocaleString('id-ID')}
              </h3>
              <p className="text-secondary font-medium">{isSuccess ? 'berhasil!' : 'gagal'}</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="w-full text-primary cursor-pointer font-bold py-2 hover:underline"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
