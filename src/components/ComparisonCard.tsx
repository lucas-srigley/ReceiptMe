import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';


const ComparisonCard = () => {
  const comparisons = [
    { category: 'Food & Dining', difference: 12, isHigher: true },
    { category: 'Entertainment', difference: 8, isHigher: false },
    { category: 'Shopping', difference: 15, isHigher: true },
    { category: 'Transportation', difference: 5, isHigher: false }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Demographic Comparison</h2>
      <p className="text-sm text-gray-600 mb-4">
        Compared to average spending for your demographic
      </p>
      
      <div className="space-y-3">
        {comparisons.map((comp) => (
          <div key={comp.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">{comp.category}</span>
            <div className={`flex items-center space-x-1 ${
              comp.isHigher ? 'text-red-600' : 'text-green-600'
            }`}>
              {comp.isHigher ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="font-semibold">
                {comp.difference}% {comp.isHigher ? 'higher' : 'lower'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonCard;