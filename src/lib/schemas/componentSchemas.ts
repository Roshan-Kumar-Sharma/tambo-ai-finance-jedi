// lib/schemas/componentSchemas.ts

import { z } from 'zod';

// SpendingChart Component Schema
export const SpendingChartPropsSchema = z.object({
  data: z.array(
    z.object({
      category: z.string().describe('Category name like Housing, Food, Transportation'),
      amount: z.number().describe('Amount spent in this category'),
      percentage: z.number().optional().describe('Percentage of total spending'),
      color: z.string().optional().describe('Hex color code for the category'),
    })
  ).describe('Array of spending data by category'),
  chartType: z.enum(['pie', 'bar', 'donut']).default('pie').describe(
    'Type of chart to display. Use pie for proportions, bar for comparisons, donut for modern look'
  ),
  title: z.string().optional().describe('Chart title to display above the visualization'),
  timeframe: z.string().optional().describe('Time period for this data, e.g., "This Month", "Last 30 Days"'),
}).describe('Displays spending breakdown by category as an interactive chart');

// BudgetSummary Component Schema
export const BudgetSummaryPropsSchema = z.object({
  totalIncome: z.number().describe('Total income for the period'),
  totalExpenses: z.number().describe('Total expenses for the period'),
  totalSavings: z.number().describe('Total savings amount'),
  savingsRate: z.number().describe('Savings rate as a percentage'),
  topCategory: z.string().describe('Category with highest spending'),
  message: z.string().optional().describe('Personalized insight or message about the budget'),
}).describe('Summary card showing overall financial health with key metrics');

// SavingsProjection Component Schema
export const SavingsProjectionPropsSchema = z.object({
  currentSavings: z.number().describe('Current savings balance'),
  monthlyContribution: z.number().describe('Expected monthly savings amount'),
  projectionMonths: z.number().describe('Number of months to project into the future'),
  targetAmount: z.number().optional().describe('Optional savings goal to highlight'),
  data: z.array(
    z.object({
      month: z.string().describe('Month label'),
      projected: z.number().describe('Projected savings amount'),
      target: z.number().optional().describe('Target amount for comparison'),
    })
  ).describe('Month-by-month projection data'),
}).describe('Projects future savings based on current trends');

// SpendingInsights Component Schema
export const SpendingInsightsPropsSchema = z.object({
  insights: z.array(
    z.object({
      type: z.enum(['warning', 'success', 'info', 'tip']).describe('Type of insight'),
      category: z.string().optional().describe('Related category if applicable'),
      message: z.string().describe('The insight message to display'),
      amount: z.number().optional().describe('Related amount if applicable'),
    })
  ).describe('Array of financial insights and recommendations'),
  title: z.string().default('Financial Insights').describe('Title for the insights card'),
}).describe('Displays AI-generated insights about spending patterns and opportunities');

// MonthlyTrend Component Schema
export const MonthlyTrendPropsSchema = z.object({
  data: z.array(
    z.object({
      month: z.string().describe('Month abbreviation'),
      income: z.number().describe('Income for that month'),
      expenses: z.number().describe('Expenses for that month'),
      savings: z.number().describe('Savings for that month'),
    })
  ).describe('Monthly financial data for trend analysis'),
  showIncome: z.boolean().default(true).describe('Whether to show income line'),
  showExpenses: z.boolean().default(true).describe('Whether to show expenses line'),
  showSavings: z.boolean().default(true).describe('Whether to show savings line'),
}).describe('Line chart showing income, expenses, and savings trends over time');

// Interactable Components Schemas

// BudgetPlanner Component Schema (Interactable)
export const BudgetPlannerPropsSchema = z.object({
  budgets: z.array(
    z.object({
      category: z.string(),
      allocated: z.number(),
      spent: z.number(),
      remaining: z.number(),
    })
  ),
  totalBudget: z.number().optional(),
}).describe('Interactive budget planning tool where users can adjust allocations');

// BillTracker Component Schema (Interactable)
export const BillTrackerPropsSchema = z.object({
  bills: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      amount: z.number(),
      dueDate: z.string(),
      isPaid: z.boolean(),
      category: z.string(),
    })
  ),
}).describe('Track and manage upcoming bills and payments');

// GoalsBoard Component Schema (Interactable)
export const GoalsBoardPropsSchema = z.object({
  goals: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      targetAmount: z.number(),
      currentAmount: z.number(),
      deadline: z.string(),
      category: z.string(),
    })
  ),
}).describe('Track progress toward financial goals');

// Export type inference helpers
export type SpendingChartProps = z.infer<typeof SpendingChartPropsSchema>;
export type BudgetSummaryProps = z.infer<typeof BudgetSummaryPropsSchema>;
export type SavingsProjectionProps = z.infer<typeof SavingsProjectionPropsSchema>;
export type SpendingInsightsProps = z.infer<typeof SpendingInsightsPropsSchema>;
export type MonthlyTrendProps = z.infer<typeof MonthlyTrendPropsSchema>;
export type BudgetPlannerProps = z.infer<typeof BudgetPlannerPropsSchema>;
export type BillTrackerProps = z.infer<typeof BillTrackerPropsSchema>;
export type GoalsBoardProps = z.infer<typeof GoalsBoardPropsSchema>;