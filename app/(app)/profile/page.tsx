"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { 
  Camera, 
  MapPin, 
  Check, 
  AlertCircle, 
  Loader2, 
  Pencil, 
  X, 
  MoreHorizontal,
  Sparkles
} from 'lucide-react';
import ImageCropper from '@/components/App/ImageCropper';
import SocialIcons from '@/components/App/SocialIcons';
import MusicPlayer from '@/components/App/MusicPlayer';
import { getSkillIcon } from '@/utils/skills';
import './Profile.css';

interface PhotonFeature {
  properties: {
    name?: string;
    city?: string;
    state?: string;
    country?: string;
  };
}

export default function ProfilePage() {
  const { profile, loading, updateProfile, uploadAvatar } = useProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    location: '',
    role: '',
    bio: '',
    bio_short: '',
    instagram_url: '',
    linkedin_url: '',
    discord_id: '',
    github_url: '',
    music_url: '',
    skills: [] as string[],
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialized = useRef(false);

  // Sync form data with profile when it loads or modal opens
  useEffect(() => {
    if (profile && (!initialized.current || isModalOpen)) {
      const data = {
        full_name: profile.full_name || '',
        location: profile.location || '',
        role: profile.role || 'user',
        bio: profile.bio || '',
        bio_short: profile.bio_short || '',
        instagram_url: profile.instagram_url || '',
        linkedin_url: profile.linkedin_url || '',
        discord_id: profile.discord_id || '',
        github_url: profile.github_url || '',
        music_url: profile.music_url || '',
        skills: profile.skills || [],
      };

      setFormData(prev => {
        const isDifferent = Object.keys(data).some(key =>
          (data as any)[key] !== (prev as any)[key]
        );
        if (isDifferent) return data;
        return prev;
      });

      if (!isModalOpen) initialized.current = true;
    }
  }, [profile, isModalOpen]);

  // Location Autocomplete
  const [locationQuery, setLocationQuery] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);

  const fetchLocations = useCallback(async (query: string) => {
    try {
      const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`);
      const data = await response.json();
      const suggestions = data.features.map((f: PhotonFeature) => {
        const p = f.properties;
        return [p.name, p.city, p.state, p.country].filter(Boolean).join(', ');
      });
      setLocationSuggestions([...new Set(suggestions as string[])]);
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  }, []);

  useEffect(() => {
    if (locationQuery.length < 3) {
      return;
    }

    const timer = setTimeout(() => {
      fetchLocations(locationQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [locationQuery, fetchLocations]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, location: val }));
    setLocationQuery(val);
    if (val.length < 3) {
      setLocationSuggestions([]);
    }
  };

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
      console.error('Update Error:', error);
      setMessage({ type: 'error', text: 'Error al actualizar: ' + error });
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

  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      
      let input = skillInput.trim();
      const lowerInput = input.toLowerCase();

      // Intelligence: Auto-correction Map
      const corrections: { [key: string]: string } = {
        'fhotoshop': 'Photoshop',
        'fotoshop': 'Photoshop',
        'potoshop': 'Photoshop',
        'ilustrator': 'Illustrator',
        'illustretor': 'Illustrator',
        'ilustreitor': 'Illustrator',
        'js': 'JavaScript',
        'ts': 'TypeScript',
        'python': 'Python',
        'pyton': 'Python',
        'pithon': 'Python',
        'jav': 'Java',
        'noud': 'Node.js',
        'node': 'Node.js',
        'supabes': 'Supabase',
        'nextjs': 'Next.js',
        'reactjs': 'React',
        'vsc': 'VS Code',
        'vscode': 'VS Code',
        'gitgub': 'GitHub',
        'gitub': 'GitHub',
        'html': 'HTML',
        'css': 'CSS',
        'cpp': 'C++',
        'cplusplus': 'C++',
        'csharp': 'C#',
        'excel': 'Excel',
        'canva': 'Canva',
        'adobe': 'Adobe',
        'photoshop': 'Photoshop',
        'ps': 'Photoshop',
        'affinity': 'Affinity',
      };

      if (corrections[lowerInput]) {
        input = corrections[lowerInput];
      } else {
        input = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
      }

      if (formData.skills.length >= 7) {
        setMessage({ type: 'error', text: 'Máximo 7 skills permitidas' });
        setTimeout(() => setMessage(null), 3000);
        return;
      }
      if (!formData.skills.includes(input)) {
        setFormData({ ...formData, skills: [...formData.skills, input] });
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) });
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

          <div className="profile-info-container">
            <div className="identity-info">
              <h1>{profile?.full_name || 'Sin Nombre'}</h1>
              <p className="headline">{profile?.role || 'Miembro @ Hiveyoung'}</p>
              <div className="meta-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} className="text-gray-500" />
                {profile?.location || 'Mundo Hiveyoung'}
              </div>
              
              <SocialIcons
                linkedin_url={profile?.linkedin_url}
                instagram_url={profile?.instagram_url}
                github_url={profile?.github_url}
                discord_id={profile?.discord_id}
              />
              
              {profile?.bio_short && (
                <p className="bio-short-text">
                  {profile.bio_short}
                </p>
              )}
            </div>

            <div className="profile-skills-side">
              <div className="skills-header-mini">
                <span>Skills</span>
                <Sparkles size={14} className="text-amber-500" />
              </div>
              <div className="skills-tags-container">
                {profile?.skills && profile.skills.length > 0 ? (
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
            <MusicPlayer music_url={profile?.music_url} />
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
                  <div className="ln-input-group relative">
                    <label className="ln-label">Ubicación</label>
                    <div className="relative">
                      <input 
                        className="ln-input" 
                        value={formData.location} 
                        placeholder="Eje: Santiago, Chile"
                        onChange={handleLocationChange}
                      />
                      {locationSuggestions.length > 0 && (
                        <div className="absolute z-[110] w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                          {locationSuggestions.map((loc, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => {
                                setFormData({...formData, location: loc});
                                setLocationSuggestions([]);
                              }}
                              className="p-4 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b last:border-0 transition-colors"
                            >
                              <MapPin size={16} className="text-[#3a1b4e] opacity-50" />
                              <span className="text-sm font-medium text-gray-700">{loc}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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
                    <label className="ln-label">Bio Corta (aparece en perfil)</label>
                    <input 
                      className="ln-input" 
                      value={formData.bio_short} 
                      onChange={e => setFormData({...formData, bio_short: e.target.value})} 
                      placeholder="Una frase que te describa..."
                      maxLength={120}
                    />
                    <span style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>{formData.bio_short.length}/120 caracteres</span>
                  </div>
                  <div className="ln-input-group full-width">
                    <label className="ln-label">Descripción Completa (Acerca de)</label>
                    <textarea className="ln-textarea" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
                  </div>
                  <div className="ln-input-group full-width">
                    <label className="ln-label">Skills (Escribe y presiona Enter)</label>
                    <input 
                      className="ln-input" 
                      value={skillInput} 
                      onChange={e => setSkillInput(e.target.value)} 
                      onKeyDown={handleAddSkill}
                      placeholder="Ej: UI Design, Python, Finanzas..."
                    />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.skills.map((skill, i) => (
                        <div key={i} className="bg-purple-50 text-[#3a1b4e] px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 border border-purple-100/50">
                          {getSkillIcon(skill)}
                          {skill}
                          <X size={14} className="cursor-pointer hover:text-red-500 transition-colors" onClick={() => removeSkill(skill)} />
                        </div>
                      ))}
                    </div>
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
