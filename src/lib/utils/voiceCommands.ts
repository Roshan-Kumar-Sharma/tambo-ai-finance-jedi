// lib/utils/voiceCommands.ts

import { mockFinancialSummary, mockGoals, mockBills, mockCategorySpending } from '@/lib/data/mockData';
import { formatFinancialYoda, yodaProgressUpdate, generateYodaResponse } from './yodaSpeak';

export interface VoiceCommandResult {
  success: boolean;
  response: string;
  action?: string;
  data?: any;
}

export function processVoiceCommand(command: string): VoiceCommandResult {
  const lowerCommand = command.toLowerCase().trim();

  // Spending queries
  if (lowerCommand.includes('spending') || lowerCommand.includes('spent')) {
    if (lowerCommand.includes('coffee') || lowerCommand.includes('food')) {
      const foodSpending = mockCategorySpending.find(c => c.category === 'Food');
      return {
        success: true,
        response: formatFinancialYoda(foodSpending?.amount || 0, 'spending') + 
                  ` ${Math.round(foodSpending?.percentage || 0)}% of budget, this is.`,
        action: 'show_spending',
        data: { category: 'Food', amount: foodSpending?.amount },
      };
    }
    
    return {
      success: true,
      response: `${formatFinancialYoda(mockFinancialSummary.totalExpenses, 'spending')} Top category, ${mockFinancialSummary.topSpendingCategory} is.`,
      action: 'show_spending',
      data: { total: mockFinancialSummary.totalExpenses },
    };
  }

  // Savings queries
  if (lowerCommand.includes('savings') || lowerCommand.includes('save')) {
    return {
      success: true,
      response: formatFinancialYoda(mockFinancialSummary.totalSavings, 'saving') + 
                ` ${mockFinancialSummary.savingsRate}% rate, you maintain. Excellent, this is!`,
      action: 'show_savings',
      data: { amount: mockFinancialSummary.totalSavings, rate: mockFinancialSummary.savingsRate },
    };
  }

  // Budget queries
  if (lowerCommand.includes('budget')) {
    const budgetLeft = 3500 - mockFinancialSummary.totalExpenses;
    return {
      success: true,
      response: formatFinancialYoda(budgetLeft, 'budget') + ' Careful with spending, you must be.',
      action: 'show_budget',
      data: { remaining: budgetLeft },
    };
  }

  // Bills queries
  if (lowerCommand.includes('bill') || lowerCommand.includes('payment')) {
    const upcomingBills = mockBills.filter(b => !b.isPaid);
    const totalDue = upcomingBills.reduce((sum, bill) => sum + bill.amount, 0);
    const nextBill = upcomingBills[0];
    
    return {
      success: true,
      response: `${upcomingBills.length} bills upcoming, you have. $${totalDue.toFixed(2)} total, they amount to. Next: ${nextBill?.name}, $${nextBill?.amount} on ${nextBill?.dueDate.toLocaleDateString()}.`,
      action: 'show_bills',
      data: { bills: upcomingBills, total: totalDue },
    };
  }

  // Goals queries
  if (lowerCommand.includes('goal') || lowerCommand.includes('progress')) {
    const mainGoal = mockGoals[0];
    const progress = yodaProgressUpdate(mainGoal.currentAmount, mainGoal.targetAmount, mainGoal.name);
    
    return {
      success: true,
      response: progress + ` $${mainGoal.currentAmount} of $${mainGoal.targetAmount}, saved you have.`,
      action: 'show_goals',
      data: { goal: mainGoal },
    };
  }

  // Set budget
  if (lowerCommand.includes('set budget') || lowerCommand.includes('create budget')) {
    return {
      success: true,
      response: generateYodaResponse('affirmations', 'I will help you set a budget. Specify the category and amount, you should.'),
      action: 'set_budget',
    };
  }

  // Pay bill
  if (lowerCommand.includes('pay') && lowerCommand.includes('bill')) {
    return {
      success: true,
      response: generateYodaResponse('affirmations', 'Payment initiated, it is. Confirm the amount and recipient, you must.'),
      action: 'pay_bill',
    };
  }

  // What if scenarios
  if (lowerCommand.includes('what if') || lowerCommand.includes('if i')) {
    return {
      success: true,
      response: generateYodaResponse('suggestions', 'Calculate this scenario, I can. Impact on your goals, show you I will.'),
      action: 'what_if',
    };
  }

  // General help
  if (lowerCommand.includes('help') || lowerCommand.includes('can you')) {
    return {
      success: true,
      response: `Ask about spending, savings, bills, or goals, you can. Set budgets, pay bills, analyze scenarios - all these, I help with. What seek you, young Padawan?`,
      action: 'help',
    };
  }

  // Challenge/motivation
  if (lowerCommand.includes('challenge') || lowerCommand.includes('motivate')) {
    return {
      success: true,
      response: `Challenge, I create for you! Save $50 this week, you must. Coffee purchases, reduce by half. Strong with the Force, you will become!`,
      action: 'create_challenge',
      data: { type: 'savings', amount: 50, duration: 'week' },
    };
  }

  // Default response for unrecognized commands
  return {
    success: false,
    response: generateYodaResponse('general', 'Understand your command, I do not. Rephrase, you should. Ask about spending, savings, bills, or goals, you can.'),
    action: 'unknown',
  };
}

export const sampleVoiceCommands = [
  "What's my coffee spending this month?",
  "Show me my savings",
  "How much budget do I have left?",
  "When is my next bill due?",
  "What's my goal progress?",
  "Set a challenge for me",
  "Help me save money",
  "What if I save $50 more per month?",
];