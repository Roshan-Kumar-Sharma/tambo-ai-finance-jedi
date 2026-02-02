// components/generative/SavingsProjection.tsx
'use client';

import React from 'react';
import { useTamboStreamStatus } from '@tambo-ai/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { SavingsProjectionProps } from '@/lib/schemas/componentSchemas';
import { Target, TrendingUp, Sparkles } from 'lucide-react';

export default function SavingsProjection({
  currentSavings,
  monthlyContribution,
  projectionMonths,
  targetAmount,
  data
}: SavingsProjectionProps) {
  const { streamStatus } = useTamboStreamStatus();

  if (!streamStatus?.isSuccess) {
    return (
      <div className="w-full p-6 finance-card">
        <div className="flex items-center justify-center h-64">
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  const finalProjected = data[data.length - 1]?.projected || 0;
  const totalGrowth = finalProjected - currentSavings;
  const willReachTarget = targetAmount ? finalProjected >= targetAmount : false;

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900/95 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3 shadow-xl">
        <p className="text-white font-semibold mb-2">{data.month}</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-400">Projected:</span>
            <span className="text-blue-300 font-medium">${data.projected?.toFixed(2)}</span>
          </div>
          {data.target && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-400">Target:</span>
              <span className="text-purple-300 font-medium">${data.target?.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full p-6 finance-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Savings Projection</h3>
            <p className="text-sm text-gray-400">{projectionMonths} month forecast</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <p className="text-xs text-gray-400 mb-1">Current</p>
          <p className="text-lg font-bold text-blue-400">${currentSavings.toFixed(0)}</p>
        </div>
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
          <p className="text-xs text-gray-400 mb-1">Monthly</p>
          <p className="text-lg font-bold text-green-400">${monthlyContribution.toFixed(0)}</p>
        </div>
        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
          <p className="text-xs text-gray-400 mb-1">Projected</p>
          <p className="text-lg font-bold text-purple-400">${finalProjected.toFixed(0)}</p>
        </div>
        <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
          <p className="text-xs text-gray-400 mb-1">Growth</p>
          <p className="text-lg font-bold text-cyan-400">+${totalGrowth.toFixed(0)}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6" style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="projectedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4a90e2" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4a90e2" stopOpacity={0}/>
              </linearGradient>
              {targetAmount && (
                <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b59b6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#9b59b6" stopOpacity={0}/>
                </linearGradient>
              )}
            </defs>
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
              axisLine={{ stroke: '#374151' }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {targetAmount && (
              <Area
                type="monotone"
                dataKey="target"
                stroke="#9b59b6"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#targetGradient)"
                animationBegin={0}
                animationDuration={800}
              />
            )}
            
            <Area
              type="monotone"
              dataKey="projected"
              stroke="#4a90e2"
              strokeWidth={3}
              fill="url(#projectedGradient)"
              animationBegin={0}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Target Status */}
      {targetAmount && (
        <div className={`p-4 rounded-xl border mb-6 ${
          willReachTarget 
            ? 'bg-green-500/10 border-green-500/30' 
            : 'bg-yellow-500/10 border-yellow-500/30'
        }`}>
          <div className="flex items-center gap-3">
            <Target className={`w-5 h-5 ${willReachTarget ? 'text-green-400' : 'text-yellow-400'}`} />
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">Target Goal</p>
              <div className="flex items-center justify-between">
                <p className={`text-lg font-bold ${willReachTarget ? 'text-green-400' : 'text-yellow-400'}`}>
                  ${targetAmount.toFixed(2)}
                </p>
                <span className={`text-sm font-medium ${willReachTarget ? 'text-green-400' : 'text-yellow-400'}`}>
                  {willReachTarget 
                    ? '✓ On track to reach goal' 
                    : `Need $${(targetAmount - finalProjected).toFixed(2)} more`
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-blue-500 rounded" />
          <span className="text-sm text-gray-300">Projected Savings</span>
        </div>
        {targetAmount && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-purple-500 rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #9b59b6, #9b59b6 5px, transparent 5px, transparent 10px)' }} />
            <span className="text-sm text-gray-300">Target Goal</span>
          </div>
        )}
      </div>

      {/* Jedi Wisdom */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5 animate-pulse" />
          <p className="text-sm text-blue-200 italic leading-relaxed">
            "Save, you must. In the future, wealth you will find." 
            <span className="text-gray-400 not-italic"> — Master Yoda on compound interest</span>
          </p>
        </div>
      </div>
    </div>
  );
}