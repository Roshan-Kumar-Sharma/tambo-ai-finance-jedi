'use client';

import Breadcrumb from '@/components/navigation/Breadcrumb';
import UnifiedNav from '@/components/navigation/UnifiedNav';
import { extractTextContent, parseMarkdown } from '@/lib/utils/markdownRenderer';
import { useTamboThread, useTamboThreadInput } from '@tambo-ai/react';
import { Send, Sparkles } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

export default function ChatInterface() {
  const { thread, startNewThread } = useTamboThread();
  const { value, setValue, submit, isPending } = useTamboThreadInput();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Start a new thread when the component mounts to clear old queries/responses
  useEffect(() => {
    startNewThread();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
      {/* Navigation */}
      <UnifiedNav />
      <Breadcrumb />

      {/* Messages Container - Scrollable */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto"
        style={{ height: 'calc(100vh - 200px)' }}
      >
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Welcome Message */}
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
              
              {/* Suggestion Pills */}
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                {[
                  'Show me my spending breakdown 📊',
                  'How can I improve my savings? 💰',
                  'Track my bills and payments 📅',
                  'What are my upcoming bills? 🔔',
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

          {/* Messages */}
          {thread.messages.map((message) => {
            const textContent = extractTextContent(message.content);
            
            return (
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
                  {/* Text Content with Markdown */}
                  {textContent && (
                    <div className={`text-sm leading-relaxed ${
                      message.role === 'user' ? 'text-white' : 'text-gray-200'
                    }`}>
                      {parseMarkdown(textContent)}
                    </div>
                  )}

                  {/* Rendered Component */}
                  {message.renderedComponent && (
                    <div className="mt-3">
                      {message.renderedComponent}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
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

      {/* Input Area - Fixed at Bottom */}
      <div className="sticky bottom-0 border-t border-blue-500/20 bg-slate-900/95 backdrop-blur-xl shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex items-end gap-3">
            <div className="flex-1">
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask the Force for financial wisdom..."
                disabled={isPending}
                rows={1}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  minHeight: '52px', 
                  maxHeight: '120px',
                  height: 'auto'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isPending || !value.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              style={{ minHeight: '52px' }}
            >
              <Send className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">Send</span>
            </button>
          </form>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            Powered by{' '}
            <a
              href="https://tambo.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              Tambo Generative UI
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}