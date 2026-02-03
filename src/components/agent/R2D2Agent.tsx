'use client';

import React, { useState } from 'react';
import { Bot, Settings, TrendingUp, Sparkles } from 'lucide-react';
import AgentDashboard from '@/components/agent/AgentDashboard';
import AgentSettings from '@/components/agent/AgentSettings';
import AgentPerformance from '@/components/agent/AgentPerformance';

type TabType = 'dashboard' | 'settings' | 'performance';

export default function R2D2Agent() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const tabs = [
    {
      id: 'dashboard' as TabType,
      label: 'Dashboard',
      icon: Bot,
      description: 'View and manage agent actions',
    },
    {
      id: 'settings' as TabType,
      label: 'Settings',
      icon: Settings,
      description: 'Configure agent behavior',
    },
    {
      id: 'performance' as TabType,
      label: 'Performance',
      icon: TrendingUp,
      description: 'Track agent metrics',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30">
              <Bot className="w-10 h-10 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-2">
                R2-D2 AutoPilot
              </h1>
              <p className="text-gray-400 text-lg">
                Your autonomous financial guardian powered by AI
              </p>
            </div>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Sparkles, text: 'Autonomous Actions', color: 'blue' },
              { icon: TrendingUp, text: 'Smart Optimizations', color: 'green' },
              { icon: Settings, text: 'Customizable Rules', color: 'purple' },
            ].map((badge, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-4 py-2 rounded-full bg-${badge.color}-500/10 border border-${badge.color}-500/30`}
              >
                <badge.icon className={`w-4 h-4 text-${badge.color}-400`} />
                <span className="text-sm text-gray-300">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-2 mb-6">
          <div className="grid grid-cols-3 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-transparent text-gray-400 hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Description */}
        <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 mb-6">
          <p className="text-gray-400 text-sm">
            {tabs.find(t => t.id === activeTab)?.description}
          </p>
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in duration-300">
          {activeTab === 'dashboard' && <AgentDashboard />}
          {activeTab === 'settings' && <AgentSettings />}
          {activeTab === 'performance' && <AgentPerformance />}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            R2-D2 AutoPilot is part of the FinanceJedi AI-powered financial management system
          </p>
          <p className="text-gray-600 text-xs mt-2">
            May the Financial Force be with you ✨
          </p>
        </div>
      </div>
    </div>
  );
}