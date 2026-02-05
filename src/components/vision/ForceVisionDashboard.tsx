'use client';

import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, Lightbulb, Target, Calendar, Sparkles, ChevronRight } from 'lucide-react';
import { generateMonthlyForecast, generateGoalPredictions, generateRiskAlerts, generateOpportunities, generateCategoryForecast } from '@/lib/utils/predictions';
import type { MonthlyForecast, GoalPrediction, RiskAlert, Opportunity } from '@/lib/utils/predictions';

export default function ForceVisionDashboard() {
  const [timeframe, setTimeframe] = useState<3 | 6 | 12>(6);
  const [forecasts, setForecasts] = useState<MonthlyForecast[]>(generateMonthlyForecast(6));
  const goalPredictions = generateGoalPredictions();
  const riskAlerts = generateRiskAlerts();
  const opportunities = generateOpportunities();
  const categoryForecasts = generateCategoryForecast();

  const handleTimeframeChange = (months: 3 | 6 | 12) => {
    setTimeframe(months);
    setForecasts(generateMonthlyForecast(months));
  };

  const avgConfidence = Math.round(forecasts.reduce((sum, f) => sum + f.confidence, 0) / forecasts.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Force Vision
              <span className="text-sm font-normal text-purple-300">Predictive Analytics</span>
            </h2>
            <p className="text-gray-400 text-sm">See your financial future before it happens</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <p className="text-gray-400 text-xs mb-1">Average Confidence</p>
            <p className="text-3xl font-bold text-purple-400">{avgConfidence}%</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <p className="text-gray-400 text-xs mb-1">Forecast Accuracy</p>
            <p className="text-3xl font-bold text-blue-400">94%</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <p className="text-gray-400 text-xs mb-1">Predictions Made</p>
            <p className="text-3xl font-bold text-green-400">247</p>
          </div>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2">
        {[3, 6, 12].map((months) => (
          <button
            key={months}
            onClick={() => handleTimeframeChange(months as 3 | 6 | 12)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              timeframe === months
                ? 'bg-purple-500 text-white'
                : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50'
            }`}
          >
            {months} Months
          </button>
        ))}
      </div>

      {/* Forecast Chart */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          Income & Expense Forecast
        </h3>
        
        <div className="space-y-4">
          {forecasts.map((forecast, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300 font-medium">{forecast.month}</span>
                <div className="flex items-center gap-4">
                  <span className="text-green-400">↑ ${forecast.income.toLocaleString()}</span>
                  <span className="text-red-400">↓ ${forecast.expenses.toLocaleString()}</span>
                  <span className="text-blue-400 font-semibold">${forecast.savings.toLocaleString()}</span>
                  <span className="text-gray-500 text-xs">{forecast.confidence}%</span>
                </div>
              </div>
              
              <div className="flex gap-2 h-8">
                <div 
                  className="bg-green-500/30 rounded flex items-center justify-center text-xs text-green-300"
                  style={{ width: `${(forecast.income / 5000) * 100}%` }}
                >
                  {forecast.income > 3000 && 'Income'}
                </div>
                <div 
                  className="bg-red-500/30 rounded flex items-center justify-center text-xs text-red-300"
                  style={{ width: `${(forecast.expenses / 5000) * 100}%` }}
                >
                  {forecast.expenses > 2500 && 'Expenses'}
                </div>
              </div>
              
              {/* Confidence Indicator */}
              <div className="w-full bg-gray-700 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-500 h-full rounded-full"
                  style={{ width: `${forecast.confidence}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Forecasts */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          Category Predictions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryForecasts.map((cat) => (
            <div key={cat.category} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">{cat.category}</h4>
                <span className={`flex items-center gap-1 text-xs font-medium ${
                  cat.trend === 'up' ? 'text-red-400' :
                  cat.trend === 'down' ? 'text-green-400' :
                  'text-gray-400'
                }`}>
                  {cat.trend === 'up' ? '↗' : cat.trend === 'down' ? '↘' : '→'}
                  {cat.trend}
                </span>
              </div>
              
              <div className="flex items-end justify-between mb-2">
                <div>
                  <p className="text-gray-400 text-xs">Current</p>
                  <p className="text-white font-semibold">${cat.current}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Predicted</p>
                  <p className="text-purple-400 font-semibold">${cat.predicted}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Confidence: {cat.confidence}%</span>
                <span className={cat.predicted > cat.current ? 'text-red-400' : 'text-green-400'}>
                  {cat.predicted > cat.current ? '+' : ''}${(cat.predicted - cat.current).toFixed(0)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goal Predictions */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-400" />
          Goal Achievement Predictions
        </h3>
        
        <div className="space-y-4">
          {goalPredictions.map((goal) => (
            <div key={goal.goalId} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium mb-1">{goal.goalName}</h4>
                  <p className="text-gray-400 text-sm">
                    ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    goal.probability >= 75 ? 'bg-green-500/20 text-green-400' :
                    goal.probability >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {goal.probability}% likely
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Predicted Completion</p>
                  <p className="text-white text-sm font-medium">
                    {goal.predictedCompletionDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Required Monthly</p>
                  <p className="text-purple-400 text-sm font-medium">
                    ${goal.requiredMonthlySavings.toLocaleString()}/mo
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full"
                  style={{ width: `${goal.probability}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Alerts */}
      <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          Risk Alerts
        </h3>
        
        <div className="space-y-3">
          {riskAlerts.map((risk) => (
            <div key={risk.id} className="bg-slate-900/50 rounded-lg p-4 border border-red-500/20">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  risk.severity === 'high' ? 'bg-red-500/20' :
                  risk.severity === 'medium' ? 'bg-yellow-500/20' :
                  'bg-blue-500/20'
                }`}>
                  <AlertTriangle className={`w-5 h-5 ${
                    risk.severity === 'high' ? 'text-red-400' :
                    risk.severity === 'medium' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-medium">{risk.description}</h4>
                    <span className="text-red-400 text-sm font-bold">{risk.probability}%</span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-2">
                    Impact: ${risk.impact.toLocaleString()}
                  </p>
                  
                  <div className="bg-slate-800/50 rounded p-3 border border-slate-700/30">
                    <p className="text-blue-300 text-sm flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      {risk.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities */}
      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-green-400" />
          Savings Opportunities
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunities.map((opp) => (
            <div key={opp.id} className="bg-slate-900/50 rounded-lg p-4 border border-green-500/20 hover:border-green-500/40 transition-all cursor-pointer group">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-white font-medium group-hover:text-green-400 transition-colors">
                  {opp.title}
                </h4>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
              </div>
              
              <p className="text-gray-400 text-sm mb-3">{opp.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-gray-500 text-xs">Potential Savings</p>
                    <p className="text-green-400 font-bold text-lg">
                      ${opp.potentialSavings.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Effort</p>
                    <p className={`text-xs font-medium ${
                      opp.effort === 'low' ? 'text-green-400' :
                      opp.effort === 'medium' ? 'text-yellow-400' :
                      'text-orange-400'
                    }`}>
                      {opp.effort.toUpperCase()}
                    </p>
                  </div>
                </div>
                <span className="text-gray-500 text-xs">{opp.timeframe}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}