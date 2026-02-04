export type ContactFolder = {
  id: string;
  name: string;
  icon: string | null;
  created_at: string;
}

export type Contact = {
  id: string;
  name: string;
  organization: string | null;
  role: string | null;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  folder_id: string | null;
  tags: string[] | null;
  added_by: string;
  created_at: string;
  folder?: ContactFolder;
}
