import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };
  
  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity"
    >
      {copied ? '✓ Copied' : '📋 Copy'}
    </button>
  );
};

const JsonViewer: React.FC<{ data: any }> = ({ data }) => {
  const jsonString = JSON.stringify(data, null, 2);
  
  return (
    <div className="relative group">
      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-3 my-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            JSON Response
          </span>
        </div>
        <pre className="bg-black text-green-400 p-3 rounded text-sm overflow-x-auto font-mono">
          <code>{jsonString}</code>
        </pre>
        <CopyButton text={jsonString} />
      </div>
    </div>
  );
};

const formatMessage = (content: string) => {
  // Split content by code blocks (looking for ```language or just ```)
  const parts = content.split(/(```[\s\S]*?```)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('```')) {
      // Extract code content (remove ``` and language identifier)
      const lines = part.split('\n');
      const firstLine = lines[0];
      const language = firstLine.replace(/^```/, '').trim() || 'text';
      const codeContent = lines.slice(1, -1).join('\n');
      
      return (
        <div key={index} className="relative group my-3">
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-t border-b border-gray-300 dark:border-gray-600">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              {language}
            </span>
          </div>
          <pre className="bg-black text-white p-4 rounded-b overflow-x-auto">
            <code className="text-sm font-mono">{codeContent}</code>
          </pre>
          <CopyButton text={codeContent} />
        </div>
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
              {/* Error message */}
              {message.error && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded p-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-red-600 dark:text-red-400">⚠️</span>
                    <span className="text-red-800 dark:text-red-200 font-semibold">Error</span>
                  </div>
                  <p className="text-red-700 dark:text-red-300 mt-1 text-sm">{message.error}</p>
                </div>
              )}
              
              {message.smallTalk && (
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">{message.smallTalk}</p>
              )}
              
              {message.response && (
                <div className="text-sm">
                  {formatMessage(message.response)}
                </div>
              )}
              
              {message.code && (
                <div className="relative group">
                  <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-t border-b border-gray-300 dark:border-gray-600">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      Code
                    </span>
                  </div>
                  <pre className="bg-black text-white p-3 rounded-b text-xs overflow-x-auto">
                    <code>{message.code}</code>
                  </pre>
                  <CopyButton text={message.code} />
                </div>
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