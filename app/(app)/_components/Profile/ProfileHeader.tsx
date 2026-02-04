import React from 'react';
import { 
  Camera, 
  MapPin, 
  Pencil, 
  MoreHorizontal,
  Sparkles,
  Loader2
} from 'lucide-react';
import { Profile } from '@/types/profile';
import { SkillBadge } from './SkillBadge';
import { SocialLinks } from './SocialLinks';
import { MusicPlayer } from './MusicPlayer';
import '@/app/(app)/profile/Profile.css'; // Reusing existing styles

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
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : profile?.email?.[0].toUpperCase() || '?';

  return (
    <>
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
              
              {isOwnProfile && onAvatarClick && (
                <div className="avatar-camera-btn" onClick={onAvatarClick}>
                  <Camera size={26} />
                  <span>EDITAR</span>
                </div>
              )}
            </div>
          </div>

          <div className="header-action-btns">
            {isOwnProfile && onEditProfile && (
              <button className="edit-pencil-btn" onClick={onEditProfile}>
                <Pencil size={24} />
              </button>
            )}
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
            
            <SocialLinks profile={profile} />
            
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
                  <SkillBadge key={i} skill={skill} />
                ))
              ) : (
                <span className="no-skills-text">SIN SKILLS</span>
              )}
            </div>
          </div>
        </div>

        <div className="profile-header-footer">
          <MusicPlayer url={profile?.music_url || null} />
        </div>
      </div>
    </>
  );
};
