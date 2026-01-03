
import React from 'react';
import { SearchBar } from './SearchBar';
import type { SearchParams } from '../types';

interface HeroProps {
  onSearch: (params: SearchParams) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  return (
    <div className="relative rounded-lg overflow-hidden my-8 h-[500px] flex items-center justify-center text-white text-center p-4">
        <img src="https://picsum.photos/seed/hero/1600/800" alt="Beautiful travel destination" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
        <div className="relative z-20">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight shadow-text">Find Your Next Smart Stay</h1>
            <p className="text-lg md:text-2xl mb-8 font-light shadow-text">Better deals, smarter pricing, powered by AI.</p>
            <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-md p-4 rounded-xl">
                 <SearchBar onSearch={onSearch} />
            </div>
        </div>
    </div>
  );
};
