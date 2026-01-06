
import React from 'react';
import { SparklesIcon, SearchIcon, NetworkIntelligenceIcon } from './icons/Icons';

export const AboutUs: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-4">
        Welcome to Smart<span className="text-blue-600 dark:text-blue-400">Stay</span>
      </h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
        We are deploying cutting-edge AI to revolutionize how you discover, plan, and book your travels, making every trip smarter and more memorable.
      </p>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b pb-4 dark:border-gray-700">
          Our AI-Powered Services
        </h2>
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
              <SparklesIcon className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">AI Deal Generation</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Our creative AI acts as your personal travel agent, crafting unique and inspiring hotel and flight packages. These fictional deals are designed to spark your imagination and help you discover your next dream destination at an unbeatable (though illustrative) price.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-6">
             <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
              <SearchIcon className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Discover Your Destination</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Get up-to-the-minute information about your destination. Powered by Google Search and Maps grounding, our AI provides you with insights on local events, attractions, and hidden gems, complete with source links for you to explore further.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-6">
             <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-full">
              <NetworkIntelligenceIcon className="h-8 w-8 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">AI Itinerary Planner</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Planning a complex trip? Just tell our most advanced AI your preferences, interests, and constraints. It will generate a comprehensive, day-by-day itinerary, taking the stress out of travel planning and leaving you with a perfectly tailored adventure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
