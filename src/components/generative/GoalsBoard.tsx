// components/generative/GoalsBoard.tsx
'use client';

import React, { useState } from 'react';
import { useTamboComponentState, useTamboStreamStatus } from '@tambo-ai/react';
import { GoalsBoardProps } from '@/lib/schemas/componentSchemas';
import { Target, Calendar, TrendingUp, Edit2, Check, X, Sparkles } from 'lucide-react';

export default function GoalsBoard({ goals }: GoalsBoardProps) {
  const { streamStatus } = useTamboStreamStatus();
  const [state, setState] = useTamboComponentState('goals-board', { goals });
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

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

  const currentGoals = state?.goals || goals || [];

  const handleEditStart = (goalId: string, currentAmount: number) => {
    setEditingGoal(goalId);
    setEditValue(currentAmount.toString());
  };

  const handleEditSave = (goalId: string) => {
    if (!state) return;
    
    const newValue = parseFloat(editValue);
    if (isNaN(newValue) || newValue < 0) return;

    const updatedGoals = currentGoals.map(goal => 
      goal?.id === goalId 
        ? { ...goal, currentAmount: newValue }
        : goal
    );

    setState({ goals: updatedGoals });
    setEditingGoal(null);
    setEditValue('');
  };

  const handleEditCancel = () => {
    setEditingGoal(null);
    setEditValue('');
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 75) return 'from-green-500 to-emerald-500';
    if (percentage >= 50) return 'from-blue-500 to-cyan-500';
    if (percentage >= 25) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      vacation: 'from-purple-500 to-pink-500',
      emergency: 'from-red-500 to-orange-500',
      retirement: 'from-blue-500 to-cyan-500',
      education: 'from-green-500 to-emerald-500',
      home: 'from-yellow-500 to-orange-500',
      default: 'from-blue-500 to-purple-500',
    };
    return colors[category.toLowerCase()] || colors.default;
  };

  return (
    <div className="w-full p-6 finance-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Financial Goals</h3>
            <p className="text-sm text-gray-400">{currentGoals.length} active {currentGoals.length === 1 ? 'goal' : 'goals'}</p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
          <span className="text-xs font-medium text-purple-300">INTERACTIVE</span>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="space-y-4 mb-6">
        {currentGoals.map((goal, index) => {
          const progress = getProgressPercentage(goal?.currentAmount || 0, goal?.targetAmount || 1);
          const daysLeft = getDaysRemaining(goal?.deadline || '');
          const isEditing = editingGoal === goal?.id;

          return (
            <div 
              key={goal?.id || index}
              className="p-5 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group"
              style={{
                animation: `slide-up 0.6s ease-out backwards`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Goal Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-bold text-white">{goal?.name}</h4>
                    <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(goal?.category || '')} text-xs font-medium text-white`}>
                      {goal?.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? 'Due today' : 'Overdue'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm font-bold text-white">{progress.toFixed(0)}%</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                  <div 
                    className={`h-full bg-gradient-to-r ${getProgressColor(progress)} transition-all duration-1000 ease-out`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Amount Section */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-800 border border-blue-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter amount"
                        autoFocus
                      />
                      <button
                        onClick={() => handleEditSave(goal?.id || '')}
                        className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Current / Target</p>
                        <p className="text-lg font-bold">
                          <span className="text-blue-400">${goal?.currentAmount?.toFixed(2)}</span>
                          <span className="text-gray-500 mx-2">/</span>
                          <span className="text-purple-400">${goal?.targetAmount?.toFixed(2)}</span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          ${(goal?.targetAmount - goal?.currentAmount)?.toFixed(2)} remaining
                        </p>
                      </div>
                      <button
                        onClick={() => handleEditStart(goal?.id || '', goal?.currentAmount || 0)}
                        className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-colors group-hover:opacity-100 opacity-0"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Goal Status Badge */}
              {progress >= 100 && (
                <div className="mt-3 p-2 rounded-lg bg-green-500/20 border border-green-500/50 flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-300">Goal Completed! 🎉</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-center">
          <p className="text-xs text-gray-400 mb-1">Total Saved</p>
          <p className="text-lg font-bold text-blue-400">
            ${currentGoals.reduce((sum, g) => sum + (g?.currentAmount || 0), 0).toFixed(2)}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 text-center">
          <p className="text-xs text-gray-400 mb-1">Total Target</p>
          <p className="text-lg font-bold text-purple-400">
            ${currentGoals.reduce((sum, g) => sum + (g?.targetAmount || 0), 0).toFixed(2)}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-center">
          <p className="text-xs text-gray-400 mb-1">Completed</p>
          <p className="text-lg font-bold text-green-400">
            {currentGoals.filter(g => getProgressPercentage(g?.currentAmount || 0, g?.targetAmount || 1) >= 100).length}/{currentGoals.length}
          </p>
        </div>
      </div>

      {/* Jedi Wisdom */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5 animate-pulse" />
          <p className="text-sm text-purple-200 italic leading-relaxed">
            "A goal without a plan is just a wish. Set your targets, young Padawan." 
            <span className="text-gray-400 not-italic"> — Jedi Financial Council</span>
          </p>
        </div>
      </div>
    </div>
  );
}