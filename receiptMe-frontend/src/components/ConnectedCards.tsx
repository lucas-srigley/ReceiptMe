import React from 'react';
import { CreditCard, Smartphone, Settings, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConnectedCardsProps {
  connectedBanks: string[];
}

const ConnectedCards = ({ connectedBanks }: ConnectedCardsProps) => {
  const mockCards = [
    {
      id: 1,
      bankName: 'Royal Bank of Canada (RBC)',
      cardType: 'Visa Infinite',
      lastFour: '4567',
      isDebit: false,
      tapEnabled: true,
      color: 'bg-gradient-to-r from-blue-600 to-blue-700'
    },
    {
      id: 2,
      bankName: 'Toronto-Dominion Bank (TD)',
      cardType: 'Debit Card',
      lastFour: '8901',
      isDebit: true,
      tapEnabled: false,
      color: 'bg-gradient-to-r from-green-600 to-green-700'
    }
  ];

  const getConnectedCards = () => {
    return mockCards.filter(card => connectedBanks.includes(card.bankName));
  };

  const connectedCards = getConnectedCards();

  if (connectedCards.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6 text-center">
        <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Cards Connected</h3>
        <p className="text-gray-600">
          Connect your bank account to start tracking expenses automatically and enable tap receipt capture.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Connected Cards</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectedCards.map((card) => (
          <div key={card.id} className="relative">
            {/* Card */}
            <div className={`${card.color} rounded-xl p-6 text-white relative overflow-hidden`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-white/80 text-sm">{card.bankName}</p>
                  <p className="font-semibold">{card.cardType}</p>
                </div>
                <CreditCard className="w-8 h-8 text-white/80" />
              </div>
              
              <div className="mt-8">
                <p className="text-white/80 text-sm">Card Number</p>
                <p className="font-mono text-lg">•••• •••• •••• {card.lastFour}</p>
              </div>
              
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
            </div>

            {/* Card Controls */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Tap Receipts</span>
                </div>
                {card.tapEnabled ? (
                  <div className="flex items-center space-x-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Enabled</span>
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-xs"
                  >
                    Enable
                  </Button>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {card.isDebit ? 'Debit Card' : 'Credit Card'}
                </span>
                <Button size="sm" variant="ghost">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {connectedCards.some(card => card.tapEnabled) && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="font-medium text-green-900">Tap Receipt Capture Active</h3>
          </div>
          <p className="text-sm text-green-800">
            Your enabled cards will automatically capture receipts when you tap to pay. 
            Receipts will appear in your expense dashboard within minutes.
          </p>
        </div>
      )}
    </div>
  );
};

export default ConnectedCards;
