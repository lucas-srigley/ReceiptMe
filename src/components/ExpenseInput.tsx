import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Spinner = () => (
    <div className="flex justify-center mt-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
)

const ExpenseInput = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [parsedReceipt, setParsedReceipt] = useState<string | null>(null);

  const handleManualEntry = () => {
    console.log('Manual entry:', { amount, category, description });
    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
  };


  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('Uploading receipt:', file.name);
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
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Expense</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Input
          type="number"
          placeholder="Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border-gray-300"
        />
        <Input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-gray-300"
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-gray-300"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={handleManualEntry}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white flex-1"
        >
          Add Expense
        </Button>
        
        <div className="relative flex-1">
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
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default ExpenseInput;