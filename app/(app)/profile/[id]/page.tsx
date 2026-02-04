"use client";

import React, { useState, useEffect, use } from 'react';
import { supabase } from '@/utils/supabase/client';
import { 
  MapPin, 
  Instagram, 
  Linkedin, 
  Github, 
  MessageSquare,
  MoreHorizontal
} from 'lucide-react';
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

          <div className="identity-info">
            <h1>{profile.full_name || 'Sin Nombre'}</h1>
            <p className="headline">{profile.role || 'Miembro @ Hiveyoung'}</p>
            <div className="meta-text">
              {profile.location || 'Mundo Hiveyoung'}
            </div>
            <span className="contact-btn">Información de contacto</span>
            
            {/* Social Icons */}
            <div className="social-icons-strip">
              {profile.linkedin_url && (
                <a href={profile.linkedin_url.startsWith('http') ? profile.linkedin_url : `https://${profile.linkedin_url}`} target="_blank" rel="noreferrer" className="social-link-icon" title="LinkedIn">
                  <Linkedin size={18} />
                </a>
              )}
              {profile.instagram_url && (
                <a href={profile.instagram_url.startsWith('http') ? profile.instagram_url : `https://${profile.instagram_url}`} target="_blank" rel="noreferrer" className="social-link-icon" title="Instagram">
                  <Instagram size={18} />
                </a>
              )}
              {profile.github_url && (
                <a href={profile.github_url.startsWith('http') ? profile.github_url : `https://${profile.github_url}`} target="_blank" rel="noreferrer" className="social-link-icon" title="GitHub">
                  <Github size={18} />
                </a>
              )}
              {profile.discord_id && (
                <div className="social-link-icon group relative cursor-help" title={`Discord: ${profile.discord_id}`}>
                  <MessageSquare size={18} />
                </div>
              )}
            </div>

            {/* Music Player */}
            {profile.music_url && (
              <div style={{ marginTop: '24px', width: '100%', maxWidth: '660px' }}>
                {profile.music_url.includes('music.apple.com') ? (
                  <iframe 
                    allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
                    frameBorder="0" 
                    height="150" 
                    style={{ width: '100%', overflow: 'hidden', borderRadius: '12px' }} 
                    src={`https://embed.music.apple.com/es/album/${profile.music_url.split('album/')[1]?.split('?')[0]}${profile.music_url.includes('?i=') ? '&i=' + profile.music_url.split('?i=')[1] : ''}`}
                  ></iframe>
                ) : profile.music_url.includes('spotify.com') ? (
                  <iframe 
                    style={{ borderRadius: '12px' }} 
                    src={`https://open.spotify.com/embed/track/${profile.music_url.split('track/')[1]?.split('?')[0]}?utm_source=generator&theme=0`} 
                    width="100%" 
                    height="80" 
                    frameBorder="0" 
                    allowFullScreen 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                  ></iframe>
                ) : null}
              </div>
            )}
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
