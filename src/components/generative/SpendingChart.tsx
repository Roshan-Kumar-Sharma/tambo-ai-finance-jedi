// components/generative/SpendingChart.tsx - Fixed with proper Tailwind
'use client';

import React from 'react';
import { useTamboStreamStatus } from '@tambo-ai/react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { SpendingChartProps } from '@/lib/schemas/componentSchemas';
import { TrendingDown, Sparkles } from 'lucide-react';

const COLORS = ['#4a90e2', '#2ecc71', '#9b59b6', '#f39c12', '#e74c3c', '#00d4ff', '#ff6b9d', '#34495e'];

export default function SpendingChart({ 
  data, 
  chartType = 'pie', 
  title,
  timeframe 
}: SpendingChartProps) {
  const { streamStatus } = useTamboStreamStatus();

  if (!streamStatus?.isSuccess) {
    return (
      <div className="w-full p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
            <Sparkles className="w-6 h-6 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-gray-400 text-sm animate-pulse">Analyzing your spending patterns...</p>
        </div>
      </div>
    );
  }

  const chartData = data.map((item, index) => ({
    ...item,
    color: item.color || COLORS[index % COLORS.length],
  }));

  const total = chartData.reduce((sum, item) => sum + (item.amount || 0), 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3 shadow-xl">
        <p className="text-white font-semibold mb-1">{data.category}</p>
        <p className="text-blue-300 text-sm">${data.amount?.toFixed(2)}</p>
        <p className="text-gray-400 text-xs mt-1">
          {((data.amount / total) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  };

  const renderCustomLabel = (entry: any) => {
    const percent = ((entry.value / total) * 100).toFixed(0);
    return `${percent}%`;
  };

  return (
    <div className="w-full p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-blue-500/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-bold text-white">{title || 'Spending Breakdown'}</h3>
          </div>
          {timeframe && (
            <p className="text-sm text-gray-400">{timeframe}</p>
          )}
        </div>
        <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30">
          <span className="text-xs font-medium text-blue-300">{chartType.toUpperCase()}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6" style={{ height: '300px' }}>
        {chartType === 'pie' || chartType === 'donut' ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={chartType === 'donut' ? 100 : 110}
                innerRadius={chartType === 'donut' ? 60 : 0}
                dataKey="amount"
                animationBegin={0}
                animationDuration={800}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="category" 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                axisLine={{ stroke: '#374151' }}
              />
              <YAxis 
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
                axisLine={{ stroke: '#374151' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="amount" 
                radius={[8, 8, 0, 0]}
                animationBegin={0}
                animationDuration={800}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3">
        {chartData.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-slate-600/20" 
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{item.category}</p>
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-gray-400">
                  ${item.amount?.toFixed(2)}
                </p>
                <p className="text-xs text-blue-400 font-medium">
                  {((item.amount / total) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 pt-6 border-t border-slate-700/50">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-300">Total Spending</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Wisdom */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5 animate-pulse" />
          <p className="text-sm text-blue-200 italic leading-relaxed">
            "Control your expenses, you must. To financial freedom, it leads." 
            <span className="text-gray-400 not-italic"> — Master Yoda</span>
          </p>
        </div>
      </div>
    </div>
  );
}