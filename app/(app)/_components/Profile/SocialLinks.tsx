import React from 'react';
import { Linkedin, Instagram, Github, MessageSquare } from 'lucide-react';
import { Profile } from '@/types/profile';

type SocialLinksProps = {
  profile: Profile | null;
};

export const SocialLinks = ({ profile }: SocialLinksProps) => {
  if (!profile) return null;

  return (
    <div className="social-icons-strip">
      {profile.linkedin_url && (
        <a 
          href={profile.linkedin_url.startsWith('http') ? profile.linkedin_url : `https://${profile.linkedin_url}`} 
          target="_blank" 
          rel="noreferrer" 
          className="social-link-icon" 
          title="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
      )}
      {profile.instagram_url && (
        <a 
          href={profile.instagram_url.startsWith('http') ? profile.instagram_url : `https://${profile.instagram_url}`} 
          target="_blank" 
          rel="noreferrer" 
          className="social-link-icon" 
          title="Instagram"
        >
          <Instagram size={18} />
        </a>
      )}
      {profile.github_url && (
        <a 
          href={profile.github_url.startsWith('http') ? profile.github_url : `https://${profile.github_url}`} 
          target="_blank" 
          rel="noreferrer" 
          className="social-link-icon" 
          title="GitHub"
        >
          <Github size={18} />
        </a>
      )}
      {profile.discord_id && (
        <div className="social-link-icon group relative cursor-help" title={`Discord: ${profile.discord_id}`}>
          <MessageSquare size={18} />
        </div>
      )}
    </div>
  );
};
