import { useState, useCallback, useEffect } from 'react';
import { ChatMessage } from '../types';
import { APIService } from '../services/apiService';

interface UseChatProps {
  sessionId: string | null;
  onUpdateSession: (sessionId: string, messages: ChatMessage[]) => void;
  initialMessages?: ChatMessage[];
}

export const useChat = ({ sessionId, onUpdateSession, initialMessages = [] }: UseChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update messages when session changes
  useEffect(() => {
    setMessages(initialMessages);
  }, [sessionId, initialMessages]);

  // Update session whenever messages change
  useEffect(() => {
    if (sessionId && messages.length > 0) {
      onUpdateSession(sessionId, messages);
    }
  }, [messages, sessionId, onUpdateSession]);

  const sendMessage = useCallback(async (content: string) => {
    if (!sessionId) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const apiResponse = await APIService.sendMessage(content);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: '', // We'll use the structured fields instead
        isUser: false,
        timestamp: new Date(),
        response: apiResponse.response || '',
        smallTalk: apiResponse.small_talk || '',
        code: apiResponse.code || '',
        error: apiResponse.error || '',
        jsonData: apiResponse.json_data || null,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get response. Please try again.';
      setError(errorMessage);
      console.error('Chat error:', err);
      
      // Add error message
      const errorChatMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: '',
        isUser: false,
        timestamp: new Date(),
        response: '',
        smallTalk: '',
        error: errorMessage,
      };
      
      setMessages(prev => [...prev, errorChatMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
};