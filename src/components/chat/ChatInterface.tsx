// components/chat/ChatInterface.tsx - Updated with Vision Navigation
'use client';

import React from 'react';
import { useTamboThread, useTamboThreadInput } from '@tambo-ai/react';
import { Send, Sparkles, Home, Menu, X, Bot, Volume2, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ChatInterface() {
  const { thread } = useTamboThread();
  const { value, setValue, submit, isPending } = useTamboThreadInput();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isPending) {
      await submit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-blue-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                  FinanceJedi
                </h1>
                <p className="text-xs text-gray-400">Your Financial Force Companion</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => router.push('/agent')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors group"
              >
                <Bot className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                <span>R2-D2</span>
              </button>
              <button
                onClick={() => router.push('/voice')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors group"
              >
                <Volume2 className="w-4 h-4 text-green-400 group-hover:text-green-300" />
                <span>Yoda</span>
              </button>
              <button
                onClick={() => router.push('/vision')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors group"
              >
                <Eye className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                <span>Vision</span>
              </button>
              <a
                href="https://github.com/tambo-ai/tambo"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 transition-colors"
              >
                GitHub
              </a>
            </nav>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 text-gray-300"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-700/50 pt-4">
              <button
                onClick={() => { router.push('/'); setMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors w-full mb-2"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => { router.push('/agent'); setMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors w-full mb-2"
              >
                <Bot className="w-4 h-4 text-blue-400" />
                <span>R2-D2 Agent</span>
              </button>
              <button
                onClick={() => { router.push('/voice'); setMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors w-full mb-2"
              >
                <Volume2 className="w-4 h-4 text-green-400" />
                <span>Voice Banking</span>
              </button>
              <button
                onClick={() => { router.push('/vision'); setMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors w-full mb-2"
              >
                <Eye className="w-4 h-4 text-purple-400" />
                <span>Force Vision</span>
              </button>
              <a
                href="https://github.com/tambo-ai/tambo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 transition-colors"
              >
                GitHub
              </a>
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {thread.messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome to FinanceJedi! 🚀
              </h2>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                May the financial force be with you. Ask me anything about your finances!
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                {[
                  'Show me my spending breakdown 📊',
                  'How can I improve my savings? 💰',
                  'Track my bills and payments 📅',
                  'Project my savings for 6 months 🎯',
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setValue(suggestion)}
                    className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-blue-300 rounded-full text-sm font-medium border border-slate-700/50 hover:border-blue-500/30 transition-all duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {thread.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-slate-900/50 backdrop-blur-sm border border-slate-700/50'
                } rounded-2xl px-5 py-3 shadow-sm`}
              >
                {Array.isArray(message.content) ? (
                  message.content.map((part, i) =>
                    part.type === 'text' ? (
                      <p key={i} className={`text-sm leading-relaxed ${message.role === 'user' ? 'text-white' : 'text-gray-200'}`}>
                        {part.text}
                      </p>
                    ) : null
                  )
                ) : (
                  <p className={`text-sm leading-relaxed ${message.role === 'user' ? 'text-white' : 'text-gray-200'}`}>
                    {String(message.content)}
                  </p>
                )}

                {message.renderedComponent && (
                  <div className="mt-3">
                    {message.renderedComponent}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isPending && (
            <div className="flex justify-start">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl px-5 py-3 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-gray-300">Analyzing your finances...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-blue-500/20 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask the Force for financial wisdom..."
                disabled={isPending}
                rows={1}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ minHeight: '52px', maxHeight: '120px' }}
              />
            </div>
            <button
              type="submit"
              disabled={isPending || !value.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
              <span className="font-medium">Send</span>
            </button>
          </form>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            Powered by{' '}
            <a href="https://tambo.co" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              Tambo Generative UI
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}