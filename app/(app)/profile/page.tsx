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
  Star,
  Code,
  Layout,
  Terminal,
  Database,
  Smartphone,
  Figma,
  Cpu,
  Brain,
  Globe2,
  Brush,
  Zap,
  MoreHorizontal,
  Music,
  DollarSign,
  TrendingUp,
  Mic,
  Lightbulb,
  Target,
  Users,
  Briefcase,
  Sparkles
} from 'lucide-react';
import ImageCropper from '@/components/App/ImageCropper';
import './Profile.css';

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

  useEffect(() => {
    if (profile) {
      setFormData({
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
      });
    }
  }, [profile, isModalOpen]);

  // Location Autocomplete
  const [locationQuery, setLocationQuery] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);

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
        setLocationSuggestions([...new Set(suggestions)]);
      } catch (err) {
        console.error('Error fetching locations:', err);
      }
    };

    const timer = setTimeout(fetchLocations, 400);
    return () => clearTimeout(timer);
  }, [locationQuery]);

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

      // Intelligence: Auto-correction Map for common typos or abbreviations
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
        // If typo found, use corrected version
        input = corrections[lowerInput];
      } else {
        // Intelligence: Formatting - First letter Uppercase, rest Lowercase
        // This ensures the input looks professional
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

  const getSkillIcon = (skill: string) => {
    const s = skill.toLowerCase().trim();
    
    // Direct CDN URLs for Office & Design tools (these are more reliable)
    const directIconUrls: { [key: string]: string } = {
      'excel': 'https://img.icons8.com/color/48/microsoft-excel-2019--v1.png',
      'word': 'https://img.icons8.com/color/48/microsoft-word-2019--v2.png',
      'powerpoint': 'https://img.icons8.com/color/48/microsoft-powerpoint-2019--v1.png',
      'photoshop': 'https://img.icons8.com/color/48/adobe-photoshop--v1.png',
      'illustrator': 'https://img.icons8.com/color/48/adobe-illustrator--v1.png',
      'canva': 'https://img.icons8.com/fluency/48/canva.png',
      'notion': 'https://img.icons8.com/fluency/48/notion.png',
      'slack': 'https://img.icons8.com/color/48/slack-new.png',
      'affinity': 'https://img.icons8.com/color/48/affinity-designer.png',
      'adobe': 'https://img.icons8.com/color/48/adobe-creative-cloud--v1.png',
      'blender': 'https://img.icons8.com/color/48/blender-3d.png',
    };

    // Check for direct icon URLs first
    if (directIconUrls[s]) {
      return (
        <img 
          src={directIconUrls[s]}
          alt={skill}
          className="w-3.5 h-3.5 object-contain"
        />
      );
    }
    
    // Simple Icons mapping with hex colors for programming languages & frameworks
    const simpleIconsMap: { [key: string]: { slug: string; color: string } } = {
      // Languages
      'javascript': { slug: 'javascript', color: 'F7DF1E' },
      'typescript': { slug: 'typescript', color: '3178C6' },
      'python': { slug: 'python', color: '3776AB' },
      'java': { slug: 'openjdk', color: '437291' },
      'c++': { slug: 'cplusplus', color: '00599C' },
      'c#': { slug: 'csharp', color: '239120' },
      'dart': { slug: 'dart', color: '0175C2' },
      'rust': { slug: 'rust', color: '000000' },
      'go': { slug: 'go', color: '00ADD8' },
      'php': { slug: 'php', color: '777BB4' },
      'ruby': { slug: 'ruby', color: 'CC342D' },
      'swift': { slug: 'swift', color: 'F05138' },
      'kotlin': { slug: 'kotlin', color: '7F52FF' },
      'lua': { slug: 'lua', color: '2C2D72' },
      'perl': { slug: 'perl', color: '39457E' },
      'solidity': { slug: 'solidity', color: '363636' },
      
      // Frameworks
      'react': { slug: 'react', color: '61DAFB' },
      'next.js': { slug: 'nextdotjs', color: '000000' },
      'node.js': { slug: 'nodedotjs', color: '339933' },
      'vue': { slug: 'vuedotjs', color: '4FC08D' },
      'angular': { slug: 'angular', color: 'DD0031' },
      'flutter': { slug: 'flutter', color: '02569B' },
      'django': { slug: 'django', color: '092E20' },
      'laravel': { slug: 'laravel', color: 'FF2D20' },
      'spring': { slug: 'spring', color: '6DB33F' },
      'unity': { slug: 'unity', color: '000000' },
      
      // Databases
      'mongodb': { slug: 'mongodb', color: '47A248' },
      'mysql': { slug: 'mysql', color: '4479A1' },
      'postgresql': { slug: 'postgresql', color: '4169E1' },
      'supabase': { slug: 'supabase', color: '3ECF8E' },
      'firebase': { slug: 'firebase', color: 'FFCA28' },
      'redis': { slug: 'redis', color: 'DC382D' },
      
      // Design Tools
      'figma': { slug: 'figma', color: 'F24E1E' },
      
      // Dev Tools & Cloud
      'github': { slug: 'github', color: '181717' },
      'docker': { slug: 'docker', color: '2496ED' },
      'arduino': { slug: 'arduino', color: '00979D' },
      'git': { slug: 'git', color: 'F05032' },
      'vscode': { slug: 'visualstudiocode', color: '007ACC' },
      'vercel': { slug: 'vercel', color: '000000' },
      'aws': { slug: 'amazonaws', color: 'FF9900' },
      'azure': { slug: 'microsoftazure', color: '0078D4' },
      
      // Web
      'html': { slug: 'html5', color: 'E34F26' },
      'css': { slug: 'css3', color: '1572B6' },
      'tailwind': { slug: 'tailwindcss', color: '06B6D4' },
      'sass': { slug: 'sass', color: 'CC6699' },
      'bootstrap': { slug: 'bootstrap', color: '7952B3' },
    };

    // Check for exact match first
    let iconData = simpleIconsMap[s];
    
    // Only do partial matching for multi-character keywords (avoid matching single letters)
    if (!iconData) {
      const keywords = Object.keys(simpleIconsMap)
        .filter(k => k.length > 2) // Skip single/double letter keywords like 'r', 'c', 'go'
        .sort((a,b) => b.length - a.length);
      const match = keywords.find(k => s.includes(k));
      if (match) iconData = simpleIconsMap[match];
    }
    
    if (iconData) {
      return (
        <img 
          src={`https://cdn.simpleicons.org/${iconData.slug}/${iconData.color}`}
          alt={skill}
          className="w-3.5 h-3.5 object-contain"
          style={{ filter: 'none' }}
        />
      );
    }
    
    // Default: Generic lightning bolt for everything else (Scrum, Gantt, soft skills, etc)
    return <Zap size={14} className="text-amber-400" />;
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
              
              {/* Social Icons - moved here from footer */}
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
              
              {/* Short Bio */}
              {profile?.bio_short && (
                <p className="bio-short-text">
                  {profile.bio_short}
                </p>
              )}
            </div>

            {/* Skills section on the right - Always visible */}
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

          {/* Music player - inside header block */}
          <div className="profile-header-footer">

            {profile?.music_url && (
              <div className="profile-music-wrapper">
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
