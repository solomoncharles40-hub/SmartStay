
import React from 'react';
import type { BookingDetails } from '../types';
import { CheckCircleIcon } from './icons/Icons';

interface BookingConfirmationProps {
  details: BookingDetails;
  onGoHome: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ details, onGoHome }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl text-center animate-fade-in">
        <CheckCircleIcon className="h-24 w-24 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600 mb-6">
            Your stay at <strong>{details.hotel.name}</strong> is booked. A confirmation email has been sent to you.
        </p>

        <div className="bg-gray-50 p-6 rounded-md text-left space-y-3 border border-gray-200 mb-8">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-3">Your Booking Summary</h3>
            <div className="flex justify-between"><span className="text-gray-600">Hotel:</span> <span className="font-medium">{details.hotel.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Location:</span> <span className="font-medium">{details.hotel.city}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Check-in:</span> <span className="font-medium">{details.checkIn}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Check-out:</span> <span className="font-medium">{details.checkOut}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Guests:</span> <span className="font-medium">{details.guests}</span></div>
             <div className="flex justify-between text-lg font-bold text-gray-900 mt-4 pt-3 border-t">
                <span>Total Paid</span>
                <span>${details.totalPrice}</span>
            </div>
        </div>
        
        <button 
            onClick={onGoHome} 
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-lg"
        >
            Back to Home
        </button>
    </div>
  );
};
