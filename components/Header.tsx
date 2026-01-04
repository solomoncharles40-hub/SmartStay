
import React from 'react';
import { SparklesIcon, BuildingStorefrontIcon, SunIcon, MoonIcon } from './icons/Icons';

interface HeaderProps {
    onLogoClick: () => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick, theme, toggleTheme }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50 dark:bg-gray-800 dark:border-b dark:border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={onLogoClick}
          >
            <BuildingStorefrontIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Smart<span className="text-blue-600 dark:text-blue-400">Stay</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-gray-600 dark:text-gray-300 font-medium">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Stays</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Flights</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Car Rentals</a>
              <a href="#" className="relative group">
                <span className="flex items-center gap-1">
                  AI Deals <SparklesIcon className="h-4 w-4 text-yellow-500" />
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full"></span>
              </a>
            </nav>
            <div className="flex items-center gap-2">
               <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle theme"
               >
                {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900/80 transition-colors">
                Log In
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
