'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, MessageCircle, Bot, Volume2, Eye, Menu, X, Sparkles } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

const navItems: NavItem[] = [
  {
    name: 'Home',
    path: '/',
    icon: Home,
    color: 'text-blue-400',
    description: 'Dashboard',
  },
  {
    name: 'Chat',
    path: '/chat',
    icon: MessageCircle,
    color: 'text-blue-400',
    description: 'AI Assistant',
  },
  {
    name: 'R2-D2 Agent',
    path: '/agent',
    icon: Bot,
    color: 'text-blue-400',
    description: 'Autonomous Actions',
  },
  {
    name: 'Yoda Voice',
    path: '/voice',
    icon: Volume2,
    color: 'text-green-400',
    description: 'Voice Banking',
  },
  {
    name: 'Force Vision',
    path: '/vision',
    icon: Eye,
    color: 'text-purple-400',
    description: 'Predictions',
  },
];

export default function UnifiedNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-blue-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavigate('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                FinanceJedi
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">Your Financial Force Companion</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    active
                      ? 'bg-slate-800 text-white'
                      : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? item.color : ''}`} />
                  <span className="text-sm">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 text-gray-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700/50 pt-4 animate-in slide-in-from-top duration-200">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all w-full ${
                      active
                        ? 'bg-slate-800 text-white'
                        : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? item.color : ''}`} />
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}