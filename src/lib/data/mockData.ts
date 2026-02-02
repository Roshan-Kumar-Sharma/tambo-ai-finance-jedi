// lib/data/mockData.ts

import { Transaction, CategorySpending, MonthlyData, Budget, Bill, FinancialGoal, FinancialSummary } from '@/types/finance';

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