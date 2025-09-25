import React, { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { LoadingMessage } from './components/LoadingMessage';
import { useChat } from './hooks/useChat';
import { useChatSessions } from './hooks/useChatSessions';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    sessions,
    currentSessionId,
    createNewSession,
    updateSession,
    deleteSession,
    getCurrentSession,
    switchSession
  } = useChatSessions();
  
  const currentSession = getCurrentSession();
  const { messages, isLoading, sendMessage } = useChat({
    sessionId: currentSessionId,
    onUpdateSession: updateSession,
    initialMessages: currentSession?.messages || []
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Create initial session if none exists
  useEffect(() => {
    if (sessions.length === 0) {
      createNewSession();
    }
  }, [sessions.length, createNewSession]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleNewChat = () => {
    createNewSession();
    setSidebarOpen(false);
  };

  const handleSelectSession = (sessionId: string) => {
    switchSession(sessionId);
    setSidebarOpen(false);
  };

  const handleDeleteSession = (sessionId: string) => {
    deleteSession(sessionId);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black flex">
        <Sidebar
          sessions={sessions}
          currentSessionId={currentSessionId}
          onNewChat={handleNewChat}
          onSelectSession={handleSelectSession}
          onDeleteSession={handleDeleteSession}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />
        
        <div className="flex-1 flex flex-col lg:ml-0">
          <Header onToggleSidebar={toggleSidebar} />
          
          <main className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-4 py-6">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-accent mx-auto mb-6 flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">iY</span>
                    </div>
                    <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Welcome to INFOiYo</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-lg leading-relaxed">
                      Your intelligent AI assistant powered by OpenRouter. Ask me anything about coding, explanations, debugging, and more!
                    </p>
                  </div>
                )}
                
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                
                {isLoading && <LoadingMessage />}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;