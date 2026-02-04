import React from 'react';
import { 
  Camera, 
  MapPin, 
  Pencil, 
  MoreHorizontal,
  Sparkles,
  Loader2
} from 'lucide-react';
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
  const initials = profile?.full_name 
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : profile?.email?.[0].toUpperCase() || '?';

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
            {isOwnProfile && onEditProfile && (
              <button className={styles.edit_pencil_btn} onClick={onEditProfile} aria-label="Editar perfil">
                <Pencil size={24} />
              </button>
            )}
            <div className={styles.edit_pencil_btn}>
              < MoreHorizontal size={24} />
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
