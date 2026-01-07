
import React from 'react';

export const Hero: React.FC = () => {
  const scrollToMap = (e: React.MouseEvent) => {
    e.preventDefault();
    const mapSection = document.getElementById('deal-map');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative text-white text-center">
        <img src="https://picsum.photos/seed/beach-paradise/1600/900" alt="A serene tropical beach with palm trees and turquoise water." className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
        <div className="relative z-20 container mx-auto px-4">
            <div className="flex flex-col items-center justify-center min-h-[500px] md:min-h-[600px] py-16">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
                    Better Deals, Smarter Travel
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto drop-shadow-md">
                    Explore the world with our interactive deals map and find your next adventure at an unbeatable price.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <button 
                          onClick={scrollToMap}
                          className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-2xl text-lg"
                        >
                          Explore Global Deals Map
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
