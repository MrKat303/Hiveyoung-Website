"use client";

import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import Link from 'next/link';
import { useProfile } from '@/hooks/useProfile';
import './Topbar.css';

export default function Topbar() {
  const { profile } = useProfile();
  
  const displayName = profile?.full_name?.split(' ')[0] || 'Usuario';
  const initial = profile?.full_name ? profile.full_name[0].toUpperCase() : profile?.email?.[0].toUpperCase() || '?';

  return (
    <header className="topbar">
      <button className="menu-toggle">
        <Menu size={24} />
      </button>
      <div className="search-bar">
        <Search size={18} />
        <input type="text" placeholder="Buscar..." />
      </div>
      <div className="user-actions">
        <button className="icon-btn">
          <Bell size={18} />
        </button>
        <Link href="/profile" className="user-profile-preview no-underline">
          <div className="avatar-placeholder overflow-hidden">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              initial
            )}
          </div>
          <span className="user-name">{displayName}</span>
        </Link>
      </div>
    </header>
  );
}
