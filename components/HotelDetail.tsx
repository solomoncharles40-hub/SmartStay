
import React, { useState, useMemo } from 'react';
import type { Hotel, BookingDetails } from '../types';
import { StarIcon, MapPinIcon, BackArrowIcon } from './icons/Icons';
import { ImageEditor } from './ImageEditor';
import { NearbyAttractions } from './NearbyAttractions';

interface HotelDetailProps {
  hotel: Hotel;
  onBack: () => void;
  onBookNow: (details: Omit<BookingDetails, 'nights' | 'totalPrice'>) => void;
}

export const HotelDetail: React.FC<HotelDetailProps> = ({ hotel, onBack, onBookNow }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'image-editor' | 'nearby'>('overview');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(hotel.maxGuests > 1 ? 2 : 1);
  const [error, setError] = useState('');

  const { nights, totalPrice } = useMemo(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      if (checkOutDate > checkInDate) {
        const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return { nights, totalPrice: nights * hotel.pricePerNight };
      }
    }
    return { nights: 0, totalPrice: 0 };
  }, [checkIn, checkOut, hotel.pricePerNight]);

  const handleBookClick = () => {
    if (!checkIn || !checkOut || nights <= 0) {
      setError('Please select valid check-in and check-out dates.');
      return;
    }
    setError('');
    onBookNow({ hotel, checkIn, checkOut, guests: Number(guests) });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl animate-fade-in">
        <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold mb-6">
            <BackArrowIcon className="h-5 w-5" />
            Back to Results
        </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-96 object-cover rounded-lg shadow-md mb-6" />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">{hotel.name}</h1>
                <div className="flex items-center gap-2 bg-yellow-400 text-white px-3 py-1.5 rounded-lg text-lg font-bold">
                    <StarIcon className="h-5 w-5" />
                    <span>{hotel.rating.toFixed(1)} ({hotel.reviews} reviews)</span>
                </div>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
                <MapPinIcon className="h-5 w-5 mr-2" />
                <span className="text-lg">{hotel.city}, {hotel.country}</span>
            </div>
           
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                    <button onClick={() => setActiveTab('overview')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'}`}>
                    Overview
                    </button>
                    <button onClick={() => setActiveTab('nearby')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'nearby' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'}`}>
                    Nearby Attractions
                    </button>
                    <button onClick={() => setActiveTab('image-editor')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'image-editor' ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'}`}>
                    AI Image Fun
                    </button>
                </nav>
            </div>
            
            {activeTab === 'overview' && (
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">About this stay</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{hotel.description}</p>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {hotel.amenities.map(amenity => (
                        <div key={amenity} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-center text-gray-700 dark:text-gray-200">{amenity}</div>
                    ))}
                    </div>
                </div>
            )}
             {activeTab === 'nearby' && <NearbyAttractions hotelName={hotel.name} city={hotel.city} />}
             {activeTab === 'image-editor' && <ImageEditor initialImageUrl={hotel.imageUrl} />}
        </div>
        <div className="lg:col-span-1">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg shadow-md sticky top-24">
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">${hotel.pricePerNight}<span className="text-base font-normal text-gray-600 dark:text-gray-400">/night</span></p>
                <div className="space-y-4 mb-6">
                    <div>
                        <label htmlFor="checkin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Check-in</label>
                        <input type="date" id="checkin" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-300" />
                    </div>
                     <div>
                        <label htmlFor="checkout" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Check-out</label>
                        <input type="date" id="checkout" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-300" />
                    </div>
                     <div>
                        <label htmlFor="guests" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Guests</label>
                        <input type="number" id="guests" value={guests} min="1" max={hotel.maxGuests} onChange={e => setGuests(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-200" />
                    </div>
                </div>

                {totalPrice > 0 && (
                  <div className="bg-white dark:bg-gray-800/50 p-4 rounded-md mb-6 border border-blue-200 dark:border-gray-600">
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>${hotel.pricePerNight} x {nights} nights</span>
                      <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-gray-100 mt-2 pt-2 border-t dark:border-gray-600">
                      <span>Total</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>
                )}
                
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button onClick={handleBookClick} disabled={!checkIn || !checkOut || nights <= 0} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Book Now
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">You won't be charged yet</p>
            </div>
        </div>
      </div>
    </div>
  );
};