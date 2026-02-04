-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  organization TEXT,
  role TEXT,
  contact_info TEXT,
  category TEXT,
  related_user_id UUID REFERENCES profiles(id),
  added_by UUID REFERENCES profiles(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow users to see all contacts (since it's for everyone to search)
CREATE POLICY "Allow public select for authenticated" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow users to insert contacts
CREATE POLICY "Allow insert for authenticated" ON contacts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow users to update their own added contacts
CREATE POLICY "Allow update for owners" ON contacts
  FOR UPDATE USING (auth.uid() = added_by);
