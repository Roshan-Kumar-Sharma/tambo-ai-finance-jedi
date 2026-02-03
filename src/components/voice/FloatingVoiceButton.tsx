'use client';

import React, { useState } from 'react';
import { Mic, X, Volume2 } from 'lucide-react';

interface FloatingVoiceButtonProps {
  onOpenVoice?: () => void;
}

export default function FloatingVoiceButton({ onOpenVoice }: FloatingVoiceButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (onOpenVoice) {
      onOpenVoice();
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 group"
        aria-label="Voice Banking"
      >
        <div className="relative">
          <Mic className="w-6 h-6 text-white" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
        </div>
      </button>

      {/* Pulse Effect */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-none">
        <div className="p-4">
          <div className="w-6 h-6 bg-green-500 rounded-full animate-ping opacity-75" />
        </div>
      </div>

      {/* Quick Voice Panel (if expanded and no callback) */}
      {isExpanded && !onOpenVoice && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-slate-900 border border-green-500/30 rounded-2xl shadow-2xl p-4 animate-in slide-in-from-bottom">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-semibold">Yoda Voice</h3>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-slate-800 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <p className="text-gray-300 text-sm mb-4">
            Navigate to Voice Banking for full conversation experience.
          </p>
          <a
            href="/voice"
            className="block w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg text-center transition-colors"
          >
            Open Voice Banking
          </a>
        </div>
      )}
    </>
  );
}