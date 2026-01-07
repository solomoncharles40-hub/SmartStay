
import React from 'react';
import { AirplaneIcon, ArrowRightIcon } from './icons/Icons';

export const Flights: React.FC = () => {
    return (
        <section id="flights" className="relative py-20 md:py-32 animate-fade-in text-center bg-gray-800 rounded-lg overflow-hidden">
            <img 
                src="https://picsum.photos/seed/airplane-wing/1600/900" 
                alt="View of a tropical destination from an airplane window" 
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-60"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
            
            <div className="relative z-20 max-w-3xl mx-auto px-4">
                <AirplaneIcon className="h-24 w-24 text-white mx-auto mb-4 drop-shadow-lg" />
                <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl mb-4">
                    Find Your Next Flight
                </h1>
                <p className="text-lg text-gray-200 mb-8 drop-shadow-lg">
                    We've partnered with a leading flight search engine to bring you the best deals on flights worldwide. Click the button below to search for flights and book your next adventure.
                </p>
                <a
                    href="https://jet-tickets.com/?marker=424483"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-lg"
                >
                    <span>Search for Flights Now</span>
                    <ArrowRightIcon className="h-6 w-6" />
                </a>
            </div>
        </section>
    );
};
