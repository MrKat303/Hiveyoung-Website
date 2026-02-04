"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/useToast';
import { normalizeSkillName } from '@/app/(app)/_utils/skillUtils';
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
import ImageCropper from '@/app/(app)/_components/Shared/ImageCropper';
import { ProfileHeader } from '@/app/(app)/_components/Profile/ProfileHeader';
import { getSkillIcon } from '@/app/(app)/_utils/skillIcons'; // Still used for input suggestion preview
import { ProfileEditModal } from '@/app/(app)/_components/Profile/ProfileEditModal';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { profile, loading, updateProfile, uploadAvatar } = useProfile();
  const { showToast } = useToast();
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
  }, [profile]);

  const handleSubmit = async (updatedData: any) => {
    setSaving(true);
    const { success, error } = await updateProfile(updatedData);

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
    <div className={styles.profile_page}>
      <div className={`${styles.profile_container} shadow-sm border border-gray-100`}>
        <ProfileHeader 
          profile={profile}
          isOwnProfile={true}
          onEditProfile={() => setIsModalOpen(true)}
          onAvatarClick={() => fileInputRef.current?.click()}
          uploading={uploading}
        />
        
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />

        <div className={styles.profile_section_block}>
          <span className={styles.section_title}>Acerca de</span>
          <div className={styles.section_content}>
            {profile?.bio || 'Este perfil profesional no tiene descripción disponible en este momento.'}
          </div>
        </div>
      </div>

      <ProfileEditModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={formData}
        onSave={handleSubmit}
        saving={saving}
      />

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
