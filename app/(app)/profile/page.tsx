"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { 
  Camera, 
  MapPin, 
  Check, 
  AlertCircle, 
  Loader2, 
  Pencil, 
  X, 
  Instagram, 
  Linkedin, 
  Github, 
  MessageSquare,
  ChevronDown,
  Globe,
  MoreHorizontal,
  Music
} from 'lucide-react';
import ImageCropper from '@/components/App/ImageCropper';
import './Profile.css';

export default function ProfilePage() {
  const { profile, loading, updateProfile, uploadAvatar } = useProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    location: '',
    role: '',
    bio: '',
    instagram_url: '',
    linkedin_url: '',
    discord_id: '',
    github_url: '',
    music_url: '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        location: profile.location || '',
        role: profile.role || 'user',
        bio: profile.bio || '',
        instagram_url: profile.instagram_url || '',
        linkedin_url: profile.linkedin_url || '',
        discord_id: profile.discord_id || '',
        github_url: profile.github_url || '',
        music_url: profile.music_url || '',
      });
    }
  }, [profile, isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const { success, error } = await updateProfile(formData);

    if (success) {
      setMessage({ type: 'success', text: '¡Perfil actualizado!' });
      setTimeout(() => {
        setMessage(null);
        setIsModalOpen(false);
      }, 1000);
    } else {
      setMessage({ type: 'error', text: 'Error: ' + error });
    }
    setSaving(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageToCrop(reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    setImageToCrop(null);
    setUploading(true);
    const file = new File([croppedBlob], "avatar.jpg", { type: "image/jpeg" });
    const { success } = await uploadAvatar(file);
    if (success) {
      setMessage({ type: 'success', text: 'Foto actualizada' });
      setTimeout(() => setMessage(null), 3000);
    }
    setUploading(false);
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3A1B4E]"></div>
      <p className="text-gray-400 font-bold tracking-widest uppercase text-xs">Cargando perfil...</p>
    </div>
  );

  const initials = profile?.full_name 
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : profile?.email?.[0].toUpperCase() || '?';

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
                {uploading ? (
                  <Loader2 className="animate-spin text-[#3A1B4E]" size={32} />
                ) : profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl font-black text-[#3A1B4E] select-none">{initials}</span>
                )}
                
                <div className="avatar-camera-btn" onClick={() => fileInputRef.current?.click()}>
                  <Camera size={26} />
                  <span>EDITAR</span>
                </div>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="header-action-btns">
              <button className="edit-pencil-btn" onClick={() => setIsModalOpen(true)}>
                <Pencil size={24} />
              </button>
              <div className="edit-pencil-btn">
                <MoreHorizontal size={24} />
              </div>
            </div>
          </div>

          <div className="identity-info">
            <h1>{profile?.full_name || 'Sin Nombre'}</h1>
            <p className="headline">{profile?.role || 'Miembro @ Hiveyoung'}</p>
            <div className="meta-text">
              {profile?.location || 'Mundo Hiveyoung'}
            </div>
            <span className="contact-btn">Información de contacto</span>
            
            {/* Space for Social Icons as requested */}
            <div className="social-icons-strip">
              {profile?.linkedin_url && (
                <a href={profile.linkedin_url.startsWith('http') ? profile.linkedin_url : `https://${profile.linkedin_url}`} target="_blank" rel="noreferrer" className="social-link-icon" title="LinkedIn">
                  <Linkedin size={18} />
                </a>
              )}
              {profile?.instagram_url && (
                <a href={profile.instagram_url.startsWith('http') ? profile.instagram_url : `https://${profile.instagram_url}`} target="_blank" rel="noreferrer" className="social-link-icon" title="Instagram">
                  <Instagram size={18} />
                </a>
              )}
              {profile?.github_url && (
                <a href={profile.github_url.startsWith('http') ? profile.github_url : `https://${profile.github_url}`} target="_blank" rel="noreferrer" className="social-link-icon" title="GitHub">
                  <Github size={18} />
                </a>
              )}
              {profile?.discord_id && (
                <div className="social-link-icon group relative cursor-help" title={`Discord: ${profile.discord_id}`}>
                  <MessageSquare size={18} />
                </div>
              )}
            </div>

            {/* Visible Music Player */}
            {profile?.music_url && (
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
            {profile?.bio || 'Este perfil profesional no tiene descripción disponible en este momento.'}
          </div>
        </div>
      </div>

      {/* LinkedIn-Style Edit Modal */}
      {isModalOpen && (
        <div className="modal-window-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content-card animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="modal-header-ln">
              <h2>Editar presentación</h2>
              <div className="cursor-pointer text-gray-400 hover:text-black" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body-ln">
                <div className="ln-form-grid">
                  <div className="ln-input-group full-width">
                    <label className="ln-label">Nombre *</label>
                    <input className="ln-input" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} required />
                  </div>
                  <div className="ln-input-group full-width">
                    <label className="ln-label">Titular *</label>
                    <input className="ln-input" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                  </div>
                  <div className="ln-input-group">
                    <label className="ln-label">Ubicación</label>
                    <input className="ln-input" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                  </div>
                  <div className="ln-input-group">
                    <label className="ln-label">Teléfono</label>
                    <input className="ln-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="ln-input-group">
                    <label className="ln-label">LinkedIn URL</label>
                    <input className="ln-input" value={formData.linkedin_url} onChange={e => setFormData({...formData, linkedin_url: e.target.value})} />
                  </div>
                  <div className="ln-input-group">
                    <label className="ln-label">Instagram URL</label>
                    <input className="ln-input" value={formData.instagram_url} onChange={e => setFormData({...formData, instagram_url: e.target.value})} />
                  </div>
                  <div className="ln-input-group">
                    <label className="ln-label">GitHub URL</label>
                    <input className="ln-input" value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} />
                  </div>
                  <div className="ln-input-group">
                    <label className="ln-label">Usuario Discord</label>
                    <input className="ln-input" value={formData.discord_id} onChange={e => setFormData({...formData, discord_id: e.target.value})} />
                  </div>
                  <div className="ln-input-group full-width">
                    <label className="ln-label">Apple Music / Spotify URL</label>
                    <input className="ln-input" value={formData.music_url} onChange={e => setFormData({...formData, music_url: e.target.value})} placeholder="Pega el link de tu canción favorita..." />
                  </div>
                  <div className="ln-input-group full-width">
                    <label className="ln-label">Descripción (Acerca de)</label>
                    <textarea className="ln-textarea" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
                  </div>
                </div>

                {message && (
                  <div className={`mt-4 p-3 rounded flex items-center gap-2 text-sm font-bold ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                    {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                    {message.text}
                  </div>
                )}

                <div className="modal-footer-ln">
                  <button type="submit" disabled={saving} className="ln-save-btn">
                    {saving ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {imageToCrop && (
        <ImageCropper 
          image={imageToCrop} 
          onCropComplete={handleCropComplete} 
          onCancel={() => setImageToCrop(null)} 
        />
      )}
    </div>
  );
}
