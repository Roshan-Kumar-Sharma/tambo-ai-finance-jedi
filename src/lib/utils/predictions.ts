// lib/utils/predictions.ts

import { mockMonthlyData, mockCategorySpending, mockGoals, mockBills } from '@/lib/data/mockData';

export interface MonthlyForecast {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  confidence: number;
}

export interface CategoryForecast {
  category: string;
  predicted: number;
  current: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
}

export interface GoalPrediction {
  goalId: string;
  goalName: string;
  currentAmount: number;
  targetAmount: number;
  predictedCompletionDate: Date;
  monthsToCompletion: number;
  probability: number;
  requiredMonthlySavings: number;
}

export interface RiskAlert {
  id: string;
  type: 'overdraft' | 'budget_overrun' | 'bill_miss' | 'savings_low';
  severity: 'high' | 'medium' | 'low';
  probability: number;
  description: string;
  impact: number;
  recommendation: string;
}

export interface Opportunity {
  id: string;
  type: 'save_money' | 'increase_income' | 'optimize_budget' | 'reduce_debt';
  title: string;
  description: string;
  potentialSavings: number;
  effort: 'low' | 'medium' | 'high';
  timeframe: string;
}

export function generateMonthlyForecast(months: 3 | 6 | 12): MonthlyForecast[] {
  const forecasts: MonthlyForecast[] = [];
  const historicalData = mockMonthlyData;
  
  // Calculate averages and trends
  const avgIncome = historicalData.reduce((sum, m) => sum + m.income, 0) / historicalData.length;
  const avgExpenses = historicalData.reduce((sum, m) => sum + m.expenses, 0) / historicalData.length;
  const avgSavings = historicalData.reduce((sum, m) => sum + m.savings, 0) / historicalData.length;
  
  // Calculate trend (simple linear)
  const expenseTrend = (historicalData[historicalData.length - 1].expenses - historicalData[0].expenses) / historicalData.length;
  
  const monthNames = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
  
  for (let i = 0; i < months; i++) {
    const month = monthNames[i % 12];
    
    // Add some variance and trend
    const seasonalFactor = Math.sin((i / 12) * Math.PI * 2) * 200; // Seasonal variation
    const predictedExpenses = avgExpenses + (expenseTrend * i) + seasonalFactor;
    const predictedIncome = avgIncome + (Math.random() * 200 - 100); // Small variance
    const predictedSavings = predictedIncome - predictedExpenses;
    
    // Confidence decreases with time
    const confidence = Math.max(60, 95 - (i * 3));
    
    forecasts.push({
      month,
      income: Math.round(predictedIncome),
      expenses: Math.round(predictedExpenses),
      savings: Math.round(predictedSavings),
      confidence: Math.round(confidence),
    });
  }
  
  return forecasts;
}

export function generateCategoryForecast(): CategoryForecast[] {
  return mockCategorySpending.slice(0, 6).map(cat => {
    const variance = Math.random() * 0.3 - 0.15; // -15% to +15%
    const predicted = cat.amount * (1 + variance);
    
    let trend: 'up' | 'down' | 'stable';
    if (variance > 0.05) trend = 'up';
    else if (variance < -0.05) trend = 'down';
    else trend = 'stable';
    
    return {
      category: cat.category,
      predicted: Math.round(predicted),
      current: Math.round(cat.amount),
      trend,
      confidence: Math.round(75 + Math.random() * 20),
    };
  });
}

export function generateGoalPredictions(): GoalPrediction[] {
  return mockGoals.map(goal => {
    const remaining = goal.targetAmount - goal.currentAmount;
    const monthsUntilDeadline = Math.max(1, Math.round((goal.deadline.getTime() - new Date().getTime()) / (30 * 24 * 60 * 60 * 1000)));
    
    // Assume current savings rate
    const monthlySavings = 500; // From mock data
    const monthsToCompletion = Math.ceil(remaining / monthlySavings);
    
    const predictedDate = new Date();
    predictedDate.setMonth(predictedDate.getMonth() + monthsToCompletion);
    
    const probability = monthsToCompletion <= monthsUntilDeadline ? 
      Math.min(95, 100 - (monthsToCompletion / monthsUntilDeadline) * 20) :
      Math.max(30, 80 - ((monthsToCompletion - monthsUntilDeadline) / monthsUntilDeadline) * 50);
    
    return {
      goalId: goal.id,
      goalName: goal.name,
      currentAmount: goal.currentAmount,
      targetAmount: goal.targetAmount,
      predictedCompletionDate: predictedDate,
      monthsToCompletion,
      probability: Math.round(probability),
      requiredMonthlySavings: Math.round(remaining / monthsUntilDeadline),
    };
  });
}

export function generateRiskAlerts(): RiskAlert[] {
  const alerts: RiskAlert[] = [];
  
  // Overdraft risk
  const upcomingBills = mockBills.filter(b => !b.isPaid);
  const totalBills = upcomingBills.reduce((sum, b) => sum + b.amount, 0);
  const currentBalance = 2500; // Mock current balance
  
  if (currentBalance < totalBills * 1.1) {
    alerts.push({
      id: 'risk-1',
      type: 'overdraft',
      severity: 'high',
      probability: 73,
      description: 'Potential overdraft next month',
      impact: 35,
      recommendation: 'Transfer $200 from savings or reduce discretionary spending by 15%',
    });
  }
  
  // Budget overrun
  const shoppingOverrun = mockCategorySpending.find(c => c.category === 'Shopping');
  if (shoppingOverrun && shoppingOverrun.amount > 300) {
    alerts.push({
      id: 'risk-2',
      type: 'budget_overrun',
      severity: 'medium',
      probability: 85,
      description: 'Shopping budget exceeded by $40',
      impact: 40,
      recommendation: 'Reduce shopping spending by 30% to stay on track',
    });
  }
  
  // Holiday spending spike
  alerts.push({
    id: 'risk-3',
    type: 'budget_overrun',
    severity: 'medium',
    probability: 68,
    description: 'Historical data shows 40% spending spike in December',
    impact: 600,
    recommendation: 'Set aside $500 now to prepare for holiday expenses',
  });
  
  return alerts;
}

export function generateOpportunities(): Opportunity[] {
  return [
    {
      id: 'opp-1',
      type: 'save_money',
      title: 'Switch Phone Plan',
      description: 'Competitor offering similar plan for $25/month less',
      potentialSavings: 300,
      effort: 'low',
      timeframe: 'Annual savings',
    },
    {
      id: 'opp-2',
      type: 'save_money',
      title: 'Cancel Unused Subscriptions',
      description: 'Spotify Premium unused for 45 days',
      potentialSavings: 132,
      effort: 'low',
      timeframe: 'Annual savings',
    },
    {
      id: 'opp-3',
      type: 'optimize_budget',
      title: 'Reduce Dining Out',
      description: 'Cutting dining out by 30% could save significantly',
      potentialSavings: 720,
      effort: 'medium',
      timeframe: 'Annual savings',
    },
    {
      id: 'opp-4',
      type: 'save_money',
      title: 'Refinance Car Loan',
      description: 'Lower interest rates available - could save $87/month',
      potentialSavings: 1044,
      effort: 'high',
      timeframe: 'Annual savings',
    },
  ];
}

export interface WhatIfScenario {
  incomeChange: number;
  expenseChange: number;
  categoryChanges: { category: string; change: number }[];
}

export function calculateWhatIf(scenario: WhatIfScenario, months: number = 6): MonthlyForecast[] {
  const baseForecast = generateMonthlyForecast(6);
  
  return baseForecast.map(forecast => ({
    ...forecast,
    income: forecast.income + scenario.incomeChange,
    expenses: forecast.expenses + scenario.expenseChange,
    savings: (forecast.income + scenario.incomeChange) - (forecast.expenses + scenario.expenseChange),
  }));
}

export function analyzeBehavioralPatterns() {
  return {
    highSpendingDays: ['Friday', 'Saturday'],
    avgFridaySpending: 147,
    stressSpendingCorrelation: 0.72,
    impulseCategories: ['Shopping', 'Entertainment'],
    savingsBehavior: 'consistent',
    recommendations: [
      'You typically overspend on Fridays by 35%',
      'Stress spending detected - consider alternative coping mechanisms',
      'Shopping impulse purchases spike after 8 PM',
    ],
  };
}