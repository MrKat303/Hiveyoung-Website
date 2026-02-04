-- Add music_url column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS music_url TEXT;
