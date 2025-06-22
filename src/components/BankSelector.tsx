import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BankSelectorProps {
  onConnect: (bankName: string) => void;
  onClose: () => void;
}

const BankSelector = ({ onConnect, onClose }: BankSelectorProps) => {
  const canadianBanks = [
    { name: 'Royal Bank of Canada (RBC)', logo: '🏛️', color: 'bg-blue-600' },
    { name: 'Toronto-Dominion Bank (TD)', logo: '🏪', color: 'bg-green-600' },
    { name: 'Bank of Nova Scotia (Scotiabank)', logo: '🏦', color: 'bg-red-600' },
    { name: 'Bank of Montreal (BMO)', logo: '🏢', color: 'bg-blue-700' },
    { name: 'Canadian Imperial Bank (CIBC)', logo: '🏛️', color: 'bg-red-700' },
    { name: 'National Bank of Canada', logo: '🏪', color: 'bg-purple-600' },
    { name: 'HSBC Bank Canada', logo: '🏦', color: 'bg-red-500' },
    { name: 'Canadian Western Bank', logo: '🏢', color: 'bg-orange-600' },
    { name: 'EQ Bank', logo: '💳', color: 'bg-teal-600' },
    { name: 'Neo Financial', logo: '🚀', color: 'bg-indigo-600' },
    { name: 'Citibank Canada', logo: '🏛️', color: 'bg-blue-500' },
    { name: 'Manulife Bank', logo: '🏪', color: 'bg-green-700' },
    { name: 'ICICI Bank Canada', logo: '🏦', color: 'bg-orange-500' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Select Your Bank</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Choose your bank to securely connect your accounts and enable automatic expense tracking.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {canadianBanks.map((bank) => (
            <button
              key={bank.name}
              onClick={() => onConnect(bank.name)}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${bank.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                  {bank.logo}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {bank.name}
                  </h3>
                  <p className="text-sm text-gray-500">Secure connection</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-medium">🔒 Your data is secure:</span> We use bank-level encryption and never store your banking credentials. 
            Your connection is protected by the same security standards used by major financial institutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankSelector;