
import React from 'react';
import { AirplaneIcon, ArrowRightIcon } from './icons/Icons';

export const Flights: React.FC = () => {
    return (
        <section id="flights" className="py-12 animate-fade-in">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <AirplaneIcon className="h-24 w-24 text-blue-500 mx-auto mb-4" />
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
                        Find Your Next Flight
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
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
            </div>
        </section>
    );
};
