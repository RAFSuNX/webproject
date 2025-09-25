import React, { useState, KeyboardEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/30 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="w-full resize-none bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-h-32 min-h-[44px] text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              rows={1}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-full transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};