import React from 'react';
import { parseMusicUrl } from '@/utils/music';

interface MusicPlayerProps {
  music_url?: string | null;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ music_url }) => {
  const musicData = parseMusicUrl(music_url ?? null);

  if (!musicData) return null;

  return (
    <div className="profile-music-wrapper">
      {musicData.type === 'apple' ? (
        <iframe
          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
          frameBorder="0"
          height="150"
          style={{ width: '100%', overflow: 'hidden', borderRadius: '12px' }}
          src={musicData.embedUrl}
        ></iframe>
      ) : (
        <iframe
          style={{ borderRadius: '12px' }}
          src={musicData.embedUrl}
          width="100%"
          height="80"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      )}
    </div>
  );
};

export default MusicPlayer;
