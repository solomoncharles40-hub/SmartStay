
import React from 'react';
import { SparklesIcon, BuildingStorefrontIcon } from './icons/Icons';

interface HeaderProps {
    onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={onLogoClick}
          >
            <BuildingStorefrontIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Smart<span className="text-blue-600">Stay</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
              <a href="#" className="hover:text-blue-600 transition-colors">Stays</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Flights</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Car Rentals</a>
              <a href="#" className="relative group">
                <span className="flex items-center gap-1">
                  AI Deals <SparklesIcon className="h-4 w-4 text-yellow-500" />
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                Log In
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
