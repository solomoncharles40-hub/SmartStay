
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchResults } from './components/SearchResults';
import { Hero } from './components/Hero';
import { HotelDetail } from './components/HotelDetail';
import { Chatbot } from './components/Chatbot';
import { Booking } from './components/Booking';
import { BookingConfirmation } from './components/BookingConfirmation';
import type { Hotel, SearchParams, BookingDetails } from './types';
import { hotels as mockHotels } from './data/mockData';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'results' | 'detail' | 'booking' | 'confirmation'>('home');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [searchResults, setSearchResults] = useState<Hotel[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const handleSearch = useCallback((params: SearchParams) => {
    setIsLoading(true);
    setSearchParams(params);
    // Simulate API call
    setTimeout(() => {
      const results = mockHotels.filter(hotel => {
        const locationMatch = params.location ? hotel.city.toLowerCase().includes(params.location.toLowerCase()) : true;
        const guestsMatch = params.guests ? hotel.maxGuests >= parseInt(params.guests, 10) : true;
        return locationMatch && guestsMatch;
      });
      setSearchResults(results);
      setView('results');
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSelectHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setView('detail');
  };

  const handleBackToResults = () => {
    setSelectedHotel(null);
    setView('results');
  };

  const handleLogoClick = () => {
    setView('home');
    setSelectedHotel(null);
    setBookingDetails(null);
  }

  const handleInitiateBooking = (details: Omit<BookingDetails, 'nights' | 'totalPrice'>) => {
    const checkInDate = new Date(details.checkIn);
    const checkOutDate = new Date(details.checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const totalPrice = nights * details.hotel.pricePerNight;

    setBookingDetails({ ...details, nights, totalPrice });
    setView('booking');
  };

  const handleConfirmBooking = () => {
    setView('confirmation');
  };
  
  const handleCancelBooking = () => {
    setView('detail');
  };

  const handleReturnHome = () => {
    setBookingDetails(null);
    setSelectedHotel(null);
    setView('home');
  };

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    switch (view) {
      case 'results':
        return <SearchResults hotels={searchResults} onSelectHotel={handleSelectHotel} searchParams={searchParams!} />;
      case 'detail':
        return selectedHotel && <HotelDetail hotel={selectedHotel} onBack={handleBackToResults} onBookNow={handleInitiateBooking} />;
      case 'booking':
        return bookingDetails && <Booking details={bookingDetails} onConfirm={handleConfirmBooking} onBack={handleCancelBooking} />;
      case 'confirmation':
        return bookingDetails && <BookingConfirmation details={bookingDetails} onGoHome={handleReturnHome} />;
      case 'home':
      default:
        return (
            <Hero onSearch={handleSearch} />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header onLogoClick={handleLogoClick} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderView()}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;
