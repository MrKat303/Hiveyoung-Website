"use client";

import { useProfileContext } from '@/contexts/ProfileContext';

/**
 * Hook to consume the global Profile state.
 * Refactored to use ProfileContext for centralized state and auth sync.
 */
export function useProfile() {
  const { 
    profile, 
    loading, 
    error, 
    refreshProfile, 
    updateProfile,
    uploadAvatar
  } = useProfileContext();

  return { 
    profile, 
    loading, 
    error, 
    updateProfile,
    refreshProfile,
    uploadAvatar
  };
}
