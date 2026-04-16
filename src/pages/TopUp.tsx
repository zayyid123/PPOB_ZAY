import { apiTopUp } from '@/api/transaction';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Banknote } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const presets = [10000, 20000, 50000, 100000, 250000, 500000];

const TopUp = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<string>('');

  const handlePresetClick = (val: number) => {
    setAmount(val.toString());
  };

  const amountNumber = parseInt(amount) || 0;
  const isNotValidInput = !amount || amountNumber < 10000;

  const handleTopUp = async () => {
    if (isNotValidInput) {
      toast.error('Nominal harus melebihi Rp10.000');
      return;
    }

    try {
      const res = await apiTopUp(amountNumber);
      toast.success(res.data.message);
      setAmount('');
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message || 'Gagal Top Up');
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <Header />

        <section className="space-y-6">
          <div className="space-y-1">
            <p className="text-secondary text-lg">Silahkan masukan</p>
            <h1 className="text-3xl font-bold text-secondary">Nominal Top Up</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3 space-y-4">
              <Input
                type="number"
                placeholder="masukan nominal Top Up"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                icon={<Banknote className="w-5 h-5 text-muted-foreground" />}
                className="h-12 text-secondary"
              />
              <Button
                className="w-full h-12 text-white font-medium disabled:bg-muted disabled:opacity-100"
                variant="default"
                onClick={handleTopUp}
              >
                Top Up
              </Button>
            </div>

            <div className="md:col-span-2 grid grid-cols-3 gap-3">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className="border border-muted py-3 px-1 rounded-md text-secondary hover:bg-secondary/5 transition-colors text-sm font-medium cursor-pointer"
                >
                  Rp{preset.toLocaleString('id-ID')}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TopUp;
