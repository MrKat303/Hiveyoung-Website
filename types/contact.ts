export type Contact = {
  id: string;
  name: string;
  organization: string | null;
  role: string | null;
  contact_info: string | null;
  category: string | null;
  related_user_id: string | null; // "Persona" - registered user
  added_by: string;
  created_at: string;
}
