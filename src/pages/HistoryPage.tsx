import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
const googleId = loggedInUser?.googleId;

interface Receipt {
  _id: string;
  receiptId: string;
  date: string;
  vendor: string;
  items: {
    itemId: string;
    name: string;
    category: string;
    price: number;
  }[];
}

type SortOption = 'recent' | 'oldest' | 'vendor-asc' | 'vendor-desc';

const HistoryPage = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('recent');

  const sortReceipts = (data: Receipt[], option: SortOption) => {
    switch (option) {
      case 'recent':
        return [...data].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case 'oldest':
        return [...data].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case 'vendor-asc':
        return [...data].sort((a, b) => a.vendor.localeCompare(b.vendor));
      case 'vendor-desc':
        return [...data].sort((a, b) => b.vendor.localeCompare(a.vendor));
      default:
        return data;
    }
  };

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/receipts?googleId=${googleId}`);
        const data = await res.json();
        const sorted = sortReceipts(data, sortOption);
        setReceipts(sorted);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch receipts.');
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  // Re-sort when option changes
  useEffect(() => {
    setReceipts((prev) => sortReceipts(prev, sortOption));
  }, [sortOption]);

  const deleteReceipt = (id: string) => {
    setReceipts(receipts.filter(receipt => receipt._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Receipt History</h1>
            <p className="text-gray-600">View and manage your past receipts</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                Sort: {
                  sortOption === 'recent' ? 'Newest' :
                  sortOption === 'oldest' ? 'Oldest' :
                  sortOption === 'vendor-asc' ? 'Vendor A–Z' :
                  'Vendor Z–A'
                }
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setSortOption('recent')}>Newest</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortOption('oldest')}>Oldest</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortOption('vendor-asc')}>Vendor Name A–Z</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortOption('vendor-desc')}>Vendor Name Z–A</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {receipts.map((receipt) => (
            <div key={receipt._id} className="bg-white rounded-xl shadow-lg p-6 relative hover:shadow-xl transition-shadow duration-200">
              <button
                onClick={() => deleteReceipt(receipt._id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <X size={20} />
              </button>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{receipt.vendor}</h3>
                <p className="text-sm text-gray-500">{new Date(receipt.date).toLocaleDateString()}</p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  ${receipt.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700 text-sm">Items:</h4>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {receipt.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate mr-2">{item.name}</span>
                      <span className="text-gray-900 font-medium">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex flex-wrap gap-1">
                  {Array.from(new Set(receipt.items.map(item => item.category))).map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && receipts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No receipts yet</h3>
            <p className="text-gray-500">Upload your first receipt to get started!</p>
          </div>
        )}

        {error && (
          <div className="text-center py-4 text-red-500 font-medium">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
