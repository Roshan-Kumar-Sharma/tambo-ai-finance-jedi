// app/voice/page.tsx - Updated with Unified Navigation
'use client';

import Breadcrumb from '@/components/navigation/Breadcrumb';
import UnifiedNav from '@/components/navigation/UnifiedNav';
import { Loader2, Sparkles, TrendingUp, Volume2 } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import to prevent SSR issues with Web Workers used by @tambo-ai/react
const YodaVoiceInterface = dynamic(
  () => import('@/components/voice/YodaVoiceInterface'),
  { 
    ssr: false,
    loading: () => (
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
          <p className="text-gray-300 text-sm">Loading voice interface...</p>
        </div>
      </div>
    )
  }
);

export default function VoiceBankingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-950 to-slate-900">
      <UnifiedNav />
      <Breadcrumb />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-6 py-3 rounded-full bg-green-500/20 border border-green-500/30 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-green-400 animate-pulse" />
            <span className="text-green-300 font-medium">Voice-First Banking</span>
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-transparent bg-clip-text">
            Yoda Voice Banking
          </h2>
          
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Voice commands, natural language queries, and conversational insights. 
            The Force of AI banking, at your command.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="w-5 h-5 text-green-400" />
              <p className="text-gray-400 text-sm">Voice Queries</p>
            </div>
            <p className="text-2xl font-bold text-white">127</p>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <p className="text-gray-400 text-sm">Accuracy</p>
            </div>
            <p className="text-2xl font-bold text-white">96%</p>
            <p className="text-xs text-gray-500 mt-1">Command recognition</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <p className="text-gray-400 text-sm">Actions</p>
            </div>
            <p className="text-2xl font-bold text-white">43</p>
            <p className="text-xs text-gray-500 mt-1">Completed via voice</p>
          </div>
        </div>

        {/* Main Voice Interface */}
        <YodaVoiceInterface />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-green-400" />
              Natural Language
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Speak naturally. No rigid commands. Ask "What's my coffee spending?" or 
              "How much did I save last month?" - Yoda understands.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              Voice Responses
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Hear Yoda speak back. Get insights, confirmations, and wisdom 
              through voice synthesis in Yoda's unique speech pattern.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}