// lib/utils/statePersistence.ts

import React from "react";

const STORAGE_PREFIX = 'financejedi_';

export interface PersistedBill {
  id: string;
  isPaid: boolean;
  paidDate?: Date;
}

export interface PersistedBudget {
  category: string;
  allocated: number;
  spent: number;
}

export interface PersistedAgentAction {
  id: string;
  status: 'pending' | 'approved' | 'executed' | 'rejected';
  executedAt?: Date;
}

export interface PersistedState {
  bills: PersistedBill[];
  budgets: PersistedBudget[];
  agentActions: PersistedAgentAction[];
  lastUpdated: string;
}

class StateManager {
  private getKey(key: string): string {
    return `${STORAGE_PREFIX}${key}`;
  }

  // Generic get/set for any data
  get<T>(key: string, defaultValue?: T): T | null {
    if (typeof window === 'undefined') return defaultValue || null;
    
    try {
      const item = localStorage.getItem(this.getKey(key));
      if (!item) return defaultValue || null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return defaultValue || null;
    }
  }

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error);
    }
  }

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error);
    }
  }

  // Bill management
  getBills(): PersistedBill[] {
    return this.get<PersistedBill[]>('bills', []) || [];
  }

  updateBillStatus(billId: string, isPaid: boolean): void {
    const bills = this.getBills();
    const existingBill = bills.find(b => b.id === billId);
    
    if (existingBill) {
      existingBill.isPaid = isPaid;
      existingBill.paidDate = isPaid ? new Date() : undefined;
    } else {
      bills.push({
        id: billId,
        isPaid,
        paidDate: isPaid ? new Date() : undefined,
      });
    }
    
    this.set('bills', bills);
  }

  getBillStatus(billId: string): boolean {
    const bills = this.getBills();
    const bill = bills.find(b => b.id === billId);
    return bill?.isPaid || false;
  }

  // Budget management
  getBudgets(): PersistedBudget[] {
    return this.get<PersistedBudget[]>('budgets', []) || [];
  }

  updateBudget(category: string, allocated: number, spent: number): void {
    const budgets = this.getBudgets();
    const existingBudget = budgets.find(b => b.category === category);
    
    if (existingBudget) {
      existingBudget.allocated = allocated;
      existingBudget.spent = spent;
    } else {
      budgets.push({ category, allocated, spent });
    }
    
    this.set('budgets', budgets);
  }

  // Agent action management
  getAgentActions(): PersistedAgentAction[] {
    return this.get<PersistedAgentAction[]>('agent_actions', []) || [];
  }

  updateAgentAction(actionId: string, status: PersistedAgentAction['status']): void {
    const actions = this.getAgentActions();
    const existingAction = actions.find(a => a.id === actionId);
    
    if (existingAction) {
      existingAction.status = status;
      existingAction.executedAt = status === 'executed' ? new Date() : undefined;
    } else {
      actions.push({
        id: actionId,
        status,
        executedAt: status === 'executed' ? new Date() : undefined,
      });
    }
    
    this.set('agent_actions', actions);
  }

  getAgentActionStatus(actionId: string): PersistedAgentAction['status'] | null {
    const actions = this.getAgentActions();
    const action = actions.find(a => a.id === actionId);
    return action?.status || null;
  }

  // Clear all data
  clearAll(): void {
    if (typeof window === 'undefined') return;
    
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }

  // Export data
  exportData(): PersistedState {
    return {
      bills: this.getBills(),
      budgets: this.getBudgets(),
      agentActions: this.getAgentActions(),
      lastUpdated: new Date().toISOString(),
    };
  }

  // Import data
  importData(data: PersistedState): void {
    this.set('bills', data.bills);
    this.set('budgets', data.budgets);
    this.set('agent_actions', data.agentActions);
  }
}

// Export singleton instance
export const stateManager = new StateManager();

// React hook for easy state management
export function usePersistedState<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [state, setState] = React.useState<T>(() => {
    return stateManager.get<T>(key, defaultValue) || defaultValue;
  });

  const setPersistedState = (value: T) => {
    setState(value);
    stateManager.set(key, value);
  };

  return [state, setPersistedState];
}