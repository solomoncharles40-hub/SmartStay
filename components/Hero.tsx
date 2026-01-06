
import React from 'react';
import { SearchBar } from './SearchBar';
import type { SearchParams } from '../types';

interface HeroProps {
  onSearch: (params: SearchParams) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  return (
    <div className="relative rounded-lg overflow-hidden flex flex-col items-center justify-center text-white text-center px-4 py-8 md:h-[calc(100vh-200px)] min-h-[550px] md:min-h-[500px]">
        <img src="https://picsum.photos/seed/beach-paradise/1600/900" alt="A serene tropical beach with palm trees and turquoise water." className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
        <div className="relative z-20 w-full max-w-5xl flex flex-col items-center justify-center gap-8 h-full">
            <div className="mb-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
                  Better Deals, Smarter Stays
                </h1>
                <p className="mt-4 text-lg text-gray-100 max-w-3xl mx-auto drop-shadow-md">
                  Find your next destination and let our AI create the perfect trip for you.
                </p>
            </div>
            <SearchBar onSearch={onSearch} />
        </div>
    </div>
  );
};
