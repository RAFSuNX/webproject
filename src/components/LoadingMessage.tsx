import React from 'react';
import { Bot } from 'lucide-react';

export const LoadingMessage: React.FC = () => {
  return (
    <div className="flex justify-start mb-6">
      <div className="flex items-start space-x-2 max-w-4xl w-full">
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
          <Bot size={16} className="text-white" />
        </div>
        <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 px-4 py-3 rounded-2xl rounded-tl-sm shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-gray-600 dark:text-gray-400 text-sm">AI is thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
};