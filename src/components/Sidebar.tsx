import React, { useState } from 'react';
import { Plus, MessageSquare, Trash2, Menu, X, Sun, Moon } from 'lucide-react';
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
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:z-auto
      `}>
        <div className="h-full bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/30 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-white/10 dark:border-gray-700/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">iY</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  INFOiYo
                </h1>
              </div>
              <button
                onClick={onToggle}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 dark:hover:bg-gray-700/20 transition-colors"
              >
                <X size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            
            <button
              onClick={onNewChat}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 transition-all duration-200 group"
            >
              <Plus size={18} className="text-blue-400 group-hover:text-blue-300" />
              <span className="text-gray-700 dark:text-gray-200 font-medium">New Chat</span>
            </button>
          </div>

          {/* Chat Sessions */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`
                  group relative flex items-center space-x-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200
                  ${currentSessionId === session.id 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30' 
                    : 'hover:bg-white/10 dark:hover:bg-gray-700/20'
                  }
                `}
                onClick={() => onSelectSession(session.id)}
                onMouseEnter={() => setHoveredSession(session.id)}
                onMouseLeave={() => setHoveredSession(null)}
              >
                <MessageSquare size={16} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-200 truncate">
                    {session.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {session.messages.length} messages
                  </p>
                </div>
                {(hoveredSession === session.id || currentSessionId === session.id) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(session.id);
                    }}
                    className="p-1 rounded-md hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
            
            {sessions.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare size={32} className="mx-auto text-gray-400 dark:text-gray-500 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No chat sessions yet</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 dark:border-gray-700/20">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 dark:hover:bg-gray-700/20 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-blue-400" />
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