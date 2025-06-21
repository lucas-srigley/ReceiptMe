
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ExpenseChart = () => {
  const data = [
    { name: 'Food & Dining', value: 847.50, color: '#10b981' },
    { name: 'Entertainment', value: 234.75, color: '#3b82f6' },
    { name: 'Shopping', value: 456.30, color: '#8b5cf6' },
    { name: 'Transportation', value: 189.25, color: '#eab308' },
    { name: 'Other', value: 312.20, color: '#6b7280' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Expense Breakdown</h2>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;