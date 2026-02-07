// app/chat/page.tsx - With Contextual Help
'use client';

import React from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import ContextualHelp from '@/components/help/ContextualHelp';

export default function ChatPage() {
  return (
    <>
      <ChatInterface />
      <ContextualHelp section="chat" position="bottom-right" />
    </>
  );
}