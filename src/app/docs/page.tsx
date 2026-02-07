// app/docs/page.tsx
'use client';

import React, { useState } from 'react';
import UnifiedNav from '@/components/navigation/UnifiedNav';
import Breadcrumb from '@/components/navigation/Breadcrumb';
import { Book, MessageCircle, Bot, Volume2, Eye, Search, ChevronRight, HelpCircle, AlertCircle, CheckCircle } from 'lucide-react';

type Section = 'getting-started' | 'chat' | 'agent' | 'voice' | 'vision' | 'faq' | 'troubleshooting';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<Section>('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    { id: 'getting-started' as Section, label: 'Getting Started', icon: Book },
    { id: 'chat' as Section, label: 'AI Chat Assistant', icon: MessageCircle },
    { id: 'agent' as Section, label: 'R2-D2 Agent', icon: Bot },
    { id: 'voice' as Section, label: 'Yoda Voice', icon: Volume2 },
    { id: 'vision' as Section, label: 'Force Vision', icon: Eye },
    { id: 'faq' as Section, label: 'FAQ', icon: HelpCircle },
    { id: 'troubleshooting' as Section, label: 'Troubleshooting', icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <UnifiedNav />
      <Breadcrumb />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-6 py-3 rounded-full bg-blue-500/20 border border-blue-500/30">
            <Book className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">Complete Documentation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-4">
            FinanceJedi Documentation
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Everything you need to know to master your financial Force
          </p>
        </div>

        {/* Search */}
        {/* <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div> */}

        {/* Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sticky top-24">
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeSection === section.id
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'text-gray-400 hover:bg-slate-700/50 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
              {/* Getting Started */}
              {activeSection === 'getting-started' && (
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-3xl font-bold text-white mb-6">Getting Started</h2>
                  
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-xl font-semibold text-white mb-3">Welcome to FinanceJedi</h3>
                      <p className="text-gray-300 leading-relaxed">
                        FinanceJedi is your AI-powered financial command center, combining cutting-edge 
                        technology with intuitive interfaces to help you master your money. Whether you're 
                        looking to automate routine tasks, get voice-powered insights, or predict your 
                        financial future, FinanceJedi has you covered.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold text-white mb-3">Quick Start (3 Steps)</h3>
                      <div className="space-y-4">
                        <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                              1
                            </div>
                            <div>
                              <h4 className="text-white font-semibold mb-2">Start with Chat</h4>
                              <p className="text-gray-400 text-sm">
                                Navigate to the Chat page and ask your first question. Try "What's my 
                                total spending this month?" or "Show me my upcoming bills."
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                              2
                            </div>
                            <div>
                              <h4 className="text-white font-semibold mb-2">Enable R2-D2 Agent</h4>
                              <p className="text-gray-400 text-sm">
                                Go to the R2-D2 Agent page and configure automation rules. Start with 
                                auto-paying bills under $100 to save time.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                              3
                            </div>
                            <div>
                              <h4 className="text-white font-semibold mb-2">Explore Other Features</h4>
                              <p className="text-gray-400 text-sm">
                                Try Yoda Voice for hands-free control and Force Vision for predictions. 
                                Each feature works independently and together.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-semibold text-white mb-3">System Requirements</h3>
                      <ul className="text-gray-300 space-y-2 list-disc list-inside">
                        <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                        <li>Microphone for voice features (optional)</li>
                        <li>Internet connection</li>
                        <li>JavaScript enabled</li>
                      </ul>
                    </section>
                  </div>
                </div>
              )}

              {/* Chat Assistant */}
              {activeSection === 'chat' && (
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-3xl font-bold text-white mb-6">AI Chat Assistant</h2>
                  
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-3">What is the Chat Assistant?</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      The AI Chat Assistant is your conversational interface to all your financial data. 
                      Ask questions in natural language and get instant, accurate answers with interactive 
                      visualizations.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-3">Example Queries</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        'What\'s my coffee spending this month?',
                        'Show me my spending breakdown',
                        'When is my next bill due?',
                        'How much can I save this month?',
                        'What\'s my budget status?',
                        'Track my grocery spending',
                      ].map((query, index) => (
                        <div key={index} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-3">
                          <p className="text-blue-300 text-sm">"{query}"</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-3">Features</h3>
                    <div className="space-y-3">
                      {[
                        { title: 'Natural Language', desc: 'Ask questions like you would a human advisor' },
                        { title: 'Interactive Charts', desc: 'Get visual answers with charts and graphs' },
                        { title: 'Instant Insights', desc: 'Responses in under 2 seconds' },
                        { title: 'Context Aware', desc: 'Remembers your conversation for follow-up questions' },
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">{feature.title}</p>
                            <p className="text-gray-400 text-sm">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* R2-D2 Agent */}
              {activeSection === 'agent' && (
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-3xl font-bold text-white mb-6">R2-D2 Agent</h2>
                  
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-3">What is R2-D2 Agent?</h3>
                    <p className="text-gray-300 leading-relaxed">
                      R2-D2 is your autonomous financial agent that handles routine tasks automatically. 
                      Set rules once, and R2-D2 executes actions based on your preferences with a 94% trust score.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-3">What R2-D2 Can Do</h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: 'Auto-Pay Bills',
                          desc: 'Automatically pay recurring bills under your threshold (default: $100)',
                          example: 'Netflix, Spotify, utilities'
                        },
                        {
                          title: 'Budget Adjustments',
                          desc: 'Automatically adjust budgets when spending exceeds 15%',
                          example: 'Increase food budget if consistently over'
                        },
                        {
                          title: 'Smart Alerts',
                          desc: 'Proactive notifications about overdraft risks and unusual spending',
                          example: 'Alert when balance drops below $200'
                        },
                        {
                          title: 'Savings Transfers',
                          desc: 'Automatically move money to savings based on income',
                          example: 'Save 10% of each paycheck'
                        },
                      ].map((action, index) => (
                        <div key={index} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
                          <h4 className="text-white font-semibold mb-2">{action.title}</h4>
                          <p className="text-gray-300 text-sm mb-2">{action.desc}</p>
                          <p className="text-blue-300 text-xs">Example: {action.example}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-white mb-3">Configuration</h3>
                    <p className="text-gray-300 mb-4">
                      Navigate to Settings tab in R2-D2 Agent to configure:
                    </p>
                    <ul className="text-gray-300 space-y-2 list-disc list-inside">
                      <li>Auto-payment threshold (default: $100)</li>
                      <li>Savings rate (default: 10%)</li>
                      <li>Budget adjustment sensitivity (default: 15%)</li>
                      <li>Alert thresholds</li>
                    </ul>
                  </section>
                </div>
              )}

              {/* Yoda Voice */}
              {activeSection === 'voice' && (
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-3xl font-bold text-white mb-6">Yoda Voice Banking</h2>
                  
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-3">Voice-Powered Finance</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Yoda Voice Banking lets you manage your finances hands-free using natural speech. 
                      With 96% accuracy, it understands your commands and responds in Yoda's unique style.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-3">Voice Commands</h3>
                    <div className="space-y-3">
                      {[
                        { command: 'What\'s my coffee spending?', response: 'Much coffee, you drink! $143 on lattes, you spent.' },
                        { command: 'Show me my savings', response: 'Strong with savings, you are. $500 this month, you have saved.' },
                        { command: 'When is my next bill?', response: 'Internet bill on March 15th, $79.99 it is. Pay soon, you must.' },
                        { command: 'Set a savings challenge', response: 'Challenge, I create! Save $50 this week, you must.' },
                      ].map((item, index) => (
                        <div key={index} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4">
                          <p className="text-blue-300 text-sm mb-2">🎤 "{item.command}"</p>
                          <p className="text-green-300 text-sm">💬 {item.response}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-white mb-3">Tips for Best Results</h3>
                    <ul className="text-gray-300 space-y-2 list-disc list-inside">
                      <li>Speak clearly and at normal pace</li>
                      <li>Use natural language - no need for specific keywords</li>
                      <li>Wait for response before next command</li>
                      <li>Use in quiet environment for best accuracy</li>
                    </ul>
                  </section>
                </div>
              )}

              {/* Force Vision */}
              {activeSection === 'vision' && (
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-3xl font-bold text-white mb-6">Force Vision</h2>
                  
                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Predictions</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Force Vision uses machine learning to predict your financial future with 94% accuracy. 
                      Forecast income, expenses, and goals up to 12 months ahead.
                    </p>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-3">What You Can Predict</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        'Monthly income and expenses',
                        'Category-level spending trends',
                        'Goal achievement probability',
                        'Risk alerts (overdraft, overspending)',
                        'Savings opportunities',
                        'Seasonal spending patterns',
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-purple-400" />
                          <p className="text-gray-300 text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-3">What-If Simulator</h3>
                    <p className="text-gray-300 mb-4">
                      Test different scenarios before making financial decisions:
                    </p>
                    <div className="space-y-3">
                      {[
                        'What if I save $100 more per month?',
                        'What if I cut dining out by 30%?',
                        'What if I get a $500 raise?',
                        'What if I cancel unused subscriptions?',
                      ].map((scenario, index) => (
                        <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                          <p className="text-purple-300 text-sm">{scenario}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold text-white mb-3">Understanding Confidence Scores</h3>
                    <p className="text-gray-300 mb-3">
                      Each prediction includes a confidence score:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-green-400 font-bold">90-100%:</span>
                        <span className="text-gray-300 text-sm">Very reliable (1-2 months ahead)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-blue-400 font-bold">75-89%:</span>
                        <span className="text-gray-300 text-sm">Reliable (3-6 months ahead)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-yellow-400 font-bold">60-74%:</span>
                        <span className="text-gray-300 text-sm">Moderate (7-12 months ahead)</span>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {/* FAQ */}
              {activeSection === 'faq' && (
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                  
                  <div className="space-y-6">
                    {[
                      {
                        q: 'Is my financial data secure?',
                        a: 'Yes! All data is encrypted end-to-end and stored securely. We never sell your data to third parties.'
                      },
                      {
                        q: 'How accurate are the predictions?',
                        a: 'Force Vision achieves 94% accuracy on historical data. Accuracy decreases slightly for longer timeframes (12 months).'
                      },
                      {
                        q: 'Can R2-D2 Agent make mistakes?',
                        a: 'R2-D2 requires your approval for any action over your threshold (default: $100). You can review all actions in the dashboard.'
                      },
                      {
                        q: 'Does voice banking work offline?',
                        a: 'No, voice recognition requires an internet connection. However, the rest of the app works offline with cached data.'
                      },
                      {
                        q: 'How do I reset the onboarding tutorial?',
                        a: 'Clear your browser\'s localStorage or look for "Reset Tutorial" in settings (coming soon).'
                      },
                      {
                        q: 'Can I export my data?',
                        a: 'Yes! Each feature has an export option. Go to Settings > Data Export to download your information.'
                      },
                    ].map((faq, index) => (
                      <div key={index} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-5">
                        <h3 className="text-white font-semibold mb-2 flex items-start gap-2">
                          <HelpCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          {faq.q}
                        </h3>
                        <p className="text-gray-300 text-sm pl-7">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Troubleshooting */}
              {activeSection === 'troubleshooting' && (
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-3xl font-bold text-white mb-6">Troubleshooting</h2>
                  
                  <div className="space-y-6">
                    {[
                      {
                        issue: 'Voice recognition not working',
                        solutions: [
                          'Check microphone permissions in browser settings',
                          'Use Chrome or Firefox for best compatibility',
                          'Ensure you\'re in a quiet environment',
                          'Restart the browser and try again',
                        ]
                      },
                      {
                        issue: 'Chat responses are slow',
                        solutions: [
                          'Check your internet connection',
                          'Clear browser cache and cookies',
                          'Try refreshing the page',
                          'Complex queries take 2-5 seconds - this is normal',
                        ]
                      },
                      {
                        issue: 'R2-D2 Agent not executing actions',
                        solutions: [
                          'Check if actions require approval (over threshold)',
                          'Review Settings to ensure agent is enabled',
                          'Check Performance tab for execution status',
                          'Some actions may take up to 24 hours',
                        ]
                      },
                      {
                        issue: 'Predictions seem inaccurate',
                        solutions: [
                          'Predictions improve with more historical data',
                          'Check confidence scores - lower scores mean less reliability',
                          'Large life changes (job loss, move) affect accuracy',
                          'Report inaccuracies via feedback button',
                        ]
                      },
                      {
                        issue: 'Data not persisting after refresh',
                        solutions: [
                          'Enable cookies in browser settings',
                          'Check if localStorage is enabled',
                          'Try a different browser',
                          'Clear cache but keep cookies',
                        ]
                      },
                    ].map((item, index) => (
                      <div key={index} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-5">
                        <h3 className="text-white font-semibold mb-3 flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          {item.issue}
                        </h3>
                        <div className="pl-7">
                          <p className="text-gray-400 text-sm mb-2">Try these solutions:</p>
                          <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                            {item.solutions.map((solution, idx) => (
                              <li key={idx}>{solution}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-2">Still Need Help?</h3>
                    <p className="text-gray-300 text-sm">
                      Contact support at support@financejedi.com or use the chat feature 
                      to report bugs and request features.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}