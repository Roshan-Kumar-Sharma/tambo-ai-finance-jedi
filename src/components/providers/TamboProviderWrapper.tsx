'use client';

// components/providers/TamboProviderWrapper.tsx

import { TamboProvider, type TamboComponent } from '@tambo-ai/react';
import SpendingChart from '@/components/generative/SpendingChart';
import { SpendingChartPropsSchema } from '@/lib/schemas/componentSchemas';
import { financialTools } from '@/lib/tools/financialTools';
import React from 'react';

// Register Tambo components - THIS MUST BE IN A CLIENT COMPONENT
const tamboComponents: TamboComponent[] = [
  {
    name: 'SpendingChart',
    description: 'Displays spending breakdown by category. Use when user asks about spending, expenses, where money went, spending breakdown, or wants to visualize their spending. Can show data as pie chart, bar chart, or donut chart. ALWAYS call getSpendingByCategory tool first to get the data.',
    component: SpendingChart,
    propsSchema: SpendingChartPropsSchema,
  },
  // Phase 2 will add: BudgetSummary, SavingsProjection, SpendingInsights, MonthlyTrend
  // Phase 3 will add: BudgetPlanner, BillTracker, GoalsBoard (Interactable)
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