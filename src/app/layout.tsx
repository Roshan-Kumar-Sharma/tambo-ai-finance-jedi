// app/layout.tsx (FIXED - No more serialization errors!)

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TamboProviderWrapper } from '@/components/providers/TamboProviderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FinanceJedi - Your Personal Financial Force',
  description: 'AI-powered personal finance management with generative UI',
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
        </TamboProviderWrapper>
      </body>
    </html>
  );
}