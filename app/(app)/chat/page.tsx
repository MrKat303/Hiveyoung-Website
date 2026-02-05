"use client";

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/utils/supabase/client';
import { useProfile } from '@/hooks/useProfile';
import { Send, MessageSquare, Loader2, Menu } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './Chat.module.css';
import ChatList from './ChatList';

type Message = {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  conversation_id: string | null;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
};

export default function ChatPage() {
  const { profile } = useProfile();
  const searchParams = useSearchParams();
  const router = useRouter();
  const chatId = searchParams.get('id') || 'global';
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatPartner, setChatPartner] = useState<{ full_name: string | null; avatar_url: string | null } | null>(null);
  const [listRefreshKey, setListRefreshKey] = useState(0);

  const isGlobal = chatId === 'global';
  const dbConversationId = isGlobal ? null : chatId;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectChat = (id: string) => {
    if (id === 'global') router.push('/chat');
    else router.push(`/chat?id=${id}`);
    setMobileMenuOpen(false);
  };

  // Fetch Chat Partner Info for Header
  useEffect(() => {
    if (isGlobal || !profile || !chatId) {
      setChatPartner(null);
      return;
    }

    const fetchPartner = async () => {
      const { data } = await supabase
        .from('conversation_participants')
        .select('profiles(full_name, avatar_url)')
        .eq('conversation_id', chatId)
        .neq('user_id', profile.id)
        .single();
      
      if (data?.profiles) {
        setChatPartner(data.profiles as any);
      }
    };

    fetchPartner();
  }, [chatId, isGlobal, profile]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchMessages();

    // Subscribe to messages
    const channel = supabase
      .channel('chat-room')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        async (payload) => {
          const newMessage = payload.new as Message;
          
          // Trigger list refresh on ANY new message (so the sidebar updates with latest message/ordering)
          setListRefreshKey(prev => prev + 1);

          // Client-side filtering: Only add if it belongs to current chat
          const belongsToCurrentChat = isGlobal 
            ? newMessage.conversation_id === null
            : newMessage.conversation_id === chatId;

          if (!belongsToCurrentChat) return;

          // Fetch user details for the new message
          const { data: userData } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', newMessage.user_id)
            .single();

          const newMsg: Message = {
            id: newMessage.id,
            content: newMessage.content,
            user_id: newMessage.user_id,
            created_at: newMessage.created_at,
            conversation_id: newMessage.conversation_id,
            profiles: userData || null,
          };

          setMessages((current) => {
            if (current.some(m => m.id === newMsg.id)) return current;
            return [...current, newMsg];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, isGlobal]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('messages')
        .select(`
          id,
          content,
          user_id,
          created_at,
          conversation_id,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: true })
        .limit(50);

      if (isGlobal) {
        query = query.is('conversation_id', null);
      } else {
        query = query.eq('conversation_id', chatId);
      }

      const { data, error } = await query;

      if (error) throw error;
      if (data) setMessages(data as any); 
    } catch (error) {
      console.error('Error fetching messages:', JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !profile) return;

    try {
      setSending(true);
      const messageContent = newMessage.trim();
      setNewMessage(''); 

      // 1. Insert and get the data back immediately
      const { data, error } = await supabase
        .from('messages')
        .insert({
          content: messageContent,
          user_id: profile.id,
          conversation_id: dbConversationId
        })
        .select()
        .single();

      if (error) throw error;

      // 2. Manually add to state immediately (giving instant feedback)
      if (data) {
        const myMsg: Message = {
          id: data.id,
          content: data.content,
          user_id: data.user_id,
          created_at: data.created_at,
          conversation_id: data.conversation_id,
          profiles: {
            full_name: profile.full_name,
            avatar_url: profile.avatar_url
          }
        };

        setMessages((current) => {
          if (current.some(m => m.id === myMsg.id)) return current;
          return [...current, myMsg];
        });

        // Refresh the list to show the latest message preview/timestamp
        setListRefreshKey(prev => prev + 1);
      }

    } catch (error) {
      console.error('Error sending message:', JSON.stringify(error, null, 2));
      alert('No se pudo enviar el mensaje');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.chatContainer}>
      {/* Sidebar List */}
      <div className={`${styles.chatList} ${!mobileMenuOpen ? styles.hiddenMobile : ''}`}>
        <ChatList key={listRefreshKey} onSelect={handleSelectChat} selectedId={chatId} />
      </div>

      {/* Main Chat Area */}
      <div className={`${styles.chatMain} ${mobileMenuOpen ? styles.hiddenMobile : ''}`}>
        <header className={styles.chatHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
                  className="md:hidden p-2 text-gray-600"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  style={{ display: mobileMenuOpen ? 'none' : 'block' }}
            >
              <Menu size={24} />
            </button>

            {/* Dynamic Header Info */}
            {isGlobal ? (
               <div className={styles.headerInfo}>
                <h1>Comunidad Hiveyoung</h1>
                <p><span className={styles.liveIndicator}></span> Chat en vivo</p>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className={styles.avatarCircle} style={{ width: 42, height: 42 }}>
                    {chatPartner?.avatar_url ? (
                        <img src={chatPartner.avatar_url} alt={chatPartner.full_name || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span>{chatPartner?.full_name?.[0] || '?'}</span>
                    )}
                  </div>
                  <div>
                    <h1 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                        {chatPartner?.full_name || 'Cargando...'}
                    </h1>
                     <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>En línea</p>
                  </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            {/* Header Actions */}
          </div>
        </header>

        {loading ? (
             <div className="flex items-center justify-center flex-1 bg-white">
               <Loader2 className="animate-spin text-[#3a1b4e]" size={32} />
             </div>
        ) : (
            <div className={styles.messagesArea}>
                {messages.length === 0 ? (
                <div className={styles.emptyState}>
                    <MessageSquare size={48} strokeWidth={1.5} />
                    <p>Sé el primero en escribir un mensaje</p>
                </div>
                ) : (
                messages.map((msg, index) => {
                    const isOwn = profile?.id === msg.user_id;
                    const showDate = index === 0 || new Date(msg.created_at).toDateString() !== new Date(messages[index-1].created_at).toDateString();
                    
                    return (
                        <React.Fragment key={msg.id}>
                            {showDate && (
                                <div className={styles.dateDivider}>
                                    {new Date(msg.created_at).toLocaleDateString([], { weekday: 'long', hour: '2-digit', minute: '2-digit' })}
                                </div>
                            )}
                            
                            <div className={`${styles.messageGroup} ${isOwn ? styles.own : styles.other}`}>
                                {/* Avatar */}
                                <div className={styles.messageAvatar}>
                                    {isOwn ? (
                                        profile?.avatar_url ? <img src={profile.avatar_url} alt="Me" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center">You</div>
                                    ) : (
                                        msg.profiles?.avatar_url ? <img src={msg.profiles.avatar_url} alt={msg.profiles.full_name || ''} /> : <div className="w-full h-full bg-gray-200" />
                                    )}
                                </div>

                                {/* Content Wrapper */}
                                <div className={styles.messageContentWrapper}>
                                    {!isOwn && (
                                        <span className={styles.senderName}>
                                            {msg.profiles?.full_name || 'Usuario desconocido'}
                                        </span>
                                    )}
                                    
                                    <div className={styles.bubbleContent}>
                                        {msg.content}
                                        <span className={styles.timestamp}>
                                            {formatTime(msg.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })
                )}
                <div ref={messagesEndRef} />
            </div>
        )}

        <form className={styles.inputArea} onSubmit={handleSendMessage}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.messageInput}
              placeholder="Escribe un mensaje..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={sending}
            />
          </div>
          <button 
            type="submit" 
            className={styles.sendButton}
            disabled={!newMessage.trim() || sending}
          >
            {sending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </form>
      </div>
    </div>
  );
}
