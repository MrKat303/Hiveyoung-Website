"use client";

import { useToast as useToastContext } from '@/contexts/ToastContext';

/**
 * Hook to trigger global toast notifications.
 * Shortcut to the showToast function in ToastContext.
 */
export function useToast() {
  const { showToast } = useToastContext();
  return { showToast };
}
