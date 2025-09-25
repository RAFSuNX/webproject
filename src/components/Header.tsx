import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 sticky top-0 z-30">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 dark:hover:bg-gray-700/20 transition-colors"
          >
            <Menu size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          
          <div className="flex items-center space-x-3 lg:hidden">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">iY</span>
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              INFOiYo
            </h1>
          </div>
          
          <div className="hidden lg:block">
            <p className="text-sm text-gray-600 dark:text-gray-400">Powered by OpenRouter</p>
          </div>
        </div>
      </div>
    </header>
  );
};