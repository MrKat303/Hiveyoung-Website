"use client";

import React, { useState, useEffect, use } from 'react';
import { supabase } from '@/utils/supabase/client';
import '../Profile.css';
import { Profile } from '@/types/profile';
import { ProfileHeader } from '@/app/(app)/_components/Profile/ProfileHeader';

export default function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!id) return;
      try {
        setLoading(true);
        console.log('Fetching profile for ID:', id);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        console.log('Profile data found:', data);
        setProfile(data);
      } catch (err) {
        console.error('Error loading public profile:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [id]);

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3A1B4E]"></div>
      <p className="text-gray-400 font-bold tracking-widest uppercase text-xs">Cargando perfil...</p>
    </div>
  );

  if (!profile) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white text-gray-500">
      <p>Perfil no encontrado.</p>
    </div>
  );

  return (
    <div className="profile-page">
      <div className="profile-container shadow-sm border border-gray-100">
        <ProfileHeader 
          profile={profile} 
          isOwnProfile={false} 
        />

        {/* Acerca de / Extracto */}
        <div className="profile-section-block">
          <span className="section-title">Acerca de</span>
          <div className="section-content">
            {profile.bio || 'Este perfil profesional no tiene descripción disponible en este momento.'}
          </div>
        </div>
      </div>
    </div>
  );
}
