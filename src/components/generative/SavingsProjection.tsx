'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useTamboStreamStatus } from '@tambo-ai/react';
import { SavingsProjectionProps } from '@/lib/schemas/componentSchemas';

export default function SavingsProjection({
  currentSavings,
  monthlyContribution,
  projectionMonths,
  targetAmount,
  data,
}: SavingsProjectionProps) {
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
      <h3 className="text-xl font-bold text-gray-800 mb-4">Savings Projection</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-gray-600 mb-1">Current Savings</p>
          <p className="text-lg font-bold text-blue-600">${currentSavings.toFixed(2)}</p>
        </div>
        
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xs text-gray-600 mb-1">Monthly Contribution</p>
          <p className="text-lg font-bold text-green-600">${monthlyContribution.toFixed(2)}</p>
        </div>
        
        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-xs text-gray-600 mb-1">Projection Period</p>
          <p className="text-lg font-bold text-purple-600">{projectionMonths} months</p>
        </div>
      </div>

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
          <Line 
            type="monotone" 
            dataKey="projected" 
            stroke="#3B82F6" 
            strokeWidth={2}
            name="Projected Savings"
          />
          {targetAmount && (
            <ReferenceLine 
              y={targetAmount} 
              stroke="#10B981" 
              strokeDasharray="3 3"
              label={{ value: `Target: $${targetAmount}`, position: 'right', fill: '#10B981' }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      {targetAmount && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            Target Goal: <span className="font-bold">${targetAmount.toFixed(2)}</span>
          </p>
        </div>
      )}
    </div>
  );
}