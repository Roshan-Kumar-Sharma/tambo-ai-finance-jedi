'use client';

import React from 'react';
import { AlertCircle, CheckCircle, Info, Lightbulb } from 'lucide-react';
import { useTamboStreamStatus } from '@tambo-ai/react';
import { SpendingInsightsProps } from '@/lib/schemas/componentSchemas';

export default function SpendingInsights({
  insights,
  title = 'Financial Insights',
}: SpendingInsightsProps) {
  const { streamStatus } = useTamboStreamStatus();

  if (!streamStatus.isSuccess) {
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'tip':
        return <Lightbulb className="w-5 h-5 text-yellow-600" />;
      default:
        return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-red-50 border-red-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'tip':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTextColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-red-800';
      case 'success':
        return 'text-green-800';
      case 'info':
        return 'text-blue-800';
      case 'tip':
        return 'text-yellow-800';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${getBackgroundColor(insight.type)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(insight.type)}
              </div>
              <div className="flex-1">
                {insight.category && (
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    {insight.category}
                  </p>
                )}
                <p className={`text-sm ${getTextColor(insight.type)}`}>
                  {insight.message}
                </p>
                {insight.amount !== undefined && (
                  <p className={`text-sm font-bold mt-1 ${getTextColor(insight.type)}`}>
                    ${insight.amount.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}