'use client';

import React, { useState } from 'react';
import { Volume2, Mic, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function VoiceWidget() {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-500/20 rounded-xl">
            <Volume2 className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold flex items-center gap-2">
              Yoda Voice Banking
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            </h3>
            <p className="text-gray-400 text-xs">Speak to the Force</p>
          </div>
        </div>
      </div>

      {/* Voice Pulse Animation */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
          <div className="relative p-6 bg-green-500/20 rounded-full border-2 border-green-500/50">
            <Mic className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-1">
            <Volume2 className="w-4 h-4 text-green-400" />
            <p className="text-gray-400 text-xs">Queries</p>
          </div>
          <p className="text-xl font-bold text-white">127</p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <p className="text-gray-400 text-xs">Accuracy</p>
          </div>
          <p className="text-xl font-bold text-white">96%</p>
        </div>
      </div>

      {/* Sample Voice Commands */}
      <div className="space-y-2 mb-4">
        <p className="text-gray-400 text-xs font-medium mb-2">Try saying:</p>
        {[
          "What's my spending?",
          "Show my savings",
          "Next bill due?",
        ].map((command, index) => (
          <div
            key={index}
            className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-2 text-xs text-gray-300"
          >
            <Mic className="w-3 h-3 inline mr-2 text-green-400" />
            "{command}"
          </div>
        ))}
      </div>

      {/* Open Voice Banking Button */}
      <button
        onClick={() => router.push('/voice')}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 group"
      >
        <span>Start Voice Banking</span>
        <ArrowRight className={`w-4 h-4 transition-transform ${isHovering ? 'translate-x-1' : ''}`} />
      </button>

      {/* Status Indicator */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <p className="text-gray-500 text-xs">Voice ready</p>
      </div>
    </div>
  );
}