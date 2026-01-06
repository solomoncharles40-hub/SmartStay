
import React, { useState } from 'react';
import { SparklesIcon, BuildingStorefrontIcon, SunIcon, MoonIcon, MenuIcon, CloseIcon } from './icons/Icons';

interface HeaderProps {
    onLogoClick: () => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    onAboutClick: () => void;
    onCarRentalsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick, theme, toggleTheme, onAboutClick, onCarRentalsClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClickAndCloseMenu = () => {
    onLogoClick();
    setIsMobileMenuOpen(false);
  }

  const handleLinkClick = (handler: () => void) => (e: React.MouseEvent) => {
    e.preventDefault();
    handler();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 dark:bg-gray-800 dark:border-b dark:border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleLogoClickAndCloseMenu}
          >
            <BuildingStorefrontIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Smart<span className="text-blue-600 dark:text-blue-400">Stay</span>
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6 text-gray-600 dark:text-gray-300 font-medium">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Stays</a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Flights</a>
              <a href="#" onClick={handleLinkClick(onCarRentalsClick)} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Car Rentals</a>
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle theme"
               >
                {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
              </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-2 p-2 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <CloseIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700">Stays</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700">Flights</a>
            <a href="#" onClick={handleLinkClick(onCarRentalsClick)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-700">Car Rentals</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-5 space-x-2">
              <button className="w-full px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900/80 transition-colors">
                Log In
              </button>
              <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
