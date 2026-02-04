import React from 'react';
import { Linkedin, Instagram, Github, MessageSquare } from 'lucide-react';

interface SocialIconsProps {
  linkedin_url?: string | null;
  instagram_url?: string | null;
  github_url?: string | null;
  discord_id?: string | null;
}

const SocialIcons: React.FC<SocialIconsProps> = ({
  linkedin_url,
  instagram_url,
  github_url,
  discord_id,
}) => {
  const formatUrl = (url: string) => (url.startsWith('http') ? url : `https://${url}`);

  return (
    <div className="social-icons-strip">
      {linkedin_url && (
        <a
          href={formatUrl(linkedin_url)}
          target="_blank"
          rel="noreferrer"
          className="social-link-icon"
          title="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
      )}
      {instagram_url && (
        <a
          href={formatUrl(instagram_url)}
          target="_blank"
          rel="noreferrer"
          className="social-link-icon"
          title="Instagram"
        >
          <Instagram size={18} />
        </a>
      )}
      {github_url && (
        <a
          href={formatUrl(github_url)}
          target="_blank"
          rel="noreferrer"
          className="social-link-icon"
          title="GitHub"
        >
          <Github size={18} />
        </a>
      )}
      {discord_id && (
        <div
          className="social-link-icon group relative cursor-help"
          title={`Discord: ${discord_id}`}
        >
          <MessageSquare size={18} />
        </div>
      )}
    </div>
  );
};

export default SocialIcons;
