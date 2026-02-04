import React from 'react';
import { getMusicEmbedData } from '@/app/(app)/_utils/musicUtils';

type MusicPlayerProps = {
  url: string | null;
  className?: string;
};

export const MusicPlayer = ({ url, className }: MusicPlayerProps) => {
  const embedData = getMusicEmbedData(url);

  if (!embedData) return null;

  return (
    <div className={`profile-music-wrapper ${className || ''}`}>
      {embedData.provider === 'apple' ? (
        <iframe 
          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
          frameBorder="0" 
          height="150" 
          style={{ width: '100%', overflow: 'hidden', borderRadius: '12px' }} 
          src={embedData.src}
        ></iframe>
      ) : embedData.provider === 'spotify' ? (
        <iframe 
          style={{ borderRadius: '12px' }} 
          src={embedData.src}
          width="100%" 
          height="80" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        ></iframe>
      ) : null}
    </div>
  );
};
