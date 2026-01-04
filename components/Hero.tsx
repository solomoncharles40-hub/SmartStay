
import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import { FlightsSearchBar } from './FlightsSearchBar';
import type { SearchParams } from '../types';
import { BuildingStorefrontIcon, PaperAirplaneIcon } from './icons/Icons';

interface HeroProps {
  onSearch: (params: SearchParams) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState<'stays' | 'flights'>('stays');

  return (
    <div className="relative rounded-lg overflow-hidden flex flex-col items-center justify-center text-white text-center px-4 py-16 sm:py-24 md:py-4 md:h-[calc(100vh-200px)] min-h-[450px]">
        <img src="https://picsum.photos/seed/tropicalbeach/1600/900" alt="A beautiful beach resort with palm trees and clear turquoise water." className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>
        <div className="relative z-20 w-full max-w-5xl flex flex-col items-center">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              Why pay more to travel?
            </h1>
            <p className="mt-4 text-lg text-gray-100 max-w-3xl drop-shadow-md">
              SmartStay helps you find cheaper stays and smarter travel deals worldwide.
            </p>
            <div className="mt-8 md:mt-12 w-full bg-white/90 dark:bg-gray-900/80 backdrop-blur-lg p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl">
                <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700">
                    <button 
                        onClick={() => setActiveTab('stays')}
                        className={`flex items-center gap-2 px-4 py-2 text-lg font-semibold transition-colors duration-300 ${activeTab === 'stays' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                        <BuildingStorefrontIcon className="h-6 w-6" />
                        Stays
                    </button>
                    <button 
                        onClick={() => setActiveTab('flights')}
                        className={`flex items-center gap-2 px-4 py-2 text-lg font-semibold transition-colors duration-300 ${activeTab === 'flights' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                        <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
                        Flights
                    </button>
                </div>
                {activeTab === 'stays' ? <SearchBar onSearch={onSearch} /> : <FlightsSearchBar />}
            </div>
        </div>
    </div>
  );
};
