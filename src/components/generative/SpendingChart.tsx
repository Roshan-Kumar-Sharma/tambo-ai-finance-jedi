// components/generative/SpendingChart.tsx

'use client';


import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { PieLabelRenderProps } from 'recharts';
import { SpendingChartProps } from '@/lib/schemas/componentSchemas';
import { useTamboStreamStatus } from '@tambo-ai/react';

// Color palette for categories
const COLORS = [
  '#8B5CF6', // Purple
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#3B82F6', // Blue
  '#EC4899', // Pink
  '#6366F1', // Indigo
  '#14B8A6', // Teal
  '#F97316', // Orange
  '#9CA3AF', // Gray
];

export default function SpendingChart({
  data = [],
  chartType = 'pie',
  title,
  timeframe,
}: SpendingChartProps) {
  const { streamStatus, propStatus } = useTamboStreamStatus();

  // Show loading state while data is streaming
  if (!streamStatus.isSuccess && (!data || data.length === 0)) {
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading spending data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Prepare data with colors
  const chartData = data.map((item, index) => ({
    ...item,
    color: item.color || COLORS[index % COLORS.length],
  }));

  // Calculate total for percentage if not provided
  const total = chartData.reduce((sum, item) => sum + item.amount, 0);

  // Custom label renderer with proper types
  const renderCustomLabel = (props: PieLabelRenderProps) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, outerRadius, percent } = props;
    
    // Type guard to ensure values exist
    if (cx === undefined || cy === undefined || midAngle === undefined || 
        outerRadius === undefined || percent === undefined) {
      return null;
    }

    const radius = outerRadius + 25;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#374151"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  // Custom tooltip formatter with proper types
  const formatTooltipValue = (value: number | string | Array<number | string> | undefined) => {
    if (value === undefined) return '';
    if (typeof value === 'number') {
      return `$${value.toFixed(2)}`;
    }
    return value;
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="mb-4">
        {title && <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>}
        {timeframe && <p className="text-sm text-gray-500">{timeframe}</p>}
      </div>

      {/* Chart */}
      <div className="mb-4">
        {chartType === 'pie' || chartType === 'donut' ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={chartType === 'donut' ? 60 : 0}
                outerRadius={100}
                fill="#8884d8"
                label={renderCustomLabel}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={formatTooltipValue}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="category" 
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={formatTooltipValue}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px'
                }}
              />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded-full flex-shrink-0" 
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{item.category}</p>
              <p className="text-xs text-gray-500">
                ${item.amount?.toFixed(2)} ({item.percentage?.toFixed(1) || ((item.amount / total) * 100).toFixed(1)}%)
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">Total</span>
          <span className="text-xl font-bold text-purple-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Jedi wisdom */}
      <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
        <p className="text-sm text-purple-800 italic">
          💫 "Control your expenses, you must. To financial freedom, it leads." - Master Yoda
        </p>
      </div>
    </div>
  );
}