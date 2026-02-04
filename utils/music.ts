/**
 * Robustly parses a music URL (Spotify or Apple Music) to extract the necessary ID for embedding.
 */
export const parseMusicUrl = (url: string | null) => {
  if (!url) return null;

  try {
    if (url.includes('music.apple.com')) {
      // Format: https://music.apple.com/es/album/name/id?i=trackId
      const albumMatch = url.match(/\/album\/[^/]+\/([^/?]+)/);
      const albumId = albumMatch ? albumMatch[1] : null;

      const trackMatch = url.match(/[?&]i=([^&]+)/);
      const trackId = trackMatch ? trackMatch[1] : null;

      if (!albumId) return null;

      return {
        type: 'apple' as const,
        embedUrl: `https://embed.music.apple.com/es/album/${albumId}${trackId ? '&i=' + trackId : ''}`
      };
    }

    if (url.includes('spotify.com')) {
      // Format: https://open.spotify.com/track/trackId?si=...
      const trackMatch = url.match(/\/track\/([^/?]+)/);
      const trackId = trackMatch ? trackMatch[1] : null;

      if (!trackId) return null;

      return {
        type: 'spotify' as const,
        embedUrl: `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`
      };
    }
  } catch (error) {
    console.error('Error parsing music URL:', error);
  }

  return null;
};
