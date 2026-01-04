
import React, { useState } from 'react';
import type { SearchParams } from '../types';
import { MagnifyingGlassIcon, MapPinIcon, CalendarIcon, UserGroupIcon } from './icons/Icons';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ location, checkIn, checkOut, guests });
  };
  
  const inputStyles = "w-full pl-10 pr-3 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 transition-colors duration-300";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 items-center w-full">
      <div className="relative sm:col-span-2 md:col-span-4 lg:col-span-2">
        <MapPinIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Where are you going?"
          className={inputStyles}
        />
      </div>
      <div className="relative">
        <CalendarIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className={inputStyles + " text-gray-500 dark:text-gray-400"}
        />
      </div>
      <div className="relative">
        <CalendarIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className={inputStyles + " text-gray-500 dark:text-gray-400"}
        />
      </div>
      <div className="relative">
         <UserGroupIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="Guests"
          className={inputStyles}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
        <span className="hidden lg:inline">Search</span>
      </button>
    </form>
  );
};
