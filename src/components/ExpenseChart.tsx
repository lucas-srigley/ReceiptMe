import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

type Category = {
  name: string;
  amount: number;
  value?: number; // needed for recharts
  color?: string;
};

const colorMap: Record<string, string> = {
  'Food & Dining': '#10b981',
  'Entertainment': '#3b82f6',
  'Shopping': '#8b5cf6',
  'Transportation': '#eab308',
  'Other': '#6b7280',
};

const ExpenseChart = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3001/spending-summary');
        const json = await res.json();

        const withColors = json.map((item: any) => ({
          name: item.name,
          value: item.amount,
          color: colorMap[item.name] || '#9ca3af', // fallback gray
        }));

        setData(withColors);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Gray placeholder if data is empty and not loading
  const chartData = data.length > 0
    ? data
    : [{ name: 'No Data', value: 1, color: '#d1d5db' }]; // gray-300

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Expense Breakdown</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              stroke="none"
              nameKey="name"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {data.length > 0 && (
              <>
                <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']} />
                <Legend />
              </>
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
