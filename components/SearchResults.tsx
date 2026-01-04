
import React, { useState, useEffect } from 'react';
import type { Hotel, SearchParams } from '../types';
import { HotelCard } from './HotelCard';
import { FilterSidebar } from './FilterSidebar';
import { AITripPlanner } from './AITripPlanner';
import { LocalInfo } from './LocalInfo';

interface SearchResultsProps {
  hotels: Hotel[];
  onSelectHotel: (hotel: Hotel) => void;
  searchParams: SearchParams;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ hotels, onSelectHotel, searchParams }) => {
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [activeTab, setActiveTab] = useState<'stays' | 'planner' | 'info'>('stays');

  useEffect(() => {
    setFilteredHotels(hotels);
  }, [hotels]);

  const handleFilterChange = (filters: { price: number; rating: number; amenities: string[] }) => {
    const updatedHotels = hotels.filter(hotel => {
      const priceMatch = hotel.pricePerNight <= filters.price;
      const ratingMatch = hotel.rating >= filters.rating;
      const amenitiesMatch = filters.amenities.every(amenity => hotel.amenities.includes(amenity));
      return priceMatch && ratingMatch && amenitiesMatch;
    });
    setFilteredHotels(updatedHotels);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/4">
        <FilterSidebar onFilterChange={handleFilterChange} />
      </div>
      <div className="w-full md:w-3/4">
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button onClick={() => setActiveTab('stays')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'stays' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'}`}>
                Available Stays ({filteredHotels.length})
                </button>
                <button onClick={() => setActiveTab('info')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'info' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'}`}>
                Discover {searchParams.location}
                </button>
                <button onClick={() => setActiveTab('planner')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'planner' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'}`}>
                AI Trip Planner
                </button>
            </nav>
        </div>

        {activeTab === 'stays' && (
            <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                    {hotels.length > 0 ? `Stays in ${searchParams.location}` : `No stays found in ${searchParams.location}`}
                </h2>
                <div className="grid grid-cols-1 gap-6">
                {filteredHotels.map(hotel => (
                    <HotelCard key={hotel.id} hotel={hotel} onSelectHotel={onSelectHotel} />
                ))}
                </div>
            </div>
        )}
        {activeTab === 'planner' && <AITripPlanner searchParams={searchParams} />}
        {activeTab === 'info' && <LocalInfo location={searchParams.location} />}
      </div>
    </div>
  );
};
