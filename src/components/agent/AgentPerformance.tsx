'use client';

import React from 'react';
import { TrendingUp, Target, Award, Zap, DollarSign, Clock, CheckCircle, Shield } from 'lucide-react';

export default function AgentPerformance() {
  const performanceMetrics = {
    trustScore: 94,
    totalActions: 156,
    successRate: 97.4,
    timesSaved: '12.5 hours',
    moneySaved: 1247,
    accuracyRate: 95.8,
    monthlyGrowth: 15.3,
  };

  const recentAchievements = [
    {
      id: 1,
      title: 'Bill Payment Master',
      description: '50 bills paid automatically',
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      date: '2025-02-01',
    },
    {
      id: 2,
      title: 'Savings Champion',
      description: 'Saved $1,000+ through optimizations',
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      date: '2025-01-28',
    },
    {
      id: 3,
      title: 'Budget Guardian',
      description: '30-day streak of budget adherence',
      icon: Shield,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      date: '2025-01-25',
    },
  ];

  const activityLog = [
    { time: '2 hours ago', action: 'Paid Internet bill automatically', type: 'success' },
    { time: '5 hours ago', action: 'Detected potential overdraft, moved funds', type: 'warning' },
    { time: '1 day ago', action: 'Found unused subscription, suggested cancellation', type: 'info' },
    { time: '1 day ago', action: 'Optimized budget allocation, saved $40', type: 'success' },
    { time: '2 days ago', action: 'Transferred 10% to savings on payday', type: 'success' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500/20 rounded-xl">
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Agent Performance</h2>
            <p className="text-gray-400 text-sm">Track R2-D2's effectiveness and achievements</p>
          </div>
        </div>
      </div>

      {/* Trust Score Card */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Trust Score</h3>
              <p className="text-gray-400 text-sm">Based on accuracy and reliability</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              {performanceMetrics.trustScore}
            </div>
            <div className="text-gray-400 text-sm">out of 100</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${performanceMetrics.trustScore}%` }}
          />
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <p className="text-gray-400 text-xs">Total Actions</p>
          </div>
          <p className="text-2xl font-bold text-white">{performanceMetrics.totalActions}</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <p className="text-gray-400 text-xs">Success Rate</p>
          </div>
          <p className="text-2xl font-bold text-white">{performanceMetrics.successRate}%</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <p className="text-gray-400 text-xs">Time Saved</p>
          </div>
          <p className="text-2xl font-bold text-white">{performanceMetrics.timesSaved}</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <p className="text-gray-400 text-xs">Money Saved</p>
          </div>
          <p className="text-2xl font-bold text-white">${performanceMetrics.moneySaved}</p>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-6 h-6 text-yellow-400" />
          <h3 className="text-white font-semibold">Recent Achievements</h3>
        </div>
        
        <div className="space-y-3">
          {recentAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700/30 hover:border-blue-500/30 transition-all"
            >
              <div className={`p-3 ${achievement.bgColor} rounded-xl`}>
                <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium mb-1">{achievement.title}</h4>
                <p className="text-gray-400 text-sm mb-2">{achievement.description}</p>
                <p className="text-gray-500 text-xs">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-6 h-6 text-blue-400" />
          <h3 className="text-white font-semibold">Recent Activity</h3>
        </div>
        
        <div className="space-y-3">
          {activityLog.map((log, index) => (
            <div key={index} className="flex items-start gap-3 pb-3 border-b border-slate-700/30 last:border-0">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                log.type === 'success' ? 'bg-green-400' :
                log.type === 'warning' ? 'bg-yellow-400' :
                'bg-blue-400'
              }`} />
              <div className="flex-1">
                <p className="text-white text-sm">{log.action}</p>
                <p className="text-gray-500 text-xs mt-1">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-white font-medium mb-2">Performance Insights</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>• R2-D2 has maintained a <span className="text-white font-medium">{performanceMetrics.successRate}% success rate</span> over the past 30 days</p>
              <p>• Accuracy in detecting financial risks improved by <span className="text-white font-medium">{performanceMetrics.monthlyGrowth}%</span> this month</p>
              <p>• Agent has saved you an average of <span className="text-white font-medium">25 minutes per day</span> on financial tasks</p>
              <p>• Trust score increased from 89 to {performanceMetrics.trustScore} based on consistent performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}