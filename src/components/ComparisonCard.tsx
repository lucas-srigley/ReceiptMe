import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
const googleId = loggedInUser?.googleId;

interface Comparison {
  category: string;
  difference: number;
  isHigher: boolean;
}

const ComparisonCard = () => {
  const [comparisons, setComparisons] = useState<Comparison[]>([]);

  useEffect(() => {
    const fetchComparison = async () => {
      try {
        const res = await fetch(`http://localhost:3001/comparison-summary?googleId=${googleId}`);
        const data = await res.json();
        setComparisons(data);
      } catch (err) {
        console.error("Failed to fetch comparison data", err);
      }
    };

    fetchComparison();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Demographic Comparison</h2>
      <p className="text-sm text-gray-600 mb-4">
        Compared to the average user over the past 30 days
      </p>
      
      <div className="space-y-3">
        {comparisons.map((comp) => (
          <div key={comp.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-medium">{comp.category}</span>
            <div className={`flex items-center space-x-1 ${comp.isHigher ? 'text-red-600' : 'text-green-600'}`}>
              {comp.isHigher ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="font-semibold">
                {comp.isHigher ? '+' : '-'}${comp.difference}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonCard;
