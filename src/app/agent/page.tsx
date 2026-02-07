// app/agent/page.tsx - Updated with Unified Navigation
'use client';

import React from 'react';
import UnifiedNav from '@/components/navigation/UnifiedNav';
import Breadcrumb from '@/components/navigation/Breadcrumb';
import R2D2Agent from '@/components/agent/R2D2Agent';

export default function AgentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <UnifiedNav />
      <Breadcrumb />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <R2D2Agent />
      </div>
    </div>
  );
}