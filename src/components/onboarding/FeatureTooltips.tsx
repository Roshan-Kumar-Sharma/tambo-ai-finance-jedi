'use client';

import React, { useState, useEffect } from 'react';
import { X, Lightbulb, ChevronRight } from 'lucide-react';

interface Tooltip {
  id: string;
  targetId: string;
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const tooltips: Tooltip[] = [
  {
    id: 'chat-input',
    targetId: 'chat-input-area',
    title: 'Ask Anything',
    description: 'Type naturally - "What\'s my spending?" or "When is my next bill due?"',
    position: 'top',
  },
  {
    id: 'nav-agent',
    targetId: 'nav-agent-link',
    title: 'R2-D2 Agent',
    description: 'Your autonomous financial assistant. Handles tasks automatically.',
    position: 'bottom',
  },
  {
    id: 'nav-voice',
    targetId: 'nav-voice-link',
    title: 'Yoda Voice',
    description: 'Speak to manage finances hands-free. Try "Show my savings"',
    position: 'bottom',
  },
  {
    id: 'nav-vision',
    targetId: 'nav-vision-link',
    title: 'Force Vision',
    description: 'See the future with AI predictions and what-if scenarios.',
    position: 'bottom',
  },
];

const TOOLTIPS_KEY = 'financejedi_tooltips_dismissed';

export default function FeatureTooltips() {
  const [currentTooltip, setCurrentTooltip] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissedTooltips, setDismissedTooltips] = useState<string[]>([]);

  useEffect(() => {
    // Load dismissed tooltips
    const dismissed = localStorage.getItem(TOOLTIPS_KEY);
    if (dismissed) {
      setDismissedTooltips(JSON.parse(dismissed));
    } else {
      // Show tooltips on first visit after a delay
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentTooltip < tooltips.length - 1) {
      setCurrentTooltip(currentTooltip + 1);
    } else {
      handleDismissAll();
    }
  };

  const handleDismiss = () => {
    const tooltip = tooltips[currentTooltip];
    const newDismissed = [...dismissedTooltips, tooltip.id];
    setDismissedTooltips(newDismissed);
    
    if (currentTooltip < tooltips.length - 1) {
      setCurrentTooltip(currentTooltip + 1);
    } else {
      handleDismissAll();
    }
  };

  const handleDismissAll = () => {
    localStorage.setItem(TOOLTIPS_KEY, JSON.stringify(tooltips.map(t => t.id)));
    setIsVisible(false);
  };

  if (!isVisible || dismissedTooltips.length === tooltips.length) {
    return null;
  }

  const tooltip = tooltips[currentTooltip];

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Spotlight overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-auto" onClick={handleDismissAll} />

      {/* Tooltip Card */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-2xl shadow-2xl max-w-sm animate-in zoom-in-95 duration-300">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-1">{tooltip.title}</h3>
              <p className="text-blue-100 text-sm leading-relaxed">{tooltip.description}</p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <p className="text-white/80 text-sm">
              Tip {currentTooltip + 1} of {tooltips.length}
            </p>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
            >
              {currentTooltip < tooltips.length - 1 ? (
                <>
                  Next Tip
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                'Got it!'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}