
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface Receipt {
  id: number;
  date: string;
  total: number;
  merchant: string;
  items: { name: string; amount: number; category: string }[];
}

const HistoryPage = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([
    {
      id: 1,
      date: '2024-12-15',
      total: 47.85,
      merchant: 'Whole Foods Market',
      items: [
        { name: 'Organic Bananas', amount: 3.99, category: 'Food' },
        { name: 'Greek Yogurt', amount: 5.49, category: 'Food' },
        { name: 'Spinach', amount: 2.99, category: 'Food' },
        { name: 'Chicken Breast', amount: 12.99, category: 'Food' },
        { name: 'Olive Oil', amount: 8.99, category: 'Food' },
        { name: 'Bread', amount: 3.49, category: 'Food' },
        { name: 'Tomatoes', amount: 4.99, category: 'Food' },
        { name: 'Cheese', amount: 4.92, category: 'Food' }
      ]
    },
    {
      id: 2,
      date: '2024-12-14',
      total: 24.50,
      merchant: 'AMC Theaters',
      items: [
        { name: 'Movie Ticket', amount: 15.00, category: 'Entertainment' },
        { name: 'Popcorn', amount: 7.50, category: 'Entertainment' },
        { name: 'Soda', amount: 2.00, category: 'Entertainment' }
      ]
    },
    {
      id: 3,
      date: '2024-12-13',
      total: 89.99,
      merchant: 'Target',
      items: [
        { name: 'Winter Jacket', amount: 59.99, category: 'Shopping' },
        { name: 'Socks (3-pack)', amount: 12.99, category: 'Shopping' },
        { name: 'Phone Charger', amount: 17.01, category: 'Shopping' }
      ]
    }
  ]);

  const deleteReceipt = (id: number) => {
    setReceipts(receipts.filter(receipt => receipt.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Receipt History</h1>
          <p className="text-gray-600">View and manage your past receipts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {receipts.map((receipt) => (
            <div key={receipt.id} className="bg-white rounded-xl shadow-lg p-6 relative hover:shadow-xl transition-shadow duration-200">
              <button
                onClick={() => deleteReceipt(receipt.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <X size={20} />
              </button>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{receipt.merchant}</h3>
                <p className="text-sm text-gray-500">{new Date(receipt.date).toLocaleDateString()}</p>
                <p className="text-2xl font-bold text-green-600 mt-2">${receipt.total.toFixed(2)}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-700 text-sm">Items:</h4>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {receipt.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate mr-2">{item.name}</span>
                      <span className="text-gray-900 font-medium">${item.amount.toFixed(2)}</span>
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

        {receipts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No receipts yet</h3>
            <p className="text-gray-500">Upload your first receipt to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;