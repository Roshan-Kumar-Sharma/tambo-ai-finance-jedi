// types/finance.ts

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
}

export interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
  color?: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface Budget {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: Date;
  isPaid: boolean;
  category: string;
  recurring: boolean;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  savingsRate: number;
  topSpendingCategory: string;
}

export interface AgentAction {
  id: string;
  type: 'payment' | 'transfer' | 'budget_adjust' | 'alert' | 'subscription_cancel' | 'negotiation';
  status: 'pending' | 'approved' | 'executed' | 'rejected';
  description: string;
  reasoning: string;
  requiresApproval: boolean;
  confidence: number;
  amount?: number;
  category?: string;
  targetAccount?: string;
  sourceAccount?: string;
  billId?: string;
  createdAt: Date;
  executedAt?: Date;
}

export interface AgentRule {
  id: string;
  type: 'auto_pay' | 'auto_save' | 'budget_adjust' | 'alert';
  enabled: boolean;
  condition: string;
  action: string;
  threshold?: number;
  category?: string;
}