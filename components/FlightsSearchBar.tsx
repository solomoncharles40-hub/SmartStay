
import React, { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, CalendarIcon, UserGroupIcon, AirplaneIcon, SeatIcon } from './icons/Icons';
import type { FlightSearchParams } from '../types';
import { AIFlightDeals } from './AIFlightDeals';

export const FlightsSearchBar: React.FC = () => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState('1');
  const [flightClass, setFlightClass] = useState('Economy');
  const [submittedSearchParams, setSubmittedSearchParams] = useState<FlightSearchParams | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!departure || !destination) {
        setError('Please enter a departure and destination airport.');
        setSubmittedSearchParams(null);
        return;
    }
    setError('');
    setSubmittedSearchParams({ departure, destination, departDate, returnDate, travelers, flightClass });
  };
  
  const inputBaseStyles = "w-full pl-10 pr-3 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 transition-colors duration-300";
  const inputWrapperStyles = "relative w-full";

  return (
    <div className="w-full">
        <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2 items-center">
            <div className={inputWrapperStyles}>
                <AirplaneIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                type="text"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                placeholder="Departure"
                className={inputBaseStyles}
                />
            </div>
            <div className={inputWrapperStyles}>
                <MapPinIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination"
                className={inputBaseStyles}
                />
            </div>
            <div className={inputWrapperStyles}>
                <CalendarIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className={inputBaseStyles + " text-gray-500 dark:text-gray-400"}
                />
            </div>
            <div className={inputWrapperStyles}>
                <CalendarIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className={inputBaseStyles + " text-gray-500 dark:text-gray-400"}
                />
            </div>
            <div className={inputWrapperStyles}>
                <UserGroupIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                type="number"
                min="1"
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className={inputBaseStyles}
                />
            </div>
            <div className={inputWrapperStyles}>
                <SeatIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                    value={flightClass}
                    onChange={(e) => setFlightClass(e.target.value)}
                    className={inputBaseStyles + " appearance-none"}
                >
                    <option>Economy</option>
                    <option>Premium</option>
                    <option>Business</option>
                    <option>First</option>
                </select>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 sm:col-span-2 lg:col-span-1"
            >
                <MagnifyingGlassIcon className="h-6 w-6" />
                <span className="lg:hidden">Search</span>
            </button>
        </form>
        {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/50 rounded-lg text-red-700 dark:text-red-300 text-center">
                {error}
            </div>
        )}
        {submittedSearchParams && (
            <div className="mt-8">
                <AIFlightDeals flightParams={submittedSearchParams} />
            </div>
        )}
    </div>
  );
};
