// lib/tools/financialTools.ts

import { defineTool } from '@tambo-ai/react';
import { z } from 'zod';
import { 
  mockCategorySpending, 
  mockMonthlyData, 
  mockBudgets, 
  mockBills,
  mockGoals,
  mockFinancialSummary,
  mockTransactions,
  categoryColors
} from '@/lib/data/mockData';

// Tool to get spending data by category
export const getSpendingByCategory = defineTool({
  name: 'getSpendingByCategory',
  description: 'Retrieves spending breakdown by category for visualization. Returns category names, amounts, percentages, and colors.',
  tool: async () => {
    // In a real app, this would fetch from an API or database
    return {
      data: mockCategorySpending,
      totalSpent: mockCategorySpending.reduce((sum, cat) => sum + cat.amount, 0),
      timeframe: 'This Month',
    };
  },
  inputSchema: z.object({}),
  outputSchema: z.object({
    data: z.array(z.object({
      category: z.string(),
      amount: z.number(),
      percentage: z.number(),
      color: z.string().optional(),
    })),
    totalSpent: z.number(),
    timeframe: z.string(),
  }),
});

// Tool to get monthly trend data
export const getMonthlyTrends = defineTool({
  name: 'getMonthlyTrends',
  description: 'Retrieves monthly income, expenses, and savings data for trend analysis over the past 6 months.',
  tool: async () => {
    return {
      data: mockMonthlyData,
      averageIncome: mockMonthlyData.reduce((sum, m) => sum + m.income, 0) / mockMonthlyData.length,
      averageExpenses: mockMonthlyData.reduce((sum, m) => sum + m.expenses, 0) / mockMonthlyData.length,
      averageSavings: mockMonthlyData.reduce((sum, m) => sum + m.savings, 0) / mockMonthlyData.length,
    };
  },
  inputSchema: z.object({}),
  outputSchema: z.object({
    data: z.array(z.object({
      month: z.string(),
      income: z.number(),
      expenses: z.number(),
      savings: z.number(),
    })),
    averageIncome: z.number(),
    averageExpenses: z.number(),
    averageSavings: z.number(),
  }),
});

// Tool to get budget information
export const getBudgets = defineTool({
  name: 'getBudgets',
  description: 'Retrieves current budget allocations, spending, and remaining amounts for each category.',
  tool: async () => {
    return {
      budgets: mockBudgets,
      totalAllocated: mockBudgets.reduce((sum, b) => sum + b.allocated, 0),
      totalSpent: mockBudgets.reduce((sum, b) => sum + b.spent, 0),
      totalRemaining: mockBudgets.reduce((sum, b) => sum + b.remaining, 0),
    };
  },
  inputSchema: z.object({}),
  outputSchema: z.object({
    budgets: z.array(z.object({
      category: z.string(),
      allocated: z.number(),
      spent: z.number(),
      remaining: z.number(),
    })),
    totalAllocated: z.number(),
    totalSpent: z.number(),
    totalRemaining: z.number(),
  }),
});

// Tool to get financial summary
export const getFinancialSummary = defineTool({
  name: 'getFinancialSummary',
  description: 'Retrieves overall financial health metrics including total income, expenses, savings, and savings rate.',
  tool: async () => {
    return mockFinancialSummary;
  },
  inputSchema: z.object({}),
  outputSchema: z.object({
    totalIncome: z.number(),
    totalExpenses: z.number(),
    totalSavings: z.number(),
    savingsRate: z.number(),
    topSpendingCategory: z.string(),
  }),
});

// Tool to get upcoming bills
export const getUpcomingBills = defineTool({
  name: 'getUpcomingBills',
  description: 'Retrieves list of upcoming bills with due dates, amounts, and payment status.',
  tool: async () => {
    return {
      bills: mockBills.map(bill => ({
        ...bill,
        dueDate: bill.dueDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      })),
      totalDue: mockBills.filter(b => !b.isPaid).reduce((sum, b) => sum + b.amount, 0),
      upcomingCount: mockBills.filter(b => !b.isPaid).length,
    };
  },
  inputSchema: z.object({}),
  outputSchema: z.object({
    bills: z.array(z.object({
      id: z.string(),
      name: z.string(),
      amount: z.number(),
      dueDate: z.string(),
      isPaid: z.boolean(),
      category: z.string(),
      recurring: z.boolean(),
    })),
    totalDue: z.number(),
    upcomingCount: z.number(),
  }),
});

// Tool to get financial goals
export const getFinancialGoals = defineTool({
  name: 'getFinancialGoals',
  description: 'Retrieves financial goals with target amounts, current progress, and deadlines.',
  tool: async () => {
    return {
      goals: mockGoals.map(goal => ({
        ...goal,
        deadline: goal.deadline.toISOString().split('T')[0],
        percentComplete: (goal.currentAmount / goal.targetAmount) * 100,
      })),
    };
  },
  inputSchema: z.object({}),
  outputSchema: z.object({
    goals: z.array(z.object({
      id: z.string(),
      name: z.string(),
      targetAmount: z.number(),
      currentAmount: z.number(),
      deadline: z.string(),
      category: z.string(),
      percentComplete: z.number(),
    })),
  }),
});

// Tool to get recent transactions
export const getRecentTransactions = defineTool({
  name: 'getRecentTransactions',
  description: 'Retrieves recent financial transactions with dates, amounts, categories, and descriptions.',
  tool: async ({ limit = 10 }: { limit?: number }) => {
    const sortedTransactions = [...mockTransactions]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, limit);
    
    return {
      transactions: sortedTransactions.map(t => ({
        ...t,
        date: t.date.toISOString().split('T')[0],
      })),
      totalShown: sortedTransactions.length,
    };
  },
  inputSchema: z.object({
    limit: z.number().optional().describe('Maximum number of transactions to return (default: 10)'),
  }),
  outputSchema: z.object({
    transactions: z.array(z.object({
      id: z.string(),
      date: z.string(),
      amount: z.number(),
      category: z.string(),
      description: z.string(),
      type: z.enum(['income', 'expense']),
    })),
    totalShown: z.number(),
  }),
});

// Export all tools as an array
export const financialTools = [
  getSpendingByCategory,
  getMonthlyTrends,
  getBudgets,
  getFinancialSummary,
  getUpcomingBills,
  getFinancialGoals,
  getRecentTransactions,
];