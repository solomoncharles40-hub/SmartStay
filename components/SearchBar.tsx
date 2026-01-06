
import React, { useState } from 'react';
import type { SearchParams } from '../types';
import { MagnifyingGlassIcon, MapPinIcon, CalendarIcon, UserGroupIcon } from './icons/Icons';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('New York');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
      setError('Check-out date must be after check-in date.');
      return;
    }
    setError('');
    onSearch({ location, checkIn, checkOut, guests });
  };
  
  const dateInputStyleFix = {
      colorScheme: 'dark',
  };

  return (
    <div className="bg-white/20 backdrop-blur-md p-4 rounded-lg shadow-2xl w-full max-w-5xl mx-auto">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 items-end">
        <div className="col-span-1 md:col-span-6 lg:col-span-4">
          <label htmlFor="location" className="block text-sm font-medium text-white mb-1">Location</label>
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-200 pointer-events-none" />
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., New York, Paris"
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              required
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 lg:col-span-2">
          <label htmlFor="checkin" className="block text-sm font-medium text-white mb-1">Check-in</label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-200 pointer-events-none" />
            <input
              id="checkin"
              type="date"
              value={checkIn}
              onChange={(e) => { setCheckIn(e.target.value); setError(''); if(e.target.value > checkOut) setCheckOut(''); }}
              min={today}
              style={dateInputStyleFix}
              className="w-full pl-10 pr-2 py-3 bg-gray-900/50 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 lg:col-span-2">
          <label htmlFor="checkout" className="block text-sm font-medium text-white mb-1">Check-out</label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-200 pointer-events-none" />
            <input
              id="checkout"
              type="date"
              value={checkOut}
              onChange={(e) => { setCheckOut(e.target.value); setError('') }}
              min={checkIn || today}
              style={dateInputStyleFix}
              className="w-full pl-10 pr-2 py-3 bg-gray-900/50 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <label htmlFor="guests" className="block text-sm font-medium text-white mb-1">Guests</label>
            <div className="relative">
                <UserGroupIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-200 pointer-events-none" />
                <input
                    id="guests"
                    type="number"
                    min="1"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full pl-10 pr-2 py-3 bg-gray-900/50 text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>
        </div>
        
         <div className="col-span-1 md:col-span-3 lg:col-span-2">
             <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-lg h-full">
                <MagnifyingGlassIcon className="h-6 w-6" />
                <span>Search</span>
            </button>
        </div>
      </form>
      {error && <p className="text-red-300 text-sm mt-2 text-center">{error}</p>}
    </div>
  );
};
