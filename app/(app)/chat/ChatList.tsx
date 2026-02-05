"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { useProfile } from '@/hooks/useProfile';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, User, MessageCircle } from 'lucide-react';
import styles from './Chat.module.css';

type Conversation = {
  id: string; // 'global' or uuid
  name: string;
  avatar_url: string | null;
  last_message?: string;
  updated_at?: string;
};

export default function ChatList({ onSelect, selectedId }: { onSelect: (id: string) => void, selectedId: string }) {
  const { profile } = useProfile();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) fetchConversations();
  }, [profile]);

  const fetchConversations = async () => {
    if (!profile) return;
    try {
      // 1. Get IDs of conversations I'm in
      const { data: parts } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', profile.id);

      const conversationIds = parts?.map(p => p.conversation_id) || [];

      if (conversationIds.length === 0) {
        setConversations([]);
        return;
      }

      // 2. Get participants of those conversations (to find the OTHER user)
      const { data: allParts } = await supabase
        .from('conversation_participants')
        .select('conversation_id, user_id, profiles(full_name, avatar_url)')
        .in('conversation_id', conversationIds)
        .neq('user_id', profile.id); // Exclude me

      // Group by conversation
      const convsMap: Record<string, Conversation> = {};

      allParts?.forEach((p: any) => {
        const otherUser = p.profiles;
        convsMap[p.conversation_id] = {
          id: p.conversation_id,
          name: otherUser?.full_name || 'Usuario desconocido',
          avatar_url: otherUser?.avatar_url,
        };
      });

      setConversations(Object.values(convsMap));

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatList}>
      <div 
        className={`${styles.chatListItem} ${selectedId === 'global' ? styles.active : ''}`}
        onClick={() => onSelect('global')}
      >
        <div className={styles.avatarCircle} style={{ background: '#5CD494' }}>
          <Users color="white" size={20} />
        </div>
        <div className={styles.chatInfo}>
          <h4>Comunidad Hiveyoung</h4>
          <p>Chat público</p>
        </div>
      </div>

      <div className={styles.divider}></div>
      <h3 className={styles.sectionTitle}>Mensajes Directos</h3>

      {loading && <div className="p-4 text-xs text-gray-400">Cargando...</div>}

      {conversations.map(c => (
        <div 
          key={c.id} 
          className={`${styles.chatListItem} ${selectedId === c.id ? styles.active : ''}`}
          onClick={() => onSelect(c.id)}
        >
          <div className={styles.avatarCircle}>
            {c.avatar_url ? (
              <img src={c.avatar_url} alt="" />
            ) : (
              <span>{c.name[0]}</span>
            )}
          </div>
          <div className={styles.chatInfo}>
            <h4>{c.name}</h4>
            <p>Privado</p>
          </div>
        </div>
      ))}
    </div>
  );
}
