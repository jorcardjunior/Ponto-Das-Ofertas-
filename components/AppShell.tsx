'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { GrokAssistant } from './GrokAssistant';
import { cn } from '../lib/utils';
import { useMediaQuery } from '../lib/hooks/useMediaQuery';

type AppShellProps = {
  children: React.ReactNode;
  alertCount?: number;
  onAlertClick?: () => void;
};

export function AppShell({ children, alertCount, onAlertClick }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 1023px)');

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div
        className={cn(
          'flex flex-1 flex-col transition-all duration-300 ease-in-out',
          !isMobile && (sidebarCollapsed ? 'ml-sidebar-collapsed' : 'ml-sidebar'),
        )}
      >
        <Header onMenuClick={() => setSidebarOpen(true)} alertCount={alertCount} onAlertClick={onAlertClick} />
        <main className="flex-1">
          {children}
        </main>
      </div>
      <GrokAssistant />
    </div>
  );
}
