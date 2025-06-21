import React from 'react';

const SpendingSummary = () => {
  const categories = [
    { name: 'Food & Dining', amount: 847.50, color: 'bg-green-500', percentage: 35 },
    { name: 'Entertainment', amount: 234.75, color: 'bg-blue-500', percentage: 15 },
    { name: 'Shopping', amount: 456.30, color: 'bg-purple-500', percentage: 25 },
    { name: 'Transportation', amount: 189.25, color: 'bg-yellow-500', percentage: 12 },
    { name: 'Other', amount: 312.20, color: 'bg-gray-500', percentage: 13 }
  ];

  const totalSpent = categories.reduce((sum, cat) => sum + cat.amount, 0);

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
