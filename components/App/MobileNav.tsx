"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, User, Home } from 'lucide-react';
import './MobileNav.css';

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="mobile-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href} 
            href={item.href} 
            className={`mobile-nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={24} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
