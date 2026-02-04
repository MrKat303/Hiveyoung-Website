-- Add bio_short column to profiles table
ALTER TABLE profiles 
ADD COLUMN bio_short TEXT;

-- Add comment to describe the column
COMMENT ON COLUMN profiles.bio_short IS 'Short bio displayed below social icons (max 120 characters)';
