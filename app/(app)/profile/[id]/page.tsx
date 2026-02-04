"use client";

import React, { useState, useEffect, use } from 'react';
import { supabase } from '@/utils/supabase/client';
import { 
  MapPin, 
  MoreHorizontal,
  Sparkles
} from 'lucide-react';
import SocialIcons from '@/components/App/SocialIcons';
import MusicPlayer from '@/components/App/MusicPlayer';
import { getSkillIcon } from '@/utils/skills';
import '../Profile.css';
import { Profile } from '@/types/profile';

export default function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!id) return;
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
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

  const initials = profile.full_name 
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : profile.email?.[0].toUpperCase() || '?';

  return (
    <div className="profile-page">
      <div className="profile-container shadow-sm border border-gray-100">
        {/* Banner Area */}
        <div className="profile-banner">
          <img src="/Logo.svg" alt="Hiveyoung" className="banner-logo-linkdin" />
        </div>

        {/* Content Block */}
        <div className="profile-header-main">
          <div className="avatar-and-actions">
            <div className="profile-avatar-linkedin">
              <div className="inner-avatar-circle">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl font-black text-[#3A1B4E] select-none">{initials}</span>
                )}
              </div>
            </div>

            <div className="header-action-btns">
              <div className="edit-pencil-btn">
                <MoreHorizontal size={24} />
              </div>
            </div>
          </div>

          <div className="profile-info-container">
            <div className="identity-info">
              <h1>{profile.full_name || 'Sin Nombre'}</h1>
              <p className="headline">{profile.role || 'Miembro @ Hiveyoung'}</p>
              <div className="meta-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} className="text-gray-500" />
                {profile.location || 'Mundo Hiveyoung'}
              </div>

              <SocialIcons
                linkedin_url={profile.linkedin_url}
                instagram_url={profile.instagram_url}
                github_url={profile.github_url}
                discord_id={profile.discord_id}
              />

              {profile.bio_short && (
                <p className="bio-short-text">
                  {profile.bio_short}
                </p>
              )}
            </div>

            {/* Skills section - Added to public profile */}
            <div className="profile-skills-side">
              <div className="skills-header-mini">
                <span>Skills</span>
                <Sparkles size={14} className="text-amber-500" />
              </div>
              <div className="skills-tags-container">
                {profile.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill, i) => (
                    <span key={i} className="skill-pill-mini">
                      {getSkillIcon(skill)}
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="no-skills-text">SIN SKILLS</span>
                )}
              </div>
            </div>
          </div>

          <div className="profile-header-footer">
            <MusicPlayer music_url={profile.music_url} />
          </div>
        </div>

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
