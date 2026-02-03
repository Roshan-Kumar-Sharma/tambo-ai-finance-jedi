// app/dashboard/page.tsx - Financial Dashboard with Agent Widget
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Home, Bot, TrendingUp, DollarSign, Target, Calendar } from 'lucide-react';
import AgentWidget from '@/components/agent/AgentWidget';
import { mockFinancialSummary, mockGoals, mockBills } from '@/lib/data/mockData';

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-blue-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                  Financial Dashboard
                </h1>
                <p className="text-xs text-gray-400">Overview of your finances</p>
              </div>
            </div>

            <nav className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="hidden md:inline">Home</span>
              </button>
              <button
                onClick={() => router.push('/chat')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 text-gray-300 hover:text-white transition-colors"
              >
                <span className="hidden md:inline">Chat</span>
              </button>
              <button
                onClick={() => router.push('/agent')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 transition-colors"
              >
                <Bot className="w-4 h-4" />
                <span className="hidden md:inline">Agent</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Financial Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Total Income</p>
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-3xl font-bold text-white">
                  ${mockFinancialSummary.totalIncome.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-2">This month</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Total Expenses</p>
                  <TrendingUp className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-3xl font-bold text-white">
                  ${mockFinancialSummary.totalExpenses.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-2">This month</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Savings Rate</p>
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-3xl font-bold text-white">
                  {mockFinancialSummary.savingsRate}%
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  ${mockFinancialSummary.totalSavings} saved
                </p>
              </div>
            </div>

            {/* Financial Goals */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-blue-400" />
                <h2 className="text-white font-semibold text-lg">Financial Goals</h2>
              </div>
              <div className="space-y-4">
                {mockGoals.map((goal) => {
                  const progress = (goal.currentAmount / goal.targetAmount) * 100;
                  return (
                    <div key={goal.id}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-white font-medium">{goal.name}</h3>
                          <p className="text-gray-400 text-sm">
                            ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                          </p>
                        </div>
                        <span className="text-blue-400 font-bold">{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Bills */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-6 h-6 text-yellow-400" />
                <h2 className="text-white font-semibold text-lg">Upcoming Bills</h2>
              </div>
              <div className="space-y-3">
                {mockBills
                  .filter(bill => !bill.isPaid)
                  .slice(0, 4)
                  .map((bill) => (
                    <div
                      key={bill.id}
                      className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/30"
                    >
                      <div>
                        <h3 className="text-white font-medium">{bill.name}</h3>
                        <p className="text-gray-400 text-sm">
                          Due: {bill.dueDate.toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-yellow-400 font-bold">
                        ${bill.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Column - R2-D2 Agent Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AgentWidget />
              
              {/* Quick Actions */}
              <div className="mt-6 bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => router.push('/chat')}
                    className="w-full px-4 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 rounded-lg transition-all text-left"
                  >
                    Ask AI Assistant
                  </button>
                  <button
                    onClick={() => router.push('/agent')}
                    className="w-full px-4 py-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg transition-all text-left"
                  >
                    View All Agent Actions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}