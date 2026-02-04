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
        .select('*, folder:folder_id(*)')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const addContact = async (contact: Omit<Contact, 'id' | 'added_by' | 'created_at' | 'folder'>) => {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('No user logged in')

        const newContact = { 
            ...contact, 
            added_by: user.id 
        }

        const { data, error } = await supabase
            .from('contacts')
            .insert([newContact])
            .select('*, folder:folder_id(*)')
            .single()

        if (error) throw error
        setContacts([data, ...contacts])
        return { success: true }
    } catch (err: any) {
        return { success: false, error: err.message }
    }
  }
  
  const updateContact = async (id: string, contact: Partial<Omit<Contact, 'id' | 'added_by' | 'created_at' | 'folder'>>) => {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .update(contact)
            .eq('id', id)
            .select('*, folder:folder_id(*)')
            .single()

        if (error) throw error
        setContacts(contacts.map(c => c.id === id ? data : c))
        return { success: true }
    } catch (err: any) {
        return { success: false, error: err.message }
    }
  }

  const deleteContact = async (id: string) => {
      try {
          const { error } = await supabase.from('contacts').delete().eq('id', id)
          if (error) throw error
          setContacts(contacts.filter(c => c.id !== id))
          return { success: true }
      } catch (err: any) {
          return { success: false, error: err.message }
      }
  }

  return { contacts, loading, error, addContact, updateContact, deleteContact, fetchContacts }
}
