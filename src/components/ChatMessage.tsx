import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';

const formatMessage = (content: string) => {
  // Split content by code blocks (looking for ```language or just ```)
  const parts = content.split(/(```[\s\S]*?```)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('```')) {
      // Extract code content (remove ``` and language identifier)
      const codeContent = part.replace(/^```[\w]*\n?/, '').replace(/```$/, '');
      return (
        <pre key={index} className="bg-black text-white p-4 my-3 overflow-x-auto">
          <code className="text-sm font-mono">{codeContent}</code>
        </pre>
      );
    } else if (part.trim()) {
      // Regular text content
      return (
        <div key={index} className="whitespace-pre-wrap">
          {part.split('\n').map((line, lineIndex) => (
            <p key={lineIndex} className="mb-2 last:mb-0">{line}</p>
          ))}
        </div>
      );
    }
    return null;
  }).filter(Boolean);
};

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.isUser;
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className="flex items-start space-x-2 max-w-4xl w-full">
        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 bg-accent flex items-center justify-center">
            <span className="text-white text-sm">AI</span>
          </div>
        )}
        <div
          className={`px-4 py-3 ${
            isUser
              ? 'bg-accent text-white ml-auto'
              : 'bg-gray-100 dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700'
          }`}
        >
          {isUser ? (
            <p className="text-sm">{message.content}</p>
          ) : (
            <div className="space-y-2">
              {message.smallTalk && (
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">{message.smallTalk}</p>
              )}
              {message.response && (
                <div className="text-sm">
                  {formatMessage(message.response)}
                </div>
              )}
              {message.code && (
                <pre className="bg-black text-white p-3 text-xs overflow-x-auto">
                  <code>{message.code}</code>
                </pre>
              )}
            </div>
          )}
          <p className={`text-xs mt-2 ${isUser ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
            {message.timestamp.toLocaleTimeString()}
          </p>
        </div>
        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 bg-gray-600 dark:bg-gray-400 flex items-center justify-center">
            <span className="text-white dark:text-black text-sm">U</span>
          </div>
        )}
      </div>
    </div>
  );
};