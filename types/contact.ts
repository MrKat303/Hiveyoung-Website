export type Contact = {
  id: string
  user_id: string
  name: string
  email: string
  role: string | null
  status: 'active' | 'pending' | 'inactive'
  created_at: string
}
