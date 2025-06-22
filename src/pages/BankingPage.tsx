import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import BankSelector from '@/components/BankSelector';
import ConnectedCards from '@/components/ConnectedCards';
import { CreditCard, Plus, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BankingPage = () => {
  const [connectedBanks, setConnectedBanks] = useState<string[]>([]);
  const [showBankSelector, setShowBankSelector] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Banking & Cards</h1>
            <p className="text-gray-600">Connect your bank accounts to track expenses automatically</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-600 rounded-full flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Benefits of Connecting Your Bank</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Auto Receipt Capture</h3>
                <p className="text-sm text-gray-600">Get receipts via tap payments</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Real-time Tracking</h3>
                <p className="text-sm text-gray-600">Instant expense categorization</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Bank-level Security</h3>
                <p className="text-sm text-gray-600">256-bit encryption protection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Connected Cards */}
        <ConnectedCards connectedBanks={connectedBanks} />

        {/* Add Bank Button */}
        <div className="text-center mb-6">
          <Button 
            onClick={() => setShowBankSelector(true)}
            className="bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            Connect Bank Account
          </Button>
        </div>

        {/* Bank Selector Modal */}
        {showBankSelector && (
          <BankSelector 
            onConnect={(bankName) => {
              setConnectedBanks([...connectedBanks, bankName]);
              setShowBankSelector(false);
            }}
            onClose={() => setShowBankSelector(false)}
          />
        )}
      </div>
    </div>
  );
};

export default BankingPage;