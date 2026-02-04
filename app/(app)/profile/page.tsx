"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/useToast';
import { normalizeSkillName } from '@/app/(app)/_utils/skillUtils';
import { 
  MapPin, 
  X
} from 'lucide-react';
import ImageCropper from '@/app/(app)/_components/Shared/ImageCropper';
import { ProfileHeader } from '@/app/(app)/_components/Profile/ProfileHeader';
import { getSkillIcon } from '@/app/(app)/_utils/skillIcons'; // Still used for input suggestion preview
import { Profile } from '@/types/profile';
import './Profile.css';

interface ProfileEditFormProps {
  profile: Profile | null;
  onClose: () => void;
  onSave: (formData: Partial<Profile>) => Promise<void>;
  saving: boolean;
}

function ProfileEditForm({ profile, onClose, onSave, saving }: ProfileEditFormProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    location: profile?.location || '',
    role: profile?.role || 'user',
    bio: profile?.bio || '',
    bio_short: profile?.bio_short || '',
    instagram_url: profile?.instagram_url || '',
    linkedin_url: profile?.linkedin_url || '',
    discord_id: profile?.discord_id || '',
    github_url: profile?.github_url || '',
    music_url: profile?.music_url || '',
    skills: profile?.skills || [],
  });

  // Location Autocomplete
  const [locationQuery, setLocationQuery] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (locationQuery.length < 3) {
      return;
    }

    const controller = new AbortController();

    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(locationQuery)}&limit=5`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (data && Array.isArray(data.features)) {
          const suggestions = data.features.map((f: { properties: { name?: string, city?: string, state?: string, country?: string } }) => {
            const p = f.properties;
            return [p.name, p.city, p.state, p.country].filter(Boolean).join(', ');
          });
          setLocationSuggestions([...new Set(suggestions)] as string[]);
        }
      } catch (err) {
        console.error('Error fetching locations:', err);
      }
    };

    const timer = setTimeout(fetchLocations, 400);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [locationQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();

      const input = normalizeSkillName(skillInput);

      if (formData.skills.length >= 7) {
        showToast('Máximo 7 habilidades permitidas', 'warning');
        return;
      }
      if (input && !formData.skills.includes(input)) {
        setFormData({ ...formData, skills: [...formData.skills, input] });
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) });
  };

  return (
    <div className="modal-window-overlay" onClick={onClose}>
      <div className="modal-content-card animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="modal-header-ln">
          <h2>Editar presentación</h2>
          <div className="cursor-pointer text-gray-400 hover:text-black" onClick={onClose}>
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
                    onChange={e => {
                      setFormData({...formData, location: e.target.value});
                      setLocationQuery(e.target.value);
                      if (e.target.value.length < 3 && locationSuggestions.length > 0) {
                        setLocationSuggestions([]);
                      }
                    }}
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
          </div>

          <div className="modal-footer-ln">
            <button type="submit" disabled={saving} className="ln-save-btn">
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { profile, loading, updateProfile, uploadAvatar } = useProfile();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveProfile = async (formData: Partial<Profile>) => {
    setSaving(true);
    const { success, error } = await updateProfile(formData);

    if (success) {
      showToast('Perfil actualizado correctamente', 'success');
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    } else {
      console.error('Update Error:', error);
      showToast('Error al actualizar: ' + error, 'error');
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
      showToast('Foto actualizada correctamente', 'success');
    } else {
      showToast('Error al subir la foto', 'error');
    }
    setUploading(false);
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3A1B4E]"></div>
      <p className="text-gray-400 font-bold tracking-widest uppercase text-xs">Cargando perfil...</p>
    </div>
  );

  return (
    <div className="profile-page">
      <div className="profile-container shadow-sm border border-gray-100">
        <ProfileHeader 
          profile={profile}
          isOwnProfile={true}
          onEditProfile={() => setIsModalOpen(true)}
          onAvatarClick={() => fileInputRef.current?.click()}
          uploading={uploading}
        />
        
        {/* Hidden File Input for Avatar */}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />

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
        <ProfileEditForm
          key={profile?.id || 'new'}
          profile={profile}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProfile}
          saving={saving}
        />
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
