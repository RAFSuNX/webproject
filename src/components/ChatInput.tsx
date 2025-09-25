import React, { useState, KeyboardEvent } from 'react';

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
    <div className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="w-full resize-none bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent max-h-32 min-h-[44px] text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              rows={1}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className="bg-accent hover:bg-orange-700 disabled:bg-gray-400 text-white p-3 transition-all duration-200 flex items-center justify-center disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="animate-spin">⟳</span>
            ) : (
              <span>→</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};