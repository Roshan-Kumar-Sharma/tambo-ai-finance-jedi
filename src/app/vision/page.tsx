// app/vision/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Bot, Volume2, MessageCircle, Sparkles, Eye, Calculator } from 'lucide-react';
import ForceVisionDashboard from '@/components/vision/ForceVisionDashboard';
import WhatIfSimulator from '@/components/vision/WhatIfSimulator';

type TabType = 'forecast' | 'simulator';

export default function ForceVisionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('forecast');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                  Force Vision
                </h1>
                <p className="text-xs text-gray-400">Predictive Financial Analytics</p>
              </div>
            </div>

            <nav className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden md:inline">Home</span>
              </button>
              <button
                onClick={() => router.push('/chat')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden md:inline">Chat</span>
              </button>
              <button
                onClick={() => router.push('/agent')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors"
              >
                <Bot className="w-4 h-4" />
                <span className="hidden md:inline">Agent</span>
              </button>
              <button
                onClick={() => router.push('/voice')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span className="hidden md:inline">Voice</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-6 py-3 rounded-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-purple-300 font-medium">AI-Powered Predictions</span>
            <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
            See Your Financial Future
          </h2>
          
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Advanced predictive analytics powered by AI. Forecast income, expenses, and goals 
            with confidence scores and what-if scenarios.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <p className="text-gray-400 text-xs">Predictions</p>
            </div>
            <p className="text-2xl font-bold text-white">247</p>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-blue-400" />
              <p className="text-gray-400 text-xs">Accuracy</p>
            </div>
            <p className="text-2xl font-bold text-white">94%</p>
            <p className="text-xs text-gray-500 mt-1">Historical</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-4 h-4 text-cyan-400" />
              <p className="text-gray-400 text-xs">Scenarios</p>
            </div>
            <p className="text-2xl font-bold text-white">89</p>
            <p className="text-xs text-gray-500 mt-1">Simulated</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-green-400" />
              <p className="text-gray-400 text-xs">Saved</p>
            </div>
            <p className="text-2xl font-bold text-white">$3.2K</p>
            <p className="text-xs text-gray-500 mt-1">Via predictions</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-2 mb-6">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTab('forecast')}
              className={`flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-medium transition-all ${
                activeTab === 'forecast'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg'
                  : 'bg-transparent text-gray-400 hover:bg-slate-700/50'
              }`}
            >
              <Eye className="w-5 h-5" />
              <span>Forecasts & Predictions</span>
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center justify-center gap-3 px-6 py-4 rounded-lg font-medium transition-all ${
                activeTab === 'simulator'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg'
                  : 'bg-transparent text-gray-400 hover:bg-slate-700/50'
              }`}
            >
              <Calculator className="w-5 h-5" />
              <span>What-If Simulator</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in duration-300">
          {activeTab === 'forecast' && <ForceVisionDashboard />}
          {activeTab === 'simulator' && <WhatIfSimulator />}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-400" />
              How Predictions Work
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Our AI analyzes your historical spending patterns, income trends, and seasonal 
              variations to generate accurate forecasts. Confidence scores reflect data quality 
              and prediction reliability.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-400" />
              What-If Scenarios
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Test different financial decisions before making them. See exactly how income 
              changes, spending adjustments, or lifestyle modifications impact your goals 
              and savings over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}