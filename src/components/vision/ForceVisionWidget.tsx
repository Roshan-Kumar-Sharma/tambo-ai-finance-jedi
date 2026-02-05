'use client';

import React from 'react';
import { Eye, TrendingUp, AlertTriangle, Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { generateMonthlyForecast } from '@/lib/utils/predictions';

export default function ForceVisionWidget() {
  const router = useRouter();
  const forecasts = generateMonthlyForecast(3);
  const avgConfidence = Math.round(forecasts.reduce((sum, f) => sum + f.confidence, 0) / forecasts.length);
  const totalSavings = forecasts.reduce((sum, f) => sum + f.savings, 0);

  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Eye className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold flex items-center gap-2">
              Force Vision
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            </h3>
            <p className="text-gray-400 text-xs">AI Predictions</p>
          </div>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-400 text-xs">Prediction Confidence</p>
          <p className="text-purple-400 font-bold text-lg">{avgConfidence}%</p>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-1000"
            style={{ width: `${avgConfidence}%` }}
          />
        </div>
      </div>

      {/* Quick Forecasts */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">3-Month Savings</span>
          <span className="text-green-400 font-semibold">${totalSavings.toLocaleString()}</span>
        </div>
        
        {forecasts.slice(0, 2).map((forecast, index) => (
          <div key={index} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm font-medium">{forecast.month}</span>
              <span className="text-xs text-gray-500">{forecast.confidence}%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-green-400">+${forecast.income.toLocaleString()}</span>
              <span className="text-red-400">-${forecast.expenses.toLocaleString()}</span>
              <span className="text-blue-400 font-semibold">=${forecast.savings}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Insights */}
      <div className="space-y-2 mb-4">
        <div className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
          <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-yellow-300 text-xs">
            73% overdraft risk detected for next month
          </p>
        </div>
        
        <div className="flex items-start gap-2 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
          <Lightbulb className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-green-300 text-xs">
            Save $300/year by switching phone plan
          </p>
        </div>
      </div>

      {/* Open Force Vision Button */}
      <button
        onClick={() => router.push('/vision')}
        className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 group"
      >
        <span>View Full Predictions</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="text-center">
          <p className="text-gray-500 text-xs mb-1">Accuracy</p>
          <p className="text-white font-bold">94%</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-xs mb-1">Predictions</p>
          <p className="text-white font-bold">247</p>
        </div>
      </div>
    </div>
  );
}