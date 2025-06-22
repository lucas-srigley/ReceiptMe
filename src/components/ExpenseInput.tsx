import React, { useState } from 'react';
import { Upload, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const Spinner = () => (
  <div className="flex justify-center mt-4">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
  </div>
);

const categories = [
  'Groceries',
  'Dining & Takeout',
  'Entertainment',
  'Shopping',
  'Transportation',
  'Housing',
  'Health & Wellness',
  'Other',
];

type ExpenseRow = {
  amount: string;
  category: string;
  description: string;
};

const ExpenseInput = () => {
  const [vendor, setVendor] = useState('');
  const [expenses, setExpenses] = useState<ExpenseRow[]>([
    { amount: '', category: '', description: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [parsedReceipt, setParsedReceipt] = useState<string | null>(null);

  const handleRowChange = (index: number, key: keyof ExpenseRow, value: string) => {
    const updated = [...expenses];
    updated[index][key] = value;
    setExpenses(updated);
  };

  const addRow = () => {
    setExpenses([...expenses, { amount: '', category: '', description: '' }]);
  };

  const handleManualEntry = async () => {
    if (!vendor || expenses.length === 0) {
      alert('Please enter a vendor and at least one expense item.');
      return;
    }
  
    try {
      const formattedExpenses = expenses.map((item) => ({
        amount: item.amount,
        category: item.category,
        description: item.description,
      }));
  
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await fetch('http://localhost:3001/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          googleId: user.googleId,
          vendor,
          items: formattedExpenses,
        }),
      });
  
      if (!response.ok) throw new Error('Failed to submit expense');
  
      alert('Expense submitted successfully!');
      setVendor('');
      setExpenses([{ amount: '', category: '', description: '' }]);
    } catch (error) {
      console.error('Error submitting manual expense:', error);
      alert('Something went wrong submitting the expense.');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('receipt', file);

    try {
      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      console.log('Parsed receipt:', data.parsed);
      setParsedReceipt(data.parsed);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload receipt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Expenses</h2>

      {/* Vendor Input */}
      <Input
        type="text"
        placeholder="Vendor"
        value={vendor}
        onChange={(e) => setVendor(e.target.value)}
        className="mb-6"
      />

      {/* Expense Rows */}
      {expenses.map((expense, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-center"
        >
          <Input
            type="number"
            placeholder="Amount ($)"
            value={expense.amount}
            onChange={(e) => handleRowChange(index, 'amount', e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {expense.category || 'Select Category'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((cat) => (
                <DropdownMenuItem
                  key={cat}
                  onSelect={() => handleRowChange(index, 'category', cat)}
                >
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            type="text"
            placeholder="Description"
            value={expense.description}
            onChange={(e) => handleRowChange(index, 'description', e.target.value)}
          />
        </div>
      ))}

      <div className="flex gap-3 mb-4">
        <Button
          variant="outline"
          onClick={addRow}
          className="flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Add Row
        </Button>
        <Button
          onClick={handleManualEntry}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white flex-1"
        >
          Submit Expenses
        </Button>
      </div>

      {/* File Upload */}
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Button
          variant="outline"
          className="w-full border-2 border-dashed border-gray-300 hover:border-green-500 transition-colors duration-200"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Receipt
        </Button>
      </div>

      {loading && <Spinner />}
    </div>
  );
};

export default ExpenseInput;
