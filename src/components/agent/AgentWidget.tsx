'use client';

import React from 'react';
import { Bot, Clock, CheckCircle, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { mockAgentActions } from '@/lib/data/mockData';

export default function AgentWidget() {
  const router = useRouter();
  const pendingActions = mockAgentActions.filter(a => a.status === 'pending');
  const executedToday = mockAgentActions.filter(a => 
    a.status === 'executed' && 
    a.executedAt && 
    new Date(a.executedAt).toDateString() === new Date().toDateString()
  );

  const handleViewAgent = () => {
    router.push('/agent');
  };

  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Bot className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold flex items-center gap-2">
              R2-D2 AutoPilot
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            </h3>
            <p className="text-gray-400 text-xs">Active and monitoring</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-yellow-400" />
            <p className="text-gray-400 text-xs">Pending</p>
          </div>
          <p className="text-2xl font-bold text-white">{pendingActions.length}</p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <p className="text-gray-400 text-xs">Today</p>
          </div>
          <p className="text-2xl font-bold text-white">{executedToday.length}</p>
        </div>
      </div>

      {/* Recent Actions Preview */}
      {pendingActions.length > 0 && (
        <div className="space-y-2 mb-4">
          <p className="text-gray-400 text-xs font-medium">Actions Requiring Approval:</p>
          {pendingActions.slice(0, 2).map((action) => (
            <div
              key={action.id}
              className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-3 text-sm"
            >
              <p className="text-white font-medium mb-1">{action.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-xs">
                  {action.confidence}% confidence
                </p>
                {action.amount && (
                  <p className="text-blue-400 text-xs font-medium">
                    ${action.amount.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          ))}
          {pendingActions.length > 2 && (
            <p className="text-gray-500 text-xs text-center">
              +{pendingActions.length - 2} more pending
            </p>
          )}
        </div>
      )}

      {/* Savings Summary */}
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs mb-1">Potential Savings</p>
            <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
              $346
            </p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-400/50" />
        </div>
      </div>

      {/* View Full Dashboard Button */}
      <button
        onClick={handleViewAgent}
        className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 group"
      >
        <span>View Agent Dashboard</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Status Indicator */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <p className="text-gray-500 text-xs">Agent is active</p>
      </div>
    </div>
  );
}