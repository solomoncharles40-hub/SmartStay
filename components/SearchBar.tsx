
import React, { useState, useEffect, useRef } from 'react';
import type { SearchParams } from '../types';
import { MagnifyingGlassIcon, MapPinIcon, CalendarIcon, UserGroupIcon } from './icons/Icons';

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
}

const getAutocompleteSuggestions = (query: string): string[] => {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return [];

    const suggestions: { [key: string]: string[] } = {
        'a': ["Amsterdam, Netherlands", "Athens, Greece", "Auckland, New Zealand", "Austin, USA"],
        'b': ["Barcelona, Spain", "Bali, Indonesia", "Bangkok, Thailand", "Berlin, Germany", "Boston, USA", "Barbados"],
        'c': ["Cairo, Egypt", "Cancun, Mexico", "Cape Town, South Africa", "Chicago, USA", "Copenhagen, Denmark"],
        'd': ["Dubai, UAE", "Dublin, Ireland", "Delhi, India", "Denver, USA"],
        'e': ["Edinburgh, Scotland", "Istanbul, Turkey (IST)"],
        'f': ["Florence, Italy", "Frankfurt, Germany (FRA)"],
        'h': ["Hong Kong, China", "Honolulu, USA (HNL)"],
        'i': ["Istanbul, Turkey", "Ibiza, Spain"],
        'l': ["London, UK", "Los Angeles, USA", "Lisbon, Portugal", "Las Vegas, USA"],
        'm': ["Madrid, Spain", "Maldives", "Miami, USA", "Milan, Italy", "Munich, Germany"],
        'n': ["New York, USA", "Nice, France", "Nairobi, Kenya"],
        'p': ["Paris, France", "Prague, Czech Republic", "Phuket, Thailand"],
        'r': ["Rome, Italy", "Rio de Janeiro, Brazil"],
        's': ["Sydney, Australia", "Singapore, Singapore", "Seoul, South Korea", "San Francisco, USA", "Santorini, Greece"],
        't': ["Tokyo, Japan", "Toronto, Canada", "Thailand"],
        'v': ["Vancouver, Canada", "Venice, Italy", "Vienna, Austria"],
    };
    
    // Full word matches with expanded suggestions
    if (lowerQuery === 'london') {
        return [
            "London, UK",
            "London (LHR) - Heathrow Airport",
            "London (LGW) - Gatwick Airport",
            "London (STN) - Stansted Airport",
            "London → Paris (Flight Route)",
            "London → New York (Flight Route)"
        ];
    }
    if (lowerQuery === 'paris') {
        return [
            "Paris, France",
            "Paris (CDG) - Charles de Gaulle Airport",
            "Paris (ORY) - Orly Airport",
            "Paris → London (Flight Route)",
            "Paris → Rome (Flight Route)"
        ];
    }
     if (lowerQuery === 'new york') {
        return [
            "New York, USA",
            "New York (JFK) - John F. Kennedy International Airport",
            "New York (LGA) - LaGuardia Airport",
            "New York (EWR) - Newark Liberty International Airport",
            "New York → Los Angeles (Flight Route)"
        ];
    }
     if (lowerQuery === 'tokyo') {
        return [
            "Tokyo, Japan",
            "Tokyo (HND) - Haneda Airport",
            "Tokyo (NRT) - Narita International Airport",
            "Tokyo → Seoul (Flight Route)",
            "Tokyo → Kyoto (Train Route)"
        ];
    }

    // Partial matches
    if (lowerQuery.startsWith('ba')) {
        return [
            "Barcelona, Spain",
            "Barbados",
            "Bari, Italy",
            "Bali, Indonesia",
            "Bangkok, Thailand",
            "Berlin → Barcelona (Flight Route)"
        ];
    }

    // General search
    const firstChar = lowerQuery.charAt(0);
    const potentialMatches = suggestions[firstChar] || [];
    
    return potentialMatches.filter(dest => dest.toLowerCase().includes(lowerQuery));
};


export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length > 0) {
      const filteredSuggestions = getAutocompleteSuggestions(value);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Clean up suggestion before setting it (e.g., remove airport codes or route info)
    const cleanedSuggestion = suggestion.split('(')[0].trim();
    setLocation(cleanedSuggestion);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearch({ location, checkIn, checkOut, guests });
  };
  
  const inputStyles = "w-full pl-10 pr-3 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 transition-colors duration-300";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 items-center w-full">
      <div ref={searchContainerRef} className="relative sm:col-span-2 md:col-span-4 lg:col-span-2">
        <MapPinIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-500 z-10" />
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          onFocus={() => { if (location && suggestions.length > 0) setShowSuggestions(true); }}
          placeholder="Where are you going?"
          className={inputStyles}
          autoComplete="off"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-20 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
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
