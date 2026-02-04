-- Add title and artist columns for the minimalist music player
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS music_title TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS music_artist TEXT;
