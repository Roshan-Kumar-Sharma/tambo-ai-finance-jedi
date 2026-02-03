// lib/data/mockData.ts - Complete version with Agent data

import { Transaction, CategorySpending, MonthlyData, Budget, Bill, FinancialGoal, FinancialSummary, AgentAction, AgentRule } from '@/types/finance';

// Category colors for consistent theming
export const categoryColors: Record<string, string> = {
  'Housing': '#8B5CF6',
  'Food': '#10B981',
  'Transportation': '#F59E0B',
  'Entertainment': '#EF4444',
  'Healthcare': '#3B82F6',
  'Shopping': '#EC4899',
  'Utilities': '#6366F1',
  'Savings': '#14B8A6',
  'Income': '#22C55E',
  'Other': '#9CA3AF',
};

// Recent transactions (last 30 days)
export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    date: new Date('2025-01-28'),
    amount: 1250.00,
    category: 'Housing',
    description: 'Monthly Rent',
    type: 'expense',
  },
  {
    id: 't2',
    date: new Date('2025-01-27'),
    amount: 85.50,
    category: 'Food',
    description: 'Grocery Shopping',
    type: 'expense',
  },
  {
    id: 't3',
    date: new Date('2025-01-26'),
    amount: 45.00,
    category: 'Transportation',
    description: 'Gas Station',
    type: 'expense',
  },
  {
    id: 't4',
    date: new Date('2025-01-25'),
    amount: 3500.00,
    category: 'Income',
    description: 'Monthly Salary',
    type: 'income',
  },
  {
    id: 't5',
    date: new Date('2025-01-24'),
    amount: 120.00,
    category: 'Entertainment',
    description: 'Movie Night & Dinner',
    type: 'expense',
  },
  {
    id: 't6',
    date: new Date('2025-01-23'),
    amount: 65.00,
    category: 'Utilities',
    description: 'Electricity Bill',
    type: 'expense',
  },
  {
    id: 't7',
    date: new Date('2025-01-22'),
    amount: 200.00,
    category: 'Shopping',
    description: 'Clothing Store',
    type: 'expense',
  },
  {
    id: 't8',
    date: new Date('2025-01-20'),
    amount: 95.50,
    category: 'Food',
    description: 'Restaurant',
    type: 'expense',
  },
  {
    id: 't9',
    date: new Date('2025-01-18'),
    amount: 150.00,
    category: 'Healthcare',
    description: 'Doctor Visit',
    type: 'expense',
  },
  {
    id: 't10',
    date: new Date('2025-01-15'),
    amount: 55.00,
    category: 'Transportation',
    description: 'Uber Rides',
    type: 'expense',
  },
  {
    id: 't11',
    date: new Date('2025-01-14'),
    amount: 72.30,
    category: 'Food',
    description: 'Grocery Shopping',
    type: 'expense',
  },
  {
    id: 't12',
    date: new Date('2025-01-10'),
    amount: 500.00,
    category: 'Savings',
    description: 'Monthly Savings Transfer',
    type: 'expense',
  },
];

// Category spending summary
export const mockCategorySpending: CategorySpending[] = [
  { category: 'Housing', amount: 1250.00, percentage: 38.5, color: categoryColors.Housing },
  { category: 'Food', amount: 320.50, percentage: 9.9, color: categoryColors.Food },
  { category: 'Transportation', amount: 185.00, percentage: 5.7, color: categoryColors.Transportation },
  { category: 'Entertainment', amount: 245.00, percentage: 7.5, color: categoryColors.Entertainment },
  { category: 'Healthcare', amount: 150.00, percentage: 4.6, color: categoryColors.Healthcare },
  { category: 'Shopping', amount: 340.00, percentage: 10.5, color: categoryColors.Shopping },
  { category: 'Utilities', amount: 165.00, percentage: 5.1, color: categoryColors.Utilities },
  { category: 'Savings', amount: 500.00, percentage: 15.4, color: categoryColors.Savings },
  { category: 'Other', amount: 95.00, percentage: 2.9, color: categoryColors.Other },
];

// Monthly trend data (last 6 months)
export const mockMonthlyData: MonthlyData[] = [
  { month: 'Sep', income: 3500, expenses: 2850, savings: 650 },
  { month: 'Oct', income: 3500, expenses: 3100, savings: 400 },
  { month: 'Nov', income: 3500, expenses: 2700, savings: 800 },
  { month: 'Dec', income: 4200, expenses: 3500, savings: 700 },
  { month: 'Jan', income: 3500, expenses: 3250, savings: 250 },
  { month: 'Feb', income: 3500, expenses: 2900, savings: 600 },
];

// Budget allocations
export const mockBudgets: Budget[] = [
  { category: 'Housing', allocated: 1300, spent: 1250, remaining: 50 },
  { category: 'Food', allocated: 400, spent: 320.50, remaining: 79.50 },
  { category: 'Transportation', allocated: 200, spent: 185, remaining: 15 },
  { category: 'Entertainment', allocated: 250, spent: 245, remaining: 5 },
  { category: 'Healthcare', allocated: 200, spent: 150, remaining: 50 },
  { category: 'Shopping', allocated: 300, spent: 340, remaining: -40 },
  { category: 'Utilities', allocated: 180, spent: 165, remaining: 15 },
  { category: 'Savings', allocated: 500, spent: 500, remaining: 0 },
];

// Upcoming bills
export const mockBills: Bill[] = [
  {
    id: 'b1',
    name: 'Rent',
    amount: 1250,
    dueDate: new Date('2025-02-01'),
    isPaid: true,
    category: 'Housing',
    recurring: true,
  },
  {
    id: 'b2',
    name: 'Internet',
    amount: 65,
    dueDate: new Date('2025-02-05'),
    isPaid: false,
    category: 'Utilities',
    recurring: true,
  },
  {
    id: 'b3',
    name: 'Car Insurance',
    amount: 120,
    dueDate: new Date('2025-02-10'),
    isPaid: false,
    category: 'Transportation',
    recurring: true,
  },
  {
    id: 'b4',
    name: 'Gym Membership',
    amount: 45,
    dueDate: new Date('2025-02-15'),
    isPaid: false,
    category: 'Healthcare',
    recurring: true,
  },
  {
    id: 'b5',
    name: 'Netflix',
    amount: 15.99,
    dueDate: new Date('2025-02-20'),
    isPaid: false,
    category: 'Entertainment',
    recurring: true,
  },
];

// Financial goals
export const mockGoals: FinancialGoal[] = [
  {
    id: 'g1',
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 4500,
    deadline: new Date('2025-12-31'),
    category: 'Savings',
  },
  {
    id: 'g2',
    name: 'Vacation to Europe',
    targetAmount: 5000,
    currentAmount: 1200,
    deadline: new Date('2025-08-01'),
    category: 'Entertainment',
  },
  {
    id: 'g3',
    name: 'New Laptop',
    targetAmount: 2000,
    currentAmount: 800,
    deadline: new Date('2025-06-01'),
    category: 'Shopping',
  },
];

// Financial summary
export const mockFinancialSummary: FinancialSummary = {
  totalIncome: 3500,
  totalExpenses: 3250,
  totalSavings: 250,
  savingsRate: 7.1,
  topSpendingCategory: 'Housing',
};

// Autonomous Agent Actions
export const mockAgentActions: AgentAction[] = [
  {
    id: 'a1',
    type: 'transfer',
    status: 'pending',
    description: 'Transfer $100 from Checking to Savings',
    reasoning: 'Detected potential overdraft risk based on upcoming bills. Moving funds to prevent fees.',
    requiresApproval: true,
    confidence: 85,
    amount: 100,
    sourceAccount: 'Checking',
    targetAccount: 'Savings',
    createdAt: new Date('2025-02-03T10:30:00'),
  },
  {
    id: 'a2',
    type: 'subscription_cancel',
    status: 'pending',
    description: 'Cancel unused Spotify Premium subscription',
    reasoning: 'No usage detected in the last 45 days. Potential savings: $10.99/month.',
    requiresApproval: true,
    confidence: 92,
    amount: 10.99,
    category: 'Entertainment',
    createdAt: new Date('2025-02-03T09:15:00'),
  },
  {
    id: 'a3',
    type: 'payment',
    status: 'executed',
    description: 'Auto-paid Internet bill',
    reasoning: 'Bill under $100 threshold and 3 days before due date per user rules.',
    requiresApproval: false,
    confidence: 100,
    amount: 65,
    billId: 'b2',
    category: 'Utilities',
    createdAt: new Date('2025-02-02T00:00:00'),
    executedAt: new Date('2025-02-02T08:00:00'),
  },
  {
    id: 'a4',
    type: 'alert',
    status: 'executed',
    description: 'Shopping budget exceeded',
    reasoning: 'Spent $340 of $300 allocated for Shopping. Consider reducing spending.',
    requiresApproval: false,
    confidence: 100,
    amount: 40,
    category: 'Shopping',
    createdAt: new Date('2025-01-28T14:20:00'),
    executedAt: new Date('2025-01-28T14:20:00'),
  },
  {
    id: 'a5',
    type: 'budget_adjust',
    status: 'pending',
    description: 'Reallocate $40 from Entertainment to Shopping',
    reasoning: 'Shopping over budget while Entertainment has surplus. Optimizing allocation.',
    requiresApproval: true,
    confidence: 78,
    amount: 40,
    category: 'Shopping',
    createdAt: new Date('2025-02-03T11:00:00'),
  },
  {
    id: 'a6',
    type: 'negotiation',
    status: 'pending',
    description: 'Found better car insurance rate',
    reasoning: 'Competitor offering similar coverage for $95/month vs current $120. Potential savings: $300/year.',
    requiresApproval: true,
    confidence: 88,
    amount: 25,
    category: 'Transportation',
    createdAt: new Date('2025-02-03T08:00:00'),
  },
];

// Agent Rules Configuration
export const mockAgentRules: AgentRule[] = [
  {
    id: 'r1',
    type: 'auto_pay',
    enabled: true,
    condition: 'Bill amount < $100 AND 3 days before due date',
    action: 'Automatically pay bill',
    threshold: 100,
  },
  {
    id: 'r2',
    type: 'auto_save',
    enabled: true,
    condition: 'Payday detected',
    action: 'Transfer 10% of income to savings',
    threshold: 10,
  },
  {
    id: 'r3',
    type: 'budget_adjust',
    enabled: true,
    condition: 'Category over budget by 15%+',
    action: 'Suggest reallocation from surplus categories',
    threshold: 15,
  },
  {
    id: 'r4',
    type: 'alert',
    enabled: true,
    condition: 'Overdraft risk detected',
    action: 'Notify and suggest fund transfer',
  },
  {
    id: 'r5',
    type: 'alert',
    enabled: true,
    condition: 'Subscription unused for 30+ days',
    action: 'Suggest cancellation',
  },
];

// Helper function to get spending by date range
export function getSpendingByDateRange(startDate: Date, endDate: Date): Transaction[] {
  return mockTransactions.filter(t => 
    t.date >= startDate && t.date <= endDate && t.type === 'expense'
  );
}

// Helper function to calculate category totals
export function calculateCategoryTotals(): Record<string, number> {
  return mockTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);
}