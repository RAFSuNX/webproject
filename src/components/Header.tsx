import React from 'react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          >
            <span className="text-gray-600 dark:text-gray-300 font-bold">☰</span>
          </button>
          
          <div className="flex items-center space-x-3 lg:hidden">
            <div className="w-8 h-8 bg-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">iY</span>
            </div>
            <h1 className="text-lg font-bold text-accent">
              INFOiYo
            </h1>
          </div>
          
          <div className="hidden lg:block">
            <p className="text-sm text-gray-500 dark:text-gray-500">Powered by OpenRouter</p>
          </div>
        </div>
      </div>
    </header>
  );
};