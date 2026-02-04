import React from 'react';
import Sidebar from '@/components/App/Sidebar';
import Topbar from '@/components/App/Topbar';
import MobileNav from '@/components/App/MobileNav';
import './DashboardLayout.css';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('AppLayout rendering');
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        <main className="app-content">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
