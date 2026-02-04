import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { Profile } from '@/types/profile'

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          setLoading(false)
          return
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') {
          throw error
        }

        if (data) {
          setProfile(data)
        } else {
          // Fallback if no profile exists yet
          const fallback: Profile = {
            id: user.id,
            email: user.email!,
            full_name: user.user_metadata?.full_name || '',
            phone: null,
            location: null,
            role: 'user',
            bio: null,
            avatar_url: null,
            instagram_url: null,
            linkedin_url: null,
            discord_id: null,
            github_url: null,
            music_url: null,
            skills: [],
            updated_at: new Date().toISOString()
          }
          setProfile(fallback)
        }

      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const updateProfile = async (newProfile: Partial<Profile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user logged in')

      const updates = {
        ...newProfile,
        id: user.id,
        email: user.email!,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase
        .from('profiles')
        .upsert(updates)

      if (error) throw error
      
      setProfile(prev => prev ? { ...prev, ...updates } as Profile : (updates as Profile))
      return { success: true }
    } catch (err: any) {
      console.error('Error updating profile:', err)
      return { success: false, error: err.message }
    }
  }

  const uploadAvatar = async (file: File) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user logged in')

      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      // 1. Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 2. Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      // 3. Update the profile with the new URL
      const { success, error: updateError } = await updateProfile({ avatar_url: publicUrl })
      
      if (!success) throw new Error(updateError)

      return { success: true, url: publicUrl }
    } catch (err: any) {
      console.error('Error uploading avatar:', err)
      return { success: false, error: err.message }
    }
  }

  return { profile, loading, error, updateProfile, uploadAvatar }
}
