'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, TrendingDown, Sparkles, RotateCcw, Check } from 'lucide-react';
import { calculateWhatIf, generateMonthlyForecast } from '@/lib/utils/predictions';
import type { WhatIfScenario } from '@/lib/utils/predictions';

export default function WhatIfSimulator() {
  const [incomeChange, setIncomeChange] = useState(0);
  const [expenseChange, setExpenseChange] = useState(0);
  const [diningChange, setDiningChange] = useState(0);
  const [shoppingChange, setShoppingChange] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const baseForecast = generateMonthlyForecast(6);
  const scenario: WhatIfScenario = {
    incomeChange,
    expenseChange: expenseChange + diningChange + shoppingChange,
    categoryChanges: [
      { category: 'Food', change: diningChange },
      { category: 'Shopping', change: shoppingChange },
    ],
  };
  
  const simulatedForecast = isSimulating ? calculateWhatIf(scenario, 6) : baseForecast;
  
  const totalSavingsBase = baseForecast.reduce((sum, f) => sum + f.savings, 0);
  const totalSavingsSimulated = simulatedForecast.reduce((sum, f) => sum + f.savings, 0);
  const savingsDifference = totalSavingsSimulated - totalSavingsBase;

  const handleSimulate = () => {
    setIsSimulating(true);
  };

  const handleReset = () => {
    setIncomeChange(0);
    setExpenseChange(0);
    setDiningChange(0);
    setShoppingChange(0);
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Calculator className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              What-If Simulator
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </h2>
            <p className="text-gray-400 text-sm">Test different financial scenarios</p>
          </div>
        </div>
      </div>

      {/* Scenario Controls */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-6">Adjust Your Scenario</h3>
        
        <div className="space-y-6">
          {/* Income Change */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-300 font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                Income Change
              </label>
              <span className={`font-bold ${incomeChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {incomeChange >= 0 ? '+' : ''}${incomeChange}
              </span>
            </div>
            <input
              type="range"
              min="-1000"
              max="1000"
              step="50"
              value={incomeChange}
              onChange={(e) => setIncomeChange(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>-$1000</span>
              <span>$0</span>
              <span>+$1000</span>
            </div>
          </div>

          {/* Overall Expense Change */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-300 font-medium flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                Overall Expenses
              </label>
              <span className={`font-bold ${expenseChange <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {expenseChange >= 0 ? '+' : ''}${expenseChange}
              </span>
            </div>
            <input
              type="range"
              min="-500"
              max="500"
              step="25"
              value={expenseChange}
              onChange={(e) => setExpenseChange(Number(e.target.value))}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>-$500</span>
              <span>$0</span>
              <span>+$500</span>
            </div>
          </div>

          {/* Dining Change */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-300 font-medium">Dining Out</label>
              <span className={`font-bold ${diningChange <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {diningChange >= 0 ? '+' : ''}${diningChange}
              </span>
            </div>
            <input
              type="range"
              min="-200"
              max="200"
              step="10"
              value={diningChange}
              onChange={(e) => setDiningChange(Number(e.target.value))}
            />
            <p className="text-xs text-gray-500 mt-2">
              {Math.abs(diningChange / 3.2).toFixed(0)}% change in food spending
            </p>
          </div>

          {/* Shopping Change */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-gray-300 font-medium">Shopping</label>
              <span className={`font-bold ${shoppingChange <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {shoppingChange >= 0 ? '+' : ''}${shoppingChange}
              </span>
            </div>
            <input
              type="range"
              min="-200"
              max="200"
              step="10"
              value={shoppingChange}
              onChange={(e) => setShoppingChange(Number(e.target.value))}
            />
            <p className="text-xs text-gray-500 mt-2">
              {Math.abs(shoppingChange / 3.4).toFixed(0)}% change in shopping
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSimulate}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Run Simulation
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>

      {/* Results - keeping existing implementation */}
      {isSimulating && (
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6 animate-in fade-in duration-500">
          <div className="flex items-center gap-2 mb-4">
            <Check className="w-5 h-5 text-green-400" />
            <h3 className="text-white font-semibold">Simulation Results</h3>
          </div>

          {/* Impact Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
              <p className="text-gray-400 text-xs mb-1">6-Month Savings</p>
              <p className={`text-2xl font-bold ${savingsDifference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {savingsDifference >= 0 ? '+' : ''}${savingsDifference.toLocaleString()}
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
              <p className="text-gray-400 text-xs mb-1">Monthly Average</p>
              <p className={`text-2xl font-bold ${savingsDifference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {savingsDifference >= 0 ? '+' : ''}${Math.round(savingsDifference / 6).toLocaleString()}
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
              <p className="text-gray-400 text-xs mb-1">Annual Impact</p>
              <p className={`text-2xl font-bold ${savingsDifference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {savingsDifference >= 0 ? '+' : ''}${(savingsDifference * 2).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Comparison Chart */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>Month</span>
              <div className="flex gap-8">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded" />
                  Baseline
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded" />
                  Simulated
                </span>
              </div>
            </div>
            
            {simulatedForecast.map((forecast, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300 font-medium w-12">{forecast.month}</span>
                  <div className="flex-1 flex gap-2 ml-4">
                    <div className="flex-1 relative h-8">
                      <div 
                        className="absolute inset-y-0 left-0 bg-gray-700/50 rounded flex items-center justify-end pr-2"
                        style={{ width: `${(baseForecast[index].savings / 1000) * 100}%` }}
                      >
                        <span className="text-xs text-gray-400">${baseForecast[index].savings}</span>
                      </div>
                    </div>
                    <div className="flex-1 relative h-8">
                      <div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded flex items-center justify-end pr-2"
                        style={{ width: `${(forecast.savings / 1000) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">${forecast.savings}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Goal Impact */}
          {savingsDifference > 0 && (
            <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium mb-1">Goal Impact Analysis</h4>
                  <p className="text-gray-300 text-sm">
                    With these changes, you could reach your vacation goal{' '}
                    <span className="text-green-400 font-semibold">
                      {Math.round(savingsDifference / 200)} months earlier
                    </span>
                    {' '}and save an extra{' '}
                    <span className="text-green-400 font-semibold">
                      ${(savingsDifference * 2).toLocaleString()}
                    </span>
                    {' '}annually.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}