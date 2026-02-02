// components/generative/BudgetSummary.tsx
'use client';

import React from 'react';
import { useTamboStreamStatus } from '@tambo-ai/react';
import { BudgetSummaryProps } from '@/lib/schemas/componentSchemas';
import { TrendingUp, TrendingDown, PiggyBank, Award, Sparkles } from 'lucide-react';

export default function BudgetSummary({
  totalIncome,
  totalExpenses,
  totalSavings,
  savingsRate,
  topCategory,
  message
}: BudgetSummaryProps) {
  const { streamStatus } = useTamboStreamStatus();

  if (!streamStatus?.isSuccess) {
    return (
      <div className="w-full p-6 finance-card">
        <div className="flex items-center justify-center h-48">
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  const netIncome = totalIncome - totalExpenses;
  const isPositive = netIncome >= 0;

  // Determine financial health status
  const getHealthStatus = () => {
    if (savingsRate >= 20) return { text: 'Jedi Master', color: 'from-green-500 to-emerald-500', icon: Award };
    if (savingsRate >= 10) return { text: 'Jedi Knight', color: 'from-blue-500 to-cyan-500', icon: Sparkles };
    if (savingsRate >= 5) return { text: 'Padawan', color: 'from-yellow-500 to-orange-500', icon: TrendingUp };
    return { text: 'Youngling', color: 'from-red-500 to-pink-500', icon: TrendingDown };
  };

  const health = getHealthStatus();
  const HealthIcon = health.icon;

  return (
    <div className="w-full p-6 finance-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <PiggyBank className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Financial Overview</h3>
            <p className="text-sm text-gray-400">Your current financial health</p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${health.color} flex items-center gap-2`}>
          <HealthIcon className="w-4 h-4 text-white" />
          <span className="text-sm font-semibold text-white">{health.text}</span>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* Income */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <p className="text-sm text-gray-400">Income</p>
          </div>
          <p className="text-2xl font-bold text-green-400">${totalIncome.toFixed(2)}</p>
        </div>

        {/* Expenses */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-400" />
            <p className="text-sm text-gray-400">Expenses</p>
          </div>
          <p className="text-2xl font-bold text-red-400">${totalExpenses.toFixed(2)}</p>
        </div>

        {/* Savings */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <PiggyBank className="w-4 h-4 text-blue-400" />
            <p className="text-sm text-gray-400">Savings</p>
          </div>
          <p className="text-2xl font-bold text-blue-400">${totalSavings.toFixed(2)}</p>
        </div>
      </div>

      {/* Savings Rate Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Savings Rate</span>
          <span className="text-lg font-bold text-blue-400">{savingsRate.toFixed(1)}%</span>
        </div>
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
          <div 
            className={`h-full bg-gradient-to-r ${health.color} transition-all duration-1000 ease-out`}
            style={{ width: `${Math.min(savingsRate, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Net Income */}
      <div className={`p-4 rounded-xl border ${isPositive ? 'bg-green-500/5 border-green-500/30' : 'bg-red-500/5 border-red-500/30'} mb-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isPositive ? (
              <TrendingUp className="w-5 h-5 text-green-400" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-400" />
            )}
            <span className="text-gray-300 font-medium">Net Income</span>
          </div>
          <span className={`text-xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}${netIncome.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Top Spending Category */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 mb-6">
        <p className="text-sm text-gray-400 mb-1">Top Spending Category</p>
        <p className="text-lg font-bold text-purple-300">{topCategory}</p>
      </div>

      {/* Personalized Message */}
      {message && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5 animate-pulse" />
            <div>
              <p className="text-sm text-blue-200 leading-relaxed">{message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}