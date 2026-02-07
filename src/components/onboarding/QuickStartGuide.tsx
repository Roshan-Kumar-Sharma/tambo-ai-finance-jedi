'use client';

import React from 'react';
import { X, Play, Zap, MessageCircle, Bot, Volume2, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QuickStartGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickStartGuide({ isOpen, onClose }: QuickStartGuideProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleFeatureClick = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4 bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Quick Start Guide</h2>
              <p className="text-gray-400 text-sm">Get up and running in 60 seconds</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Video/Demo Section */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Play className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">60-Second Overview</h3>
            </div>
            <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <Play className="w-16 h-16 text-blue-400 mx-auto mb-3" />
                <p className="text-gray-400">Demo video coming soon</p>
                <p className="text-gray-500 text-sm">Watch how FinanceJedi works</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              See FinanceJedi in action: Chat with AI, automate with R2-D2, 
              use voice commands, and predict your financial future.
            </p>
          </div>

          {/* Features Grid */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Core Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Chat */}
              <button
                onClick={() => handleFeatureClick('/chat')}
                className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-xl p-5 text-left transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      AI Chat Assistant
                    </h4>
                    <p className="text-gray-400 text-sm mb-3">
                      Ask about spending, bills, savings - get instant answers
                    </p>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Try: "What's my coffee spending?"</p>
                      <p className="text-xs text-gray-500">Try: "When is my next bill due?"</p>
                    </div>
                  </div>
                </div>
              </button>

              {/* R2-D2 Agent */}
              <button
                onClick={() => handleFeatureClick('/agent')}
                className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-xl p-5 text-left transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      R2-D2 Agent
                    </h4>
                    <p className="text-gray-400 text-sm mb-3">
                      Autonomous actions: auto-pay bills, adjust budgets
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-300">
                        94% Trust Score
                      </span>
                      <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-300">
                        156 Actions
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Yoda Voice */}
              <button
                onClick={() => handleFeatureClick('/voice')}
                className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-green-500/50 rounded-xl p-5 text-left transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                    <Volume2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-2 group-hover:text-green-400 transition-colors">
                      Yoda Voice Banking
                    </h4>
                    <p className="text-gray-400 text-sm mb-3">
                      Speak naturally to check balances and manage money
                    </p>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Say: "Show me my savings"</p>
                      <p className="text-xs text-gray-500">Say: "What's my budget status?"</p>
                    </div>
                  </div>
                </div>
              </button>

              {/* Force Vision */}
              <button
                onClick={() => handleFeatureClick('/vision')}
                className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-purple-500/50 rounded-xl p-5 text-left transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                      Force Vision
                    </h4>
                    <p className="text-gray-400 text-sm mb-3">
                      Predict income, expenses, and goals with AI
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-xs text-purple-300">
                        94% Accuracy
                      </span>
                      <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-300">
                        247 Predictions
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Tips */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Tips</h3>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 space-y-3">
              {[
                'Start with Chat to get familiar with natural language queries',
                'Enable R2-D2 Agent for bills under $100 to save time',
                'Try voice commands when driving or cooking - completely hands-free',
                'Check Force Vision weekly to stay ahead of spending trends',
                'All your data stays private and secure - we never sell it',
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-400 text-sm font-semibold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => handleFeatureClick('/chat')}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Start Chatting
            </button>
            <button
              onClick={() => handleFeatureClick('/docs')}
              className="px-6 py-3 border-2 border-blue-500/50 text-blue-300 font-semibold rounded-xl hover:bg-blue-500/10 transition-colors"
            >
              Full Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}