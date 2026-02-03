'use client';

import React, { useState } from 'react';
import { Bot, CheckCircle, XCircle, Clock, AlertCircle, TrendingUp, DollarSign, Calendar, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { AgentAction } from '@/types/finance';
import { mockAgentActions } from '@/lib/data/mockData';

export default function AgentDashboard() {
  const [actions, setActions] = useState<AgentAction[]>(mockAgentActions);
  const [filter, setFilter] = useState<'all' | 'pending' | 'executed' | 'rejected'>('all');

  const handleApprove = (actionId: string) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: 'executed', executedAt: new Date() }
        : action
    ));
  };

  const handleReject = (actionId: string) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: 'rejected' }
        : action
    ));
  };

  const filteredActions = actions.filter(action => 
    filter === 'all' || action.status === filter
  );

  const pendingCount = actions.filter(a => a.status === 'pending').length;
  const executedCount = actions.filter(a => a.status === 'executed').length;

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'payment': return <DollarSign className="w-5 h-5" />;
      case 'transfer': return <TrendingUp className="w-5 h-5" />;
      case 'budget_adjust': return <Calendar className="w-5 h-5" />;
      case 'alert': return <AlertCircle className="w-5 h-5" />;
      case 'subscription_cancel': return <XCircle className="w-5 h-5" />;
      case 'negotiation': return <Sparkles className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'executed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            Executed
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Bot className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              R2-D2 AutoPilot
              <ShieldCheck className="w-6 h-6 text-green-400" />
            </h2>
            <p className="text-gray-400 text-sm">Your autonomous financial guardian</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs mb-1">Pending Actions</p>
                <p className="text-3xl font-bold text-yellow-400">{pendingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400/50" />
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs mb-1">Executed Today</p>
                <p className="text-3xl font-bold text-green-400">{executedCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400/50" />
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs mb-1">Potential Savings</p>
                <p className="text-3xl font-bold text-blue-400">$346</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-400/50" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { value: 'all', label: 'All Actions' },
          { value: 'pending', label: 'Pending' },
          { value: 'executed', label: 'Executed' },
          { value: 'rejected', label: 'Rejected' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value as any)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
              filter === tab.value
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Actions List */}
      <div className="space-y-4">
        {filteredActions.length === 0 ? (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No actions to display</p>
          </div>
        ) : (
          filteredActions.map((action) => (
            <div
              key={action.id}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-xl ${
                    action.status === 'executed' ? 'bg-green-500/20' :
                    action.status === 'rejected' ? 'bg-red-500/20' :
                    'bg-blue-500/20'
                  }`}>
                    {getActionIcon(action.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white font-semibold">{action.description}</h3>
                      {getStatusBadge(action.status)}
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-3">{action.reasoning}</p>
                    
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {action.createdAt.toLocaleString()}
                      </span>
                      
                      {action.amount && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ${action.amount.toFixed(2)}
                        </span>
                      )}
                      
                      <span className={`flex items-center gap-1 font-medium ${getConfidenceColor(action.confidence)}`}>
                        <Sparkles className="w-3 h-3" />
                        {action.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {action.status === 'pending' && (
                <div className="flex gap-3 mt-4 pt-4 border-t border-slate-700/50">
                  <button
                    onClick={() => handleApprove(action.id)}
                    className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(action.id)}
                    className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              )}

              {action.status === 'executed' && action.executedAt && (
                <div className="mt-4 pt-4 border-t border-slate-700/50">
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    Executed on {action.executedAt.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Info Banner */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-white font-medium mb-1">How R2-D2 Works</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              R2-D2 continuously monitors your finances and takes autonomous actions based on your configured rules. 
              High-confidence, low-risk actions are executed automatically, while complex decisions require your approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}