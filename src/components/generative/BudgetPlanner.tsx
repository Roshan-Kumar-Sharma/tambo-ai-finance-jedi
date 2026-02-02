'use client';

import React, { useState } from 'react';
import { useTamboComponentState, useTamboStreamStatus } from '@tambo-ai/react';
import { BudgetPlannerProps } from '@/lib/schemas/componentSchemas';

export default function BudgetPlanner({
  budgets,
  totalBudget,
}: BudgetPlannerProps) {
  const { streamStatus } = useTamboStreamStatus();
  const [state, setState] = useTamboComponentState('budget-planner', { budgets });
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  if (!streamStatus?.isSuccess) {
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  const currentBudgets = state?.budgets || budgets || [];
  const total = currentBudgets.reduce((sum, b) => sum + (b?.allocated || 0), 0);
  const spent = currentBudgets.reduce((sum, b) => sum + (b?.spent || 0), 0);
  const remaining = total - spent;

  const handleEdit = (category: string, currentValue: number) => {
    setEditingCategory(category);
    setEditValue(currentValue.toString());
  };

  const handleSave = () => {
    if (!editingCategory || !state) return;
    
    const newValue = parseFloat(editValue);
    if (isNaN(newValue) || newValue < 0) return;

    const updatedBudgets = currentBudgets.map(budget => {
      if (budget?.category === editingCategory) {
        const newRemaining = newValue - (budget?.spent || 0);
        return {
          ...budget,
          allocated: newValue,
          remaining: newRemaining,
        };
      }
      return budget;
    });

    setState({ budgets: updatedBudgets });
    setEditingCategory(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setEditValue('');
  };

  const getPercentUsed = (spent: number, allocated: number) => {
    if (!allocated || allocated === 0) return 0;
    return Math.min((spent / allocated) * 100, 100);
  };

  const getProgressColor = (percent: number) => {
    if (percent >= 100) return 'bg-red-500';
    if (percent >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Budget Planner</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-gray-600 mb-1">Total Budget</p>
          <p className="text-lg font-bold text-blue-600">${total.toFixed(2)}</p>
        </div>
        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
          <p className="text-xs text-gray-600 mb-1">Total Spent</p>
          <p className="text-lg font-bold text-red-600">${spent.toFixed(2)}</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xs text-gray-600 mb-1">Remaining</p>
          <p className="text-lg font-bold text-green-600">${remaining.toFixed(2)}</p>
        </div>
      </div>

      <div className="space-y-3">
        {currentBudgets.map((budget, index) => {
          if (!budget) return null;
          
          const category = budget.category || '';
          const allocated = budget.allocated || 0;
          const budgetSpent = budget.spent || 0;
          const budgetRemaining = budget.remaining || 0;
          const percent = getPercentUsed(budgetSpent, allocated);
          const isEditing = editingCategory === category;

          return (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{category}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                          min="0"
                          step="0.01"
                        />
                        <button
                          onClick={handleSave}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-3 py-1 bg-gray-400 text-white rounded text-sm hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm text-gray-600">
                          Allocated: <span className="font-medium">${allocated.toFixed(2)}</span>
                        </span>
                        <button
                          onClick={() => handleEdit(category, allocated)}
                          className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Spent: ${budgetSpent.toFixed(2)}</p>
                  <p className={`text-sm font-medium ${budgetRemaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {budgetRemaining >= 0 ? 'Remaining' : 'Over'}: ${Math.abs(budgetRemaining).toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressColor(percent)}`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{percent.toFixed(1)}% used</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}