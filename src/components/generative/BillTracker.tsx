'use client';

import React from 'react';
import { useTamboComponentState, useTamboStreamStatus } from '@tambo-ai/react';
import { BillTrackerProps } from '@/lib/schemas/componentSchemas';
import { Calendar, CheckCircle, Circle, DollarSign } from 'lucide-react';

export default function BillTracker({ bills }: BillTrackerProps) {
  const { streamStatus } = useTamboStreamStatus();
  const [state, setState] = useTamboComponentState('bill-tracker', { bills });

  if (!streamStatus?.isSuccess) {
    return (
      <div className="w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  const currentBills = state?.bills || bills || [];
  const paidBills = currentBills.filter(b => b?.isPaid === true);
  const unpaidBills = currentBills.filter(b => b?.isPaid !== true);
  const totalDue = unpaidBills.reduce((sum, b) => sum + (b?.amount || 0), 0);

  const togglePaid = (id: string) => {
    if (!state) return;
    
    const updatedBills = currentBills.map(bill => {
      if (bill?.id === id) {
        return { ...bill, isPaid: !bill.isPaid };
      }
      return bill;
    });

    setState({ bills: updatedBills });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const isOverdue = (dateString: string, isPaid: boolean) => {
    if (isPaid || !dateString) return false;
    try {
      const dueDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return dueDate < today;
    } catch {
      return false;
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Bill Tracker</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-gray-600 mb-1">Total Bills</p>
          <p className="text-lg font-bold text-blue-600">{currentBills.length}</p>
        </div>
        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
          <p className="text-xs text-gray-600 mb-1">Unpaid</p>
          <p className="text-lg font-bold text-red-600">{unpaidBills.length}</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xs text-gray-600 mb-1">Total Due</p>
          <p className="text-lg font-bold text-green-600">${totalDue.toFixed(2)}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-gray-700 mb-2">Unpaid Bills</h4>
        {unpaidBills.length === 0 ? (
          <p className="text-sm text-gray-500 p-3 bg-gray-50 rounded">No unpaid bills</p>
        ) : (
          unpaidBills.map((bill, index) => {
            if (!bill) return null;
            
            const id = bill.id || `bill-${index}`;
            const name = bill.name || 'Unnamed Bill';
            const amount = bill.amount || 0;
            const dueDate = bill.dueDate || '';
            const category = bill.category || 'Other';
            const overdue = isOverdue(dueDate, false);

            return (
              <div
                key={id}
                className={`p-4 rounded-lg border ${overdue ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => togglePaid(id)}
                      className="text-gray-400 hover:text-green-600"
                    >
                      <Circle className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800">{name}</h5>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(dueDate)}
                        </span>
                        <span className="text-xs text-gray-500">{category}</span>
                        {overdue && (
                          <span className="text-xs text-red-600 font-semibold">OVERDUE</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {paidBills.length > 0 && (
        <div className="mt-6 space-y-2">
          <h4 className="font-semibold text-gray-700 mb-2">Paid Bills</h4>
          {paidBills.map((bill, index) => {
            if (!bill) return null;
            
            const id = bill.id || `bill-${index}`;
            const name = bill.name || 'Unnamed Bill';
            const amount = bill.amount || 0;
            const dueDate = bill.dueDate || '';
            const category = bill.category || 'Other';

            return (
              <div
                key={id}
                className="p-4 bg-green-50 rounded-lg border border-green-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => togglePaid(id)}
                      className="text-green-600 hover:text-gray-400"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800 line-through">{name}</h5>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(dueDate)}
                        </span>
                        <span className="text-xs text-gray-500">{category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-600 flex items-center gap-1 line-through">
                      <DollarSign className="w-4 h-4" />
                      {amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}