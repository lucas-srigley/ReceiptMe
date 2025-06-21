
import React from 'react';
import Navigation from '@/components/Navigation';
import ExpenseInput from '@/components/ExpenseInput';
import SpendingSummary from '@/components/SpendingSummary';
import ExpenseChart from '@/components/ExpenseChart';
import ComparisonCard from '@/components/ComparisonCard';
import { User } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
            <p className="text-gray-600">Here's your spending overview for December 2024</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Expense Input */}
        <ExpenseInput />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SpendingSummary />
          <ExpenseChart />
        </div>

        {/* Comparison Card */}
        <ComparisonCard />
      </div>
    </div>
  );
};

export default Dashboard;