"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/utils/supabase/client';
import './Topbar.css';

export default function Topbar() {
  const { profile } = useProfile();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<{ id: string, full_name: string | null, avatar_url: string | null, email: string, role: string | null }[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const displayName = profile?.full_name?.split(' ')[0] || 'Usuario';
  const initial = profile?.full_name ? profile.full_name[0].toUpperCase() : profile?.email?.[0].toUpperCase() || '?';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const search = searchTerm.trim();
      if (search.length > 2) {
        console.log('Searching for:', search);
        void (async () => {
          const { data, error } = await supabase
            .from('profiles')
            .select('id, full_name, avatar_url, email, role')
            .or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
            .limit(5);

          if (error) {
            console.error('Search error:', error);
          }

          if (data) {
            setResults(data);
            setShowResults(true);
          }
        })();
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSelectUser = (userId: string) => {
    setSearchTerm('');
    setShowResults(false);
    router.push(`/profile/${userId}`);
  };

  return (
    <header className="topbar">
      <button className="menu-toggle">
        <Menu size={24} />
      </button>
      
      <div className="search-container-wrapper" ref={searchRef}>
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Buscar usuarios..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.length > 2 && setShowResults(true)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <X size={14} />
            </button>
          )}
        </div>

        {showResults && (
          <div className="search-results-dropdown">
            {results.length > 0 ? (
              results.map((user) => (
                <div 
                  key={user.id} 
                  className="search-result-item"
                  onClick={() => handleSelectUser(user.id)}
                >
                  <div className="result-avatar relative overflow-hidden">
                    {user.avatar_url ? (
                      <Image src={user.avatar_url} alt="" fill className="object-cover" />
                    ) : (
                      <span>{user.full_name?.[0] || user.email?.[0] || '?'}</span>
                    )}
                  </div>
                  <div className="result-info">
                    <span className="result-name">{user.full_name || 'Sin nombre'}</span>
                    <span className="result-role">{user.role || 'Miembro @ Hiveyoung'}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">No se encontraron usuarios</div>
            )}
          </div>
        )}
      </div>

      <div className="user-actions">
        <button className="icon-btn">
          <Bell size={18} />
        </button>
        <Link href="/profile" className="user-profile-preview no-underline">
          <div className="avatar-placeholder overflow-hidden relative">
            {profile?.avatar_url ? (
              <Image src={profile.avatar_url} alt="Profile" fill className="object-cover" />
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
