"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, User, LogOut, MessageSquare } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import './Sidebar.css';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const menuItems = [
    { href: '/profile', label: 'Perfil', icon: User },
    { href: '/contacts', label: 'Contactos', icon: Users },
    { href: '/chat', label: 'Chat', icon: MessageSquare },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/Logo.svg" alt="Hiveyoung" className="sidebar-logo-img" />
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
