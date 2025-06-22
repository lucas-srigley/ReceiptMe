import React, { useEffect, useState } from 'react';

const colorMap: Record<string, string> = {
  'Groceries': 'bg-green-500',
  'Dining & Takeout': 'bg-emerald-500',
  'Entertainment': 'bg-blue-500',
  'Shopping': 'bg-purple-500',
  'Transportation': 'bg-yellow-500',
  'Housing': 'bg-orange-500',
  'Health & Wellness': 'bg-pink-500',
  'Other (Type Category)': 'bg-gray-500',
};

type Category = {
  name: string;
  amount: number;
  percentage?: number;
  color?: string;
};

const SpendingSummary = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalSpent, setTotalSpent] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3001/spending-summary');
        const data: Category[] = await res.json();

        const total = data.reduce((sum, c) => sum + c.amount, 0);
        const enriched = data.map((c) => ({
          ...c,
          percentage: Math.round((c.amount / total) * 100),
          color: colorMap[c.name] || 'bg-gray-400',
        }));

        setCategories(enriched);
        setTotalSpent(total);
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Spending Summary</h2>
      
      <div className="mb-6">
        <div className="text-3xl font-bold text-gray-900 mb-2">
          ${totalSpent.toFixed(2)}
        </div>
        <div className="text-sm text-gray-600">Total spent this month</div>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
              <span className="text-gray-700 font-medium">{category.name}</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-900">${category.amount.toFixed(2)}</div>
              <div className="text-sm text-gray-500">{category.percentage}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingSummary;
