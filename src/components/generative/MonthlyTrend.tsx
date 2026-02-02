'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTamboStreamStatus } from '@tambo-ai/react';
import { MonthlyTrendProps } from '@/lib/schemas/componentSchemas';

export default function MonthlyTrend({
  data,
  showIncome = true,
  showExpenses = true,
  showSavings = true,
}: MonthlyTrendProps) {
  const { streamStatus } = useTamboStreamStatus();

  if (!streamStatus.isSuccess) {
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  const formatTooltipValue = (value: number | string | Array<number | string> | undefined) => {
    if (value === undefined) return '';
    if (typeof value === 'number') {
      return `$${value.toFixed(2)}`;
    }
    return value;
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Trends</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip formatter={formatTooltipValue} />
          <Legend />
          {showIncome && (
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Income"
            />
          )}
          {showExpenses && (
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#EF4444" 
              strokeWidth={2}
              name="Expenses"
            />
          )}
          {showSavings && (
            <Line 
              type="monotone" 
              dataKey="savings" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name="Savings"
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {showIncome && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs text-gray-600 mb-1">Avg Income</p>
            <p className="text-lg font-bold text-green-600">
              ${(data.reduce((sum, m) => sum + m.income, 0) / data.length).toFixed(2)}
            </p>
          </div>
        )}
        {showExpenses && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-xs text-gray-600 mb-1">Avg Expenses</p>
            <p className="text-lg font-bold text-red-600">
              ${(data.reduce((sum, m) => sum + m.expenses, 0) / data.length).toFixed(2)}
            </p>
          </div>
        )}
        {showSavings && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-gray-600 mb-1">Avg Savings</p>
            <p className="text-lg font-bold text-blue-600">
              ${(data.reduce((sum, m) => sum + m.savings, 0) / data.length).toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}