'use client';

import React, { useState } from 'react';
import { useTamboComponentState, useTamboStreamStatus } from '@tambo-ai/react';
import { GoalsBoardProps } from '@/lib/schemas/componentSchemas';
import { Target, Calendar, TrendingUp } from 'lucide-react';

export default function GoalsBoard({ goals }: GoalsBoardProps) {
  const { streamStatus } = useTamboStreamStatus();
  const [state, setState] = useTamboComponentState('goals-board', { goals });
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
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

  const currentGoals = state?.goals || goals || [];
  const totalTarget = currentGoals.reduce((sum, g) => sum + (g?.targetAmount || 0), 0);
  const totalCurrent = currentGoals.reduce((sum, g) => sum + (g?.currentAmount || 0), 0);
  const overallProgress = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;

  const handleEdit = (id: string, currentValue: number) => {
    setEditingGoal(id);
    setEditValue(currentValue.toString());
  };

  const handleSave = () => {
    if (!editingGoal || !state) return;
    
    const newValue = parseFloat(editValue);
    if (isNaN(newValue) || newValue < 0) return;

    const updatedGoals = currentGoals.map(goal => {
      if (goal?.id === editingGoal) {
        return { ...goal, currentAmount: newValue };
      }
      return goal;
    });

    setState({ goals: updatedGoals });
    setEditingGoal(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingGoal(null);
    setEditValue('');
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No deadline';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const getProgressPercent = (current: number, target: number) => {
    if (!target || target === 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (percent: number) => {
    if (percent >= 100) return 'bg-green-500';
    if (percent >= 75) return 'bg-blue-500';
    if (percent >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Goals Board</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-xs text-gray-600 mb-1">Total Goals</p>
          <p className="text-lg font-bold text-purple-600">{currentGoals.length}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-gray-600 mb-1">Target Amount</p>
          <p className="text-lg font-bold text-blue-600">${totalTarget.toFixed(2)}</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xs text-gray-600 mb-1">Overall Progress</p>
          <p className="text-lg font-bold text-green-600">{overallProgress.toFixed(1)}%</p>
        </div>
      </div>

      <div className="space-y-4">
        {currentGoals.map((goal, index) => {
          if (!goal) return null;
          
          const id = goal.id || `goal-${index}`;
          const name = goal.name || 'Unnamed Goal';
          const targetAmount = goal.targetAmount || 0;
          const currentAmount = goal.currentAmount || 0;
          const deadline = goal.deadline || '';
          const category = goal.category || 'Other';
          const progress = getProgressPercent(currentAmount, targetAmount);
          const remaining = targetAmount - currentAmount;
          const isEditing = editingGoal === id;

          return (
            <div key={id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-gray-800">{name}</h4>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(deadline)}
                    </span>
                    <span>{category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    ${targetAmount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">Target</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Current: $</span>
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
                        className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-2 py-1 bg-gray-400 text-white rounded text-xs hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-sm text-gray-600">
                        ${currentAmount.toFixed(2)} saved
                      </span>
                      <button
                        onClick={() => handleEdit(id, currentAmount)}
                        className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 flex items-center gap-1"
                      >
                        <TrendingUp className="w-3 h-3" />
                        Update
                      </button>
                    </>
                  )}
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${getProgressColor(progress)}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">{progress.toFixed(1)}% complete</span>
                  <span className={`text-xs font-medium ${remaining > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                    {remaining > 0 ? `$${remaining.toFixed(2)} to go` : 'Goal reached!'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {currentGoals.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Target className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>No financial goals yet</p>
        </div>
      )}
    </div>
  );
}