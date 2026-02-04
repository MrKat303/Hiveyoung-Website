import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { Contact } from '@/types/contact'

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const addContact = async (contact: Omit<Contact, 'id' | 'user_id' | 'created_at'>) => {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('No user logged in')

        const newContact = { 
            ...contact, 
            user_id: user.id 
        }

        const { data, error } = await supabase
            .from('contacts')
            .insert([newContact])
            .select()
            .single()

        if (error) throw error
        setContacts([data, ...contacts])
        return { success: true }
    } catch (err) {
        return { success: false, error: err instanceof Error ? err.message : 'An unknown error occurred' }
    }
  }
  
  const deleteContact = async (id: string) => {
      try {
          const { error } = await supabase.from('contacts').delete().eq('id', id)
          if (error) throw error
          setContacts(contacts.filter(c => c.id !== id))
          return { success: true }
      } catch (err) {
          return { success: false, error: err instanceof Error ? err.message : 'An unknown error occurred' }
      }
  }

  return { contacts, loading, error, addContact, deleteContact, fetchContacts }
}
