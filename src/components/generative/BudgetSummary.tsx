'use client';

import React from 'react';
import { useTamboStreamStatus } from '@tambo-ai/react';
import { BudgetSummaryProps } from '@/lib/schemas/componentSchemas';

export default function BudgetSummary({
  totalIncome,
  totalExpenses,
  totalSavings,
  savingsRate,
  topCategory,
  message,
}: BudgetSummaryProps) {
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

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Financial Summary</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-gray-600 mb-1">Income</p>
          <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
        </div>
        
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-sm text-gray-600 mb-1">Expenses</p>
          <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600 mb-1">Savings</p>
          <p className="text-2xl font-bold text-blue-600">${totalSavings.toFixed(2)}</p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-gray-600 mb-1">Savings Rate</p>
          <p className="text-2xl font-bold text-purple-600">{savingsRate.toFixed(1)}%</p>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600">Top Spending Category</p>
        <p className="text-lg font-bold text-gray-800">{topCategory}</p>
      </div>

      {message && (
        <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-800">{message}</p>
        </div>
      )}
    </div>
  );
}