import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import GeminiLogo from '@/assets/Gemini.png';

const GeminiSummaryCard = () => {
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const generateSummary = async () => {
    setIsGenerating(true);
    setError('');
    setSummary('');

    try {
      const response = await fetch('http://localhost:3001/api/ai-summary');
      const data = await response.json();

      if (!response.ok || !data.summary) {
        throw new Error('No summary returned');
      }

      setSummary(data.summary);
    } catch (err) {
      console.error('Failed to fetch AI summary:', err);
      setError('Unable to generate summary at this time. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src={GeminiLogo} 
              alt="Gemini"
              className="h-7 w-auto object-contain mt-[1px]" 
            />
            <span className="text-xl font-semibold text-gray-800">AI Spending Insights</span>
          </div>
          <Sparkles className="w-6 h-6 text-blue-500" />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="min-h-[120px] p-4 bg-gray-50 rounded-lg border border-gray-200">
          {!summary && !isGenerating && !error && (
            <p className="text-gray-500 italic">
              Click "Generate Insights" to get AI-powered analysis of your spending habits.
            </p>
          )}

          {isGenerating && (
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing your spending patterns...</span>
            </div>
          )}

          {summary && !isGenerating && (
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          )}

          {error && !isGenerating && (
            <p className="text-red-500 italic">{error}</p>
          )}
        </div>

        <Button
          onClick={generateSummary}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Insights
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GeminiSummaryCard;
