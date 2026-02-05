import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import { useProfile } from '@/hooks/useProfile';
import { 
  Camera, 
  MapPin, 
  Pencil, 
  MoreHorizontal,
  Sparkles,
  Loader2,
  MessageCircle
} from 'lucide-react';
// ... (imports)
import Image from 'next/image';
import type { Profile } from '@/types/profile';
import { SkillBadge } from './SkillBadge';
import { SocialLinks } from './SocialLinks';
import { MusicPlayer } from './MusicPlayer';
import styles from './ProfileHeader.module.css';

type ProfileHeaderProps = {
  profile: Profile | null;
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
  onAvatarClick?: () => void;
  uploading?: boolean;
};

export const ProfileHeader = ({ 
  profile, 
  isOwnProfile = false, 
  onEditProfile, 
  onAvatarClick,
  uploading = false
}: ProfileHeaderProps) => {
  const router = useRouter();
  const { profile: myProfile } = useProfile();
  const [contacting, setContacting] = useState(false);

  const initials = profile?.full_name 
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : profile?.email?.[0].toUpperCase() || '?';

  const handleSendMessage = async () => {
    if (!myProfile || !profile || contacting) return;
    setContacting(true);

    try {
      // Use a database function (RPC) to handle the atomic creation/fetch of the conversation
      // This avoids RLS race conditions where we create a chat but can't select it yet
      const { data: convoId, error } = await supabase
        .rpc('get_or_create_conversation', { other_user_id: profile.id });

      if (error) throw error;
      
      router.push(`/chat?id=${convoId}`);
    } catch (err) {
      console.error('Error starting chat:', JSON.stringify(err, null, 2));
      alert('Error al iniciar el chat');
    } finally {
      setContacting(false);
    }
  };

  return (
    <>
      {/* Banner Area */}
      <div className={styles.profile_banner}>
        <Image 
          src="/Logo.svg" 
          alt="Hiveyoung" 
          width={120} 
          height={24} 
          className={styles.banner_logo_linkdin}
        />
      </div>

      {/* Content Block */}
      <div className={styles.profile_header_main}>
        <div className={styles.avatar_and_actions}>
          <div className={styles.profile_avatar_linkedin}>
            <div className={`${styles.inner_avatar_circle} overflow-hidden relative`}>
              {uploading ? (
                <div className="flex items-center justify-center w-full h-full">
                  <Loader2 className="animate-spin text-[#3A1B4E]" size={32} />
                </div>
              ) : profile?.avatar_url ? (
                <Image 
                  src={profile.avatar_url} 
                  alt="Profile" 
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-5xl font-black text-[#3A1B4E] select-none">{initials}</span>
              )}
              
              {isOwnProfile && onAvatarClick && (
                <div className={styles.avatar_camera_btn} onClick={onAvatarClick}>
                  <Camera size={26} />
                  <span>EDITAR</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.header_action_btns}>
            {!isOwnProfile && (
              <button 
                className={styles.edit_pencil_btn} 
                onClick={handleSendMessage} 
                disabled={contacting}
                title="Enviar mensaje"
                style={{ backgroundColor: '#3a1b4e', color: 'white', border: 'none' }}
              >
                {contacting ? <Loader2 size={24} className="animate-spin" /> : <MessageCircle size={24} />}
              </button>
            )}

            {isOwnProfile && onEditProfile && (
              <button className={styles.edit_pencil_btn} onClick={onEditProfile} aria-label="Editar perfil">
                <Pencil size={24} />
              </button>
            )}
            <div className={styles.edit_pencil_btn}>
              <MoreHorizontal size={24} />
            </div>
          </div>
        </div>

        <div className={styles.profile_info_container}>
          <div className={styles.identity_info}>
            <h1>{profile?.full_name || 'Sin Nombre'}</h1>
            <p className={styles.headline}>{profile?.role || 'Miembro @ Hiveyoung'}</p>
            <div className={styles.meta_text} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} className="text-gray-500" />
              {profile?.location || 'Mundo Hiveyoung'}
            </div>
            
            <SocialLinks profile={profile} />
            
            {/* Short Bio */}
            {profile?.bio_short && (
              <p className={styles.bio_short_text}>
                {profile.bio_short}
              </p>
            )}
          </div>

          {/* Skills section on the right - Always visible */}
          <div className={styles.profile_skills_side}>
            <div className={styles.skills_header_mini}>
              <span>Skills</span>
              <Sparkles size={14} className="text-amber-500" />
            </div>
            <div className={styles.skills_tags_container}>
              {profile?.skills && profile.skills.length > 0 ? (
                profile.skills.map((skill: string, idx: number) => (
                  <SkillBadge key={`${skill}-${idx}`} skill={skill} />
                ))
              ) : (
                <span className={styles.no_skills_text}>SIN SKILLS</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.profile_header_footer}>
          <MusicPlayer url={profile?.music_url || null} />
        </div>
      </div>
    </>
  );
};
