"use client";

import React, { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import { normalizeSkillName } from '@/app/(app)/_utils/skillUtils';
import { getSkillIcon } from '@/app/(app)/_utils/skillIcons';
import { useToast } from '@/hooks/useToast';
import styles from './ProfileModal.module.css';

type ProfileEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData: any;
  onSave: (data: any) => Promise<void>;
  saving: boolean;
};

export const ProfileEditModal = ({
  isOpen,
  onClose,
  initialData,
  onSave,
  saving
}: ProfileEditModalProps) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState(initialData);
  const [skillInput, setSkillInput] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData, isOpen]);

  // Location Autocomplete
  useEffect(() => {
    if (locationQuery.length < 3) {
      setLocationSuggestions([]);
      return;
    }

    const fetchLocations = async () => {
      try {
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(locationQuery)}&limit=5`);
        const data = await response.json();
        const suggestions = data.features.map((f: any) => {
          const p = f.properties;
          return [p.name, p.city, p.state, p.country].filter(Boolean).join(', ');
        });
        setLocationSuggestions([...new Set(suggestions)] as string[]);
      } catch (err) {
        console.error('Error fetching locations:', err);
      }
    };

    const timer = setTimeout(fetchLocations, 400);
    return () => clearTimeout(timer);
  }, [locationQuery]);

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
    setFormData({ ...formData, skills: formData.skills.filter((s: string) => s !== skillToRemove) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal_window_overlay} onClick={onClose}>
      <div className={`${styles.modal_content_card} animate-in zoom-in-95 duration-200`} onClick={e => e.stopPropagation()}>
        <div className={styles.modal_header_ln}>
          <h2>Editar presentación</h2>
          <div className="cursor-pointer text-gray-400 hover:text-black" onClick={onClose}>
            <X size={24} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modal_body_ln}>
            <div className={styles.ln_form_grid}>
              <div className={`${styles.ln_input_group} full-width`}>
                <label className={styles.ln_label}>Nombre *</label>
                <input className={styles.ln_input} value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} required />
              </div>
              <div className={`${styles.ln_input_group} full-width`}>
                <label className={styles.ln_label}>Titular *</label>
                <input className={styles.ln_input} value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
              </div>
              <div className={`${styles.ln_input_group} relative`}>
                <label className={styles.ln_label}>Ubicación</label>
                <div className="relative">
                  <input 
                    className={styles.ln_input} 
                    value={formData.location} 
                    placeholder="Eje: Santiago, Chile"
                    onChange={e => {
                      setFormData({...formData, location: e.target.value});
                      setLocationQuery(e.target.value);
                      if (e.target.value === '') setLocationSuggestions([]);
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
              
              <div className={styles.ln_input_group}>
                <label className={styles.ln_label}>LinkedIn URL</label>
                <input className={styles.ln_input} value={formData.linkedin_url} onChange={e => setFormData({...formData, linkedin_url: e.target.value})} />
              </div>
              <div className={styles.ln_input_group}>
                <label className={styles.ln_label}>Instagram URL</label>
                <input className={styles.ln_input} value={formData.instagram_url} onChange={e => setFormData({...formData, instagram_url: e.target.value})} />
              </div>
              <div className={styles.ln_input_group}>
                <label className={styles.ln_label}>GitHub URL</label>
                <input className={styles.ln_input} value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} />
              </div>
              <div className={styles.ln_input_group}>
                <label className={styles.ln_label}>Usuario Discord</label>
                <input className={styles.ln_input} value={formData.discord_id} onChange={e => setFormData({...formData, discord_id: e.target.value})} />
              </div>
              <div className={`${styles.ln_input_group} full-width`}>
                <label className={styles.ln_label}>Apple Music / Spotify URL</label>
                <input className={styles.ln_input} value={formData.music_url} onChange={e => setFormData({...formData, music_url: e.target.value})} placeholder="Pega el link de tu canción favorita..." />
              </div>
              <div className={`${styles.ln_input_group} full-width`}>
                <label className={styles.ln_label}>Bio Corta (aparece en perfil)</label>
                <input 
                  className={styles.ln_input} 
                  value={formData.bio_short} 
                  onChange={e => setFormData({...formData, bio_short: e.target.value})} 
                  placeholder="Una frase que te describa..."
                  maxLength={120}
                />
                <span style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>{formData.bio_short.length}/120 caracteres</span>
              </div>
              <div className={`${styles.ln_input_group} full-width`}>
                <label className={styles.ln_label}>Descripción Completa (Acerca de)</label>
                <textarea className={styles.ln_textarea} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
              </div>
              <div className={`${styles.ln_input_group} full-width`}>
                <label className={styles.ln_label}>Skills (Escribe y presiona Enter)</label>
                <input 
                  className={styles.ln_input} 
                  value={skillInput} 
                  onChange={e => setSkillInput(e.target.value)} 
                  onKeyDown={handleAddSkill}
                  placeholder="Ej: UI Design, Python, Finanzas..."
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.skills.map((skill: string, i: number) => (
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

          <div className={styles.modal_footer_ln}>
            <button type="submit" disabled={saving} className={styles.ln_save_btn}>
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
