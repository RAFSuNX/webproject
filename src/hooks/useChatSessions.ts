import { useState, useCallback, useEffect } from 'react';
import { ChatSession, ChatMessage } from '../types';

const STORAGE_KEY = 'infoiyo-chat-sessions';

export const useChatSessions = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedSessions = JSON.parse(saved).map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          updatedAt: new Date(session.updatedAt),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setSessions(parsedSessions);
        
        // Set current session to the most recent one
        if (parsedSessions.length > 0) {
          setCurrentSessionId(parsedSessions[0].id);
        }
      } catch (error) {
        console.error('Failed to load chat sessions:', error);
      }
    }
  }, []);

  // Save sessions to localStorage whenever sessions change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    return newSession.id;
  }, []);

  const updateSession = useCallback((sessionId: string, messages: ChatMessage[]) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        const title = messages.length > 0 && messages[0].isUser 
          ? messages[0].content.slice(0, 30) + (messages[0].content.length > 30 ? '...' : '')
          : 'New Chat';
        
        return {
          ...session,
          title,
          messages,
          updatedAt: new Date()
        };
      }
      return session;
    }));
  }, []);

  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    
    // If deleting current session, switch to another or create new
    if (currentSessionId === sessionId) {
      const remaining = sessions.filter(session => session.id !== sessionId);
      if (remaining.length > 0) {
        setCurrentSessionId(remaining[0].id);
      } else {
        createNewSession();
      }
    }
  }, [currentSessionId, sessions, createNewSession]);

  const getCurrentSession = useCallback(() => {
    return sessions.find(session => session.id === currentSessionId) || null;
  }, [sessions, currentSessionId]);

  const switchSession = useCallback((sessionId: string) => {
    setCurrentSessionId(sessionId);
  }, []);

  return {
    sessions,
    currentSessionId,
    createNewSession,
    updateSession,
    deleteSession,
    getCurrentSession,
    switchSession
  };
};