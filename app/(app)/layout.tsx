import React from 'react';
import Sidebar from '@/app/(app)/_components/Shared/Sidebar';
import Topbar from '@/app/(app)/_components/Shared/Topbar';
import MobileNav from '@/app/(app)/_components/Shared/MobileNav';
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
