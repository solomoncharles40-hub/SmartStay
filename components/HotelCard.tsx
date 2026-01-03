
import React, { useState, useEffect, useMemo } from 'react';
import type { Hotel } from '../types';
import { getSmartStayScore } from '../services/geminiService';
import { StarIcon, MapPinIcon, SparklesIcon, WifiIcon, BuildingLibraryIcon, ParkingIcon, UserGroupIcon } from './icons/Icons';

interface HotelCardProps {
  hotel: Hotel;
  onSelectHotel: (hotel: Hotel) => void;
}

const AmenityIcon: React.FC<{ amenity: string }> = ({ amenity }) => {
    switch (amenity.toLowerCase()) {
        case 'wifi': return <WifiIcon className="h-5 w-5 text-gray-500" />;
        case 'pool': return <SparklesIcon className="h-5 w-5 text-gray-500" />; // Placeholder
        case 'gym': return <BuildingLibraryIcon className="h-5 w-5 text-gray-500" />; // Placeholder
        case 'parking': return <ParkingIcon className="h-5 w-5 text-gray-500" />;
        default: return null;
    }
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelectHotel }) => {
  const [smartScore, setSmartScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchScore = async () => {
      const score = await getSmartStayScore(hotel);
      setSmartScore(score);
    };
    fetchScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel.id]); // Only re-fetch if hotel ID changes
  
  const scoreColor = useMemo(() => {
    if (!smartScore) return 'bg-gray-400';
    if (smartScore >= 90) return 'bg-green-500';
    if (smartScore >= 75) return 'bg-yellow-500';
    return 'bg-orange-500';
  }, [smartScore]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-shadow duration-300 cursor-pointer" onClick={() => onSelectHotel(hotel)}>
      <img src={hotel.imageUrl} alt={hotel.name} className="w-full md:w-1/3 h-64 md:h-auto object-cover" />
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
            <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold text-gray-800">{hotel.name}</h3>
                <div className="flex items-center gap-1 bg-yellow-400 text-white px-2 py-1 rounded-md text-sm font-bold">
                    <StarIcon className="h-4 w-4" />
                    <span>{hotel.rating.toFixed(1)}</span>
                </div>
            </div>
            <div className="flex items-center text-gray-500 mt-1">
                <MapPinIcon className="h-4 w-4 mr-1" />
                <span>{hotel.city}, {hotel.country}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-sm">{hotel.reviews} reviews</span>
            </div>
            <p className="text-gray-600 mt-4 text-sm leading-relaxed line-clamp-2">{hotel.description}</p>
             <div className="flex items-center mt-4 gap-4">
                {hotel.amenities.slice(0, 4).map(amenity => (
                    <div key={amenity} className="flex items-center gap-2 text-gray-600">
                        <AmenityIcon amenity={amenity} />
                        <span className="text-sm">{amenity}</span>
                    </div>
                ))}
             </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-gray-800">${hotel.pricePerNight}</span>
            <span className="text-sm text-gray-500"> / night</span>
          </div>
          {smartScore !== null ? (
            <div className="text-right">
                <div className={`text-white text-xs font-bold px-2 py-1 rounded-full ${scoreColor} flex items-center gap-1`}>
                    <SparklesIcon className="h-4 w-4" />
                    SmartStay Score
                </div>
                <p className="text-2xl font-bold text-gray-800">{smartScore}</p>
            </div>
          ) : (
             <div className="animate-pulse bg-gray-200 h-12 w-24 rounded-md"></div>
          )}
        </div>
      </div>
    </div>
  );
};
