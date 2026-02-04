export const getMusicEmbedData = (url: string | null) => {
  if (!url) return null;

  if (url.includes('music.apple.com')) {
    // Apple Music
    // logic: append &i= param if present, extraction from album path
    const albumPart = url.split('album/')[1]?.split('?')[0];
    const trackParam = url.includes('?i=') ? url.split('?i=')[1] : null;
    
    if (!albumPart) return null;

    const src = `https://embed.music.apple.com/es/album/${albumPart}${trackParam ? `?i=${trackParam}` : ''}`;
    return { provider: 'apple', src };
  } 
  
  if (url.includes('spotify.com')) {
    // Spotify
    // logic: extract track id
    const trackId = url.split('track/')[1]?.split('?')[0];
    
    if (!trackId) return null;

    const src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
    return { provider: 'spotify', src };
  }

  return null;
};
