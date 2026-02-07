'use client';

import React, { useState } from 'react';
import { HelpCircle, X, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HelpButtonProps {
  section?: 'chat' | 'agent' | 'voice' | 'vision' | 'general';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const helpContent: Record<string, { title: string; tips: string[]; docLink: string }> = {
  chat: {
    title: 'AI Chat Assistant Help',
    tips: [
      'Ask questions in natural language like "What\'s my spending?"',
      'Follow-up questions maintain context from previous messages',
      'Use specific time periods: "last month", "this week", etc.',
      'Request visualizations: "show me a chart of my expenses"',
    ],
    docLink: '/docs#chat',
  },
  agent: {
    title: 'R2-D2 Agent Help',
    tips: [
      'Review pending actions in the Dashboard tab',
      'Adjust auto-payment threshold in Settings (default: $100)',
      'Check Performance tab to see action history',
      'All actions over threshold require your approval',
    ],
    docLink: '/docs#agent',
  },
  voice: {
    title: 'Yoda Voice Help',
    tips: [
      'Click the mic button and speak clearly',
      'Say commands like "Show my savings" or "What\'s my budget?"',
      'Yoda will respond with voice synthesis',
      'Works best in quiet environments',
    ],
    docLink: '/docs#voice',
  },
  vision: {
    title: 'Force Vision Help',
    tips: [
      'Toggle between 3, 6, or 12 month forecasts',
      'Higher confidence scores = more reliable predictions',
      'Use What-If Simulator to test different scenarios',
      'Risk alerts show potential problems before they happen',
    ],
    docLink: '/docs#vision',
  },
  general: {
    title: 'Quick Help',
    tips: [
      'Navigate between features using the top menu',
      'All your data is saved automatically',
      'Use breadcrumb navigation to go back',
      'Check the full documentation for detailed guides',
    ],
    docLink: '/docs',
  },
};

export default function ContextualHelp({ section = 'general', position = 'bottom-right' }: HelpButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const content = helpContent[section];

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const tooltipPositionClasses = {
    'bottom-right': 'bottom-20 right-0',
    'bottom-left': 'bottom-20 left-0',
    'top-right': 'top-20 right-0',
    'top-left': 'top-20 left-0',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40`}>
      {/* Help Tooltip */}
      {isOpen && (
        <div className={`absolute ${tooltipPositionClasses[position]} w-80 mb-2 animate-in slide-in-from-bottom duration-200`}>
          <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                <h3 className="text-white font-semibold text-sm">{content.title}</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-700 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Tips */}
            <div className="space-y-2 mb-4">
              {content.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-400 text-xs font-semibold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>

            {/* Doc Link */}
            <button
              onClick={() => {
                setIsOpen(false);
                router.push(content.docLink);
              }}
              className="w-full px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-300 text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              View Full Documentation
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Help Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group p-4 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110"
        aria-label="Help"
      >
        <HelpCircle className="w-6 h-6 text-white" />
      </button>

      {/* Pulse Effect */}
      {!isOpen && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="p-4">
            <div className="w-6 h-6 bg-blue-500 rounded-full animate-ping opacity-75" />
          </div>
        </div>
      )}
    </div>
  );
}