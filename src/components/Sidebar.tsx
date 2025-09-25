import React, { useState } from 'react';
import { ChatSession } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onNewChat: () => void;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  isOpen,
  onToggle
}) => {
  const { theme, toggleTheme } = useTheme();
  const [hoveredSession, setHoveredSession] = useState<string | null>(null);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:z-auto
      `}>
        <div className="h-full bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent flex items-center justify-center">
                  <span className="text-white font-bold text-sm">iY</span>
                </div>
                <h1 className="text-xl font-bold text-accent">
                  INFOiYo
                </h1>
              </div>
              <button
                onClick={onToggle}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                <span className="text-gray-600 dark:text-gray-300 font-bold">✕</span>
              </button>
            </div>
            
            <button
              onClick={onNewChat}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-gray-100 dark:bg-gray-900 hover:bg-accent hover:text-white border border-gray-300 dark:border-gray-700 transition-all duration-200 group"
            >
              <span className="text-accent group-hover:text-white font-bold">+</span>
              <span className="text-gray-700 dark:text-gray-200 group-hover:text-white font-medium">New Chat</span>
            </button>
          </div>

          {/* Chat Sessions */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`
                  group relative flex items-center space-x-3 px-3 py-3 cursor-pointer transition-all duration-200
                  ${currentSessionId === session.id 
                    ? 'bg-accent text-white' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-900'
                  }
                `}
                onClick={() => onSelectSession(session.id)}
                onMouseEnter={() => setHoveredSession(session.id)}
                onMouseLeave={() => setHoveredSession(null)}
              >
                <span className={`flex-shrink-0 text-sm ${currentSessionId === session.id ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>💬</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${currentSessionId === session.id ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                    {session.title}
                  </p>
                  <p className={`text-xs ${currentSessionId === session.id ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                    {session.messages.length} messages
                  </p>
                </div>
                {(hoveredSession === session.id || currentSessionId === session.id) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(session.id);
                    }}
                    className="p-1 hover:bg-red-500 hover:text-white text-gray-400 transition-colors"
                  >
                    <span className="text-xs">🗑</span>
                  </button>
                )}
              </div>
            ))}
            
            {sessions.length === 0 && (
              <div className="text-center py-8">
                <span className="text-2xl text-gray-400 dark:text-gray-500 mb-2 block">💬</span>
                <p className="text-sm text-gray-500 dark:text-gray-400">No chat sessions yet</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              {theme === 'dark' ? (
                <span className="text-accent">☀</span>
              ) : (
                <span className="text-accent">🌙</span>
              )}
              <span className="text-gray-700 dark:text-gray-200">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};