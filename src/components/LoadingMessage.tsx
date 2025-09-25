import React from 'react';

export const LoadingMessage: React.FC = () => {
  return (
    <div className="flex justify-start mb-6">
      <div className="flex items-start space-x-2 max-w-4xl w-full">
        <div className="flex-shrink-0 w-8 h-8 bg-accent flex items-center justify-center">
          <span className="text-white text-sm">AI</span>
        </div>
        <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-accent animate-bounce"></div>
              <div className="w-2 h-2 bg-accent animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-accent animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-gray-600 dark:text-gray-400 text-sm">AI is thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
};