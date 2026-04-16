import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { apiGetHistory } from '@/api/transaction';
import type { TransactionRecord } from '@/types/transaction';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Transaction = () => {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const limit = 5;

  const fetchHistory = async (newOffset: number) => {
    setIsLoading(true);
    try {
      const res = await apiGetHistory(newOffset, limit);
      const newRecords = res.data.data.records;
      
      if (newRecords.length < limit) {
        setHasMore(false);
      }
      
      if (newOffset === 0) {
        setTransactions(newRecords);
      } else {
        setTransactions(prev => [...prev, ...newRecords]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal mengambil riwayat transaksi');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(0);
  }, []);

  const handleShowMore = () => {
    const nextOffset = offset + limit;
    setOffset(nextOffset);
    fetchHistory(nextOffset);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date).replace('.', ':') + ' WIB';
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        <Header />

        <section className="space-y-6">
          <h2 className="text-xl font-bold text-secondary">Semua Transaksi</h2>

          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((item, idx) => (
                <div
                  key={item.invoice_number + idx}
                  className="flex items-center justify-between p-4 sm:p-6 border border-muted rounded-xl"
                >
                  <div className="flex flex-col gap-y-1">
                    <p
                      className={`text-xl font-bold ${
                        item.transaction_type === 'TOPUP' ? 'text-emerald-500' : 'text-primary'
                      }`}
                    >
                      {item.transaction_type === 'TOPUP' ? '+' : '-'} Rp
                      {item.total_amount.toLocaleString('id-ID')}
                    </p>
                    <p className="text-muted text-xs sm:text-sm">
                      {formatDate(item.created_on)}
                    </p>
                  </div>
                  <p className="text-secondary text-sm font-medium">
                    {item.description}
                  </p>
                </div>
              ))
            ) : (
              !isLoading && (
                <div className="text-center py-20 text-muted">
                  Belum ada riwayat transaksi
                </div>
              )
            )}
          </div>

          {hasMore && transactions.length > 0 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleShowMore}
                disabled={isLoading}
                className="text-primary font-bold hover:underline disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Show more'}
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Transaction;
