'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const pathToLabel: Record<string, string> = {
  '/': 'Home',
  '/chat': 'Chat',
  '/agent': 'R2-D2 Agent',
  '/voice': 'Yoda Voice',
  '/vision': 'Force Vision',
  '/docs': 'Documentation',
};

export default function Breadcrumb() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show breadcrumb on home page
  if (pathname === '/') {
    return null;
  }

  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' }
  ];

  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = pathToLabel[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({ label, path: currentPath });
  });

  return (
    <div className="bg-slate-900/30 border-b border-slate-700/30">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-white font-medium">{crumb.label}</span>
              ) : (
                <button
                  onClick={() => router.push(crumb.path)}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  {index === 0 && <Home className="w-4 h-4" />}
                  <span>{crumb.label}</span>
                </button>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}