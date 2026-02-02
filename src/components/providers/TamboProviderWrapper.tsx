'use client';

import { TamboProvider, type TamboComponent } from '@tambo-ai/react';
import SpendingChart from '@/components/generative/SpendingChart';
import BudgetSummary from '@/components/generative/BudgetSummary';
import SavingsProjection from '@/components/generative/SavingsProjection';
import SpendingInsights from '@/components/generative/SpendingInsights';
import MonthlyTrend from '@/components/generative/MonthlyTrend';
import BudgetPlanner from '@/components/generative/BudgetPlanner';
import BillTracker from '@/components/generative/BillTracker';
import GoalsBoard from '@/components/generative/GoalsBoard';
import { 
  SpendingChartPropsSchema,
  BudgetSummaryPropsSchema,
  SavingsProjectionPropsSchema,
  SpendingInsightsPropsSchema,
  MonthlyTrendPropsSchema,
  BudgetPlannerPropsSchema,
  BillTrackerPropsSchema,
  GoalsBoardPropsSchema,
} from '@/lib/schemas/componentSchemas';
import { financialTools } from '@/lib/tools/financialTools';
import React from 'react';

const tamboComponents: TamboComponent[] = [
  {
    name: 'SpendingChart',
    description: 'Displays spending breakdown by category. Use when user asks about spending, expenses, where money went, spending breakdown, or wants to visualize their spending. Can show data as pie chart, bar chart, or donut chart. ALWAYS call getSpendingByCategory tool first to get the data.',
    component: SpendingChart,
    propsSchema: SpendingChartPropsSchema,
  },
  {
    name: 'BudgetSummary',
    description: 'Shows overall financial health with income, expenses, savings, savings rate, and top spending category. Use when user asks for financial summary, overview, or health check. ALWAYS call getFinancialSummary tool first.',
    component: BudgetSummary,
    propsSchema: BudgetSummaryPropsSchema,
  },
  {
    name: 'SavingsProjection',
    description: 'Projects future savings based on current savings and monthly contribution. Shows line chart with optional target goal. Use when user asks about savings goals, projections, or future savings. ALWAYS call getMonthlyTrends tool first to calculate projection.',
    component: SavingsProjection,
    propsSchema: SavingsProjectionPropsSchema,
  },
  {
    name: 'SpendingInsights',
    description: 'Displays AI-generated insights about spending patterns with warnings, tips, success messages, or info. Use when user asks for advice, insights, recommendations, or analysis of their spending.',
    component: SpendingInsights,
    propsSchema: SpendingInsightsPropsSchema,
  },
  {
    name: 'MonthlyTrend',
    description: 'Shows income, expenses, and savings trends over multiple months as a line chart. Use when user asks about trends, history, monthly comparison, or how their finances changed over time. ALWAYS call getMonthlyTrends tool first.',
    component: MonthlyTrend,
    propsSchema: MonthlyTrendPropsSchema,
  },
  {
    name: 'BudgetPlanner',
    description: 'Interactive budget planning tool where users can adjust budget allocations for different categories. Shows current spending, allocated amounts, and remaining budget with progress bars. Use when user wants to plan or adjust their budget. ALWAYS call getBudgets tool first.',
    component: BudgetPlanner,
    propsSchema: BudgetPlannerPropsSchema,
  },
  {
    name: 'BillTracker',
    description: 'Track and manage upcoming bills and payments. Users can mark bills as paid/unpaid. Shows overdue bills, due dates, and total amount due. Use when user asks about bills, payments, or what they need to pay. ALWAYS call getUpcomingBills tool first.',
    component: BillTracker,
    propsSchema: BillTrackerPropsSchema,
  },
  {
    name: 'GoalsBoard',
    description: 'Track progress toward financial goals. Users can update their current savings amount for each goal. Shows progress bars, target amounts, and deadlines. Use when user asks about goals, savings targets, or financial objectives. ALWAYS call getFinancialGoals tool first.',
    component: GoalsBoard,
    propsSchema: GoalsBoardPropsSchema,
  },
];

interface TamboProviderWrapperProps {
  children: React.ReactNode;
}

export function TamboProviderWrapper({ children }: TamboProviderWrapperProps) {
  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={tamboComponents}
      tools={financialTools}
    >
      {children}
    </TamboProvider>
  );
}