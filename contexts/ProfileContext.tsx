"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/utils/supabase/client';
import { Profile } from '@/types/profile';

interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
  updateProfile: (newProfile: Partial<Profile>) => Promise<{ success: boolean; error?: string }>;
  uploadAvatar: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setProfile(data);
      } else {
        // Handle case where user exists in Auth but not in Profiles table yet
        setProfile(null);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (user) {
      await fetchProfile(user.id);
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [fetchProfile]);

  useEffect(() => {
    // Initial fetch
    refreshProfile();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile, refreshProfile]);

  const updateProfile = async (newProfile: Partial<Profile>) => {
    try {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) throw new Error('No estás autenticado');

      const updates = {
        ...newProfile,
        id: user.id,
        email: user.email || '',
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;
      
      setProfile(prev => prev ? { ...prev, ...updates } as Profile : (updates as Profile));
      return { success: true };
    } catch (err) {
      console.error('Error updating profile:', err);
      return { success: false, error: err instanceof Error ? err.message : 'An unknown error occurred' };
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) throw new Error('No estás autenticado');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // 3. Update the profile with the new URL
      const { success, error: updateError } = await updateProfile({ avatar_url: publicUrl });
      
      if (!success) throw new Error(updateError);

      return { success: true, url: publicUrl };
    } catch (err) {
      console.error('Error uploading avatar:', err);
      return { success: false, error: err instanceof Error ? err.message : 'An unknown error occurred' };
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, loading, error, refreshProfile, updateProfile, uploadAvatar }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
}
