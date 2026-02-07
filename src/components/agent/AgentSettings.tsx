'use client';

import React, { useState } from 'react';
import { Settings, DollarSign, Percent, Calendar, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { AgentRule } from '@/types/finance';
import { mockAgentRules } from '@/lib/data/mockData';

export default function AgentSettings() {
  const [rules, setRules] = useState<AgentRule[]>(mockAgentRules);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleRule = (ruleId: string) => {
    setRules(prev => prev.map(rule =>
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const updateThreshold = (ruleId: string, threshold: number) => {
    setRules(prev => prev.map(rule =>
      rule.id === ruleId ? { ...rule, threshold } : rule
    ));
  };

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getRuleIcon = (type: string) => {
    switch (type) {
      case 'auto_pay': return <DollarSign className="w-5 h-5" />;
      case 'auto_save': return <Percent className="w-5 h-5" />;
      case 'budget_adjust': return <Calendar className="w-5 h-5" />;
      case 'alert': return <AlertTriangle className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };

  const getRuleColor = (type: string) => {
    switch (type) {
      case 'auto_pay': return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'auto_save': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      case 'budget_adjust': return 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
      case 'alert': return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Settings className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Agent Configuration</h2>
            <p className="text-gray-400 text-sm">Configure R2-D2's autonomous behavior rules</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-top">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <p className="text-green-400 font-medium">Settings saved successfully!</p>
        </div>
      )}

      {/* Rules List */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`bg-gradient-to-r ${getRuleColor(rule.type)} border rounded-xl p-6 transition-all ${
              rule.enabled ? 'opacity-100' : 'opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className={`p-3 rounded-xl ${
                  rule.enabled ? 'bg-white/10' : 'bg-gray-500/10'
                }`}>
                  {getRuleIcon(rule.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-semibold capitalize">
                      {rule.type.replace('_', ' ')}
                    </h3>
                    <button
                      onClick={() => toggleRule(rule.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        rule.enabled ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          rule.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3">
                    <span className="font-medium">Condition:</span> {rule.condition}
                  </p>
                  
                  <p className="text-gray-300 text-sm">
                    <span className="font-medium">Action:</span> {rule.action}
                  </p>
                </div>
              </div>
            </div>

            {/* Threshold Input - FIXED SLIDER */}
            {rule.threshold !== undefined && rule.enabled && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  {rule.type === 'auto_pay' ? 'Maximum Amount ($)' : 
                   rule.type === 'auto_save' ? 'Savings Percentage (%)' : 
                   'Threshold (%)'}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max={rule.type === 'auto_pay' ? 500 : 100}
                    step={rule.type === 'auto_pay' ? 10 : 5}
                    value={rule.threshold}
                    onChange={(e) => updateThreshold(rule.id, Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-white font-bold min-w-[60px] text-right">
                    {rule.type === 'auto_pay' ? '$' : ''}{rule.threshold}{rule.type !== 'auto_pay' ? '%' : ''}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0</span>
                  <span>{rule.type === 'auto_pay' ? '$500' : '100%'}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-white font-medium mb-1">Important Notice</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              R2-D2 will only execute actions that match your configured rules. High-risk actions 
              always require your approval. You can review and modify all pending actions in the Agent Dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-blue-500/50"
        >
          <CheckCircle2 className="w-5 h-5" />
          Save Configuration
        </button>
      </div>

      {/* Info Card */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-400" />
          Agent Behavior Overview
        </h4>
        <div className="space-y-2 text-sm text-gray-400">
          <p>• <span className="text-white">Auto-Pay:</span> Automatically pays bills under your threshold</p>
          <p>• <span className="text-white">Auto-Save:</span> Transfers percentage of income to savings on payday</p>
          <p>• <span className="text-white">Budget Adjust:</span> Reallocates funds between categories when needed</p>
          <p>• <span className="text-white">Alerts:</span> Notifies you of important financial events and risks</p>
        </div>
      </div>
    </div>
  );
}