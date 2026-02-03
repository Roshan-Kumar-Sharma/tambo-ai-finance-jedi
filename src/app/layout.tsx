// app/layout.tsx - Updated with Agent Notification
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TamboProviderWrapper } from '@/components/providers/TamboProviderWrapper';
import AgentNotification from '@/components/agent/AgentNotification';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FinanceJedi - Your Personal Financial Force',
  description: 'AI-powered personal finance management with generative UI and autonomous agents',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TamboProviderWrapper>
          {children}
          <AgentNotification />
        </TamboProviderWrapper>
      </body>
    </html>
  );
}