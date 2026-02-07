// app/page.tsx - Updated with Quick Start Guide
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, TrendingUp, Target, Shield, Zap, ArrowRight, MessageCircle, Bot, Volume2, Eye, Check, BookOpen } from 'lucide-react';
import UnifiedNav from '@/components/navigation/UnifiedNav';
import QuickStartGuide from '@/components/onboarding/QuickStartGuide';

export default function Home() {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [showQuickStart, setShowQuickStart] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden relative">
      {/* Animated stars background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `stars-twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <UnifiedNav />

      {/* Quick Start Guide Modal */}
      <QuickStartGuide isOpen={showQuickStart} onClose={() => setShowQuickStart(false)} />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-16 pb-12">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo/Badge */}
            <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
              <span className="text-blue-300 font-medium">AI-Powered Financial Management</span>
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text uppercase tracking-wider">
              FINANCE JEDI
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-200 mb-4 font-semibold">
              Master Your Financial Force
            </p>

            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Harness AI-powered agents, voice banking, and predictive analytics 
              to bring balance to your finances. Your complete financial command center.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => router.push('/chat')}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-white text-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Begin Your Journey
                  <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovering ? 'translate-x-1' : ''}`} />
                </span>
              </button>

              {/* <button
                onClick={() => setShowQuickStart(true)}
                className="px-8 py-4 border-2 border-blue-500/50 rounded-xl font-semibold text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Quick Start Guide
              </button> */}

              <button
                onClick={() => router.push('/docs')}
                className="px-8 py-4 border-2 border-blue-500/50 rounded-xl font-semibold text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300"
              >
                Documentation
              </button>
            </div>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="container mx-auto px-6 pb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Four Powerful Features
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            FinanceJedi combines cutting-edge AI technology with intuitive interfaces 
            to give you complete control over your financial future
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Chat Feature */}
            <div 
              onClick={() => router.push('/chat')}
              className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    AI Chat Assistant
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Natural language queries, instant insights, and smart financial advice. 
                    Ask anything about your money.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                <span>Start chatting</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* R2-D2 Agent Feature */}
            <div 
              onClick={() => router.push('/agent')}
              className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    R2-D2 Agent
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Autonomous financial actions with 94% trust score. Auto-pay bills, 
                    optimize budgets, and execute smart decisions.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {['Auto-pay', 'Budget Optimize', 'Smart Alerts'].map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-300">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
                <span>View agent</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Yoda Voice Feature */}
            <div 
              onClick={() => router.push('/voice')}
              className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-green-500/50 rounded-2xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                  <Volume2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    Yoda Voice Banking
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Speak naturally to check balances, pay bills, and get insights. 
                    Yoda-style responses with 96% accuracy.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                <span>Try voice banking</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Force Vision Feature */}
            <div 
              onClick={() => router.push('/vision')}
              className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    Force Vision
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    AI-powered predictions for income, expenses, and goals. 
                    What-if scenarios and risk detection with 94% accuracy.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                <span>See predictions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="container mx-auto px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Connect & Chat',
                  description: 'Start by chatting with our AI assistant. Ask questions, get insights, or request specific actions.',
                  icon: MessageCircle,
                },
                {
                  step: '2',
                  title: 'Enable Automation',
                  description: 'Configure R2-D2 Agent to handle routine tasks automatically. Set your preferences and thresholds.',
                  icon: Bot,
                },
                {
                  step: '3',
                  title: 'Track & Predict',
                  description: 'Use Force Vision to see your financial future. Make informed decisions with AI-powered predictions.',
                  icon: Eye,
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                      {item.step}
                    </div>
                    <item.icon className="w-8 h-8 text-blue-400 mb-3" />
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-6 pb-16">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Powered by AI, Built for You
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '94%', label: 'Prediction Accuracy' },
                { value: '96%', label: 'Voice Recognition' },
                { value: '$3.2K', label: 'Avg. Savings' },
                { value: '247', label: 'AI Predictions' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="container mx-auto px-6 pb-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Master Your Finances?
            </h2>
            <p className="text-gray-300 mb-8">
              Join the future of personal finance management with AI-powered tools 
              that work for you 24/7.
            </p>
            <button
              onClick={() => router.push('/chat')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-white text-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              Get Started Free
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="container mx-auto px-6 py-8 border-t border-slate-700/50">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Built with 💙 for The UI Strikes Back Hackathon
            </p>
            <p className="text-gray-500 text-xs mt-2">
              May the Financial Force be with you ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}