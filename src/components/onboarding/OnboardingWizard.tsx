'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Sparkles, Bot, Volume2, Eye, MessageCircle } from 'lucide-react';

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  color: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: 'Welcome to FinanceJedi!',
    description: 'Your AI-powered financial command center. Master your money with the Force.',
    icon: Sparkles,
    features: [
      'AI Chat Assistant for instant financial insights',
      'Autonomous R2-D2 Agent for automatic actions',
      'Yoda Voice Banking for hands-free control',
      'Force Vision for predictive analytics',
    ],
    color: 'from-blue-500 to-purple-600',
  },
  {
    title: 'Start with AI Chat',
    description: 'Ask anything about your finances in natural language.',
    icon: MessageCircle,
    features: [
      'Check balances and spending instantly',
      'Get personalized financial advice',
      'Track bills and upcoming payments',
      'View interactive charts and insights',
    ],
    color: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'Automate with R2-D2',
    description: 'Set up autonomous financial actions and let R2-D2 handle routine tasks.',
    icon: Bot,
    features: [
      'Auto-pay bills under $100',
      'Smart budget adjustments',
      'Automatic savings transfers',
      'Proactive alerts and recommendations',
    ],
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Voice Control with Yoda',
    description: 'Speak naturally to manage your finances hands-free.',
    icon: Volume2,
    features: [
      'Check spending by saying "What\'s my coffee spending?"',
      'Pay bills with voice commands',
      'Get insights in Yoda\'s unique style',
      '96% voice recognition accuracy',
    ],
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Predict with Force Vision',
    description: 'See your financial future with AI-powered predictions.',
    icon: Eye,
    features: [
      'Forecast income and expenses 3-12 months ahead',
      'Test what-if scenarios before decisions',
      'Detect risks before they happen',
      'Identify savings opportunities',
    ],
    color: 'from-purple-500 to-pink-600',
  },
];

const ONBOARDING_KEY = 'financejedi_onboarding_completed';

export default function OnboardingWizard() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Check if onboarding has been completed
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (!completed) {
      // Show onboarding after a brief delay
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsCompleted(true);
    setTimeout(() => setIsOpen(false), 500);
  };

  if (!isOpen) return null;

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;
  const isLastStep = currentStep === onboardingSteps.length - 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl mx-4 bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800 text-gray-400 hover:text-white transition-colors"
          aria-label="Close onboarding"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800 rounded-t-2xl overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${step.color} transition-all duration-500`}
            style={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-8 pt-12">
          {/* Icon */}
          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.color} mb-6`}>
            <Icon className="w-12 h-12 text-white" />
          </div>

          {/* Step Counter */}
          <p className="text-sm text-gray-400 mb-2">
            Step {currentStep + 1} of {onboardingSteps.length}
          </p>

          {/* Title */}
          <h2 className="text-3xl font-bold text-white mb-4">{step.title}</h2>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            {step.description}
          </p>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {step.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 animate-in slide-in-from-left duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`p-1 rounded-full bg-gradient-to-br ${step.color} mt-0.5`}>
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-300 flex-1">{feature}</p>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-700">
            <div className="flex gap-2">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'w-8 bg-blue-500'
                      : index < currentStep
                      ? 'w-2 bg-blue-500/50'
                      : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              {currentStep === 0 ? (
                <button
                  onClick={handleSkip}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Skip Tutorial
                </button>
              ) : (
                <button
                  onClick={handlePrevious}
                  className="px-6 py-2 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
              )}

              <button
                onClick={handleNext}
                className={`px-6 py-3 rounded-lg font-semibold text-white flex items-center gap-2 bg-gradient-to-r ${step.color} hover:opacity-90 transition-opacity shadow-lg`}
              >
                {isLastStep ? (
                  <>
                    Get Started
                    <Sparkles className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}