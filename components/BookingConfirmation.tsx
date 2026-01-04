
import React from 'react';
import type { BookingDetails } from '../types';
import { CheckCircleIcon } from './icons/Icons';

interface BookingConfirmationProps {
  details: BookingDetails;
  onGoHome: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ details, onGoHome }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center animate-fade-in">
        <CheckCircleIcon className="h-24 w-24 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your stay at <strong className="text-gray-700 dark:text-gray-200">{details.hotel.name}</strong> is booked. A confirmation email has been sent to you.
        </p>

        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-md text-left space-y-3 border border-gray-200 dark:border-gray-700 mb-8">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 border-b dark:border-gray-600 pb-2 mb-3">Your Booking Summary</h3>
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Hotel:</span> <span className="font-medium dark:text-gray-200">{details.hotel.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Location:</span> <span className="font-medium dark:text-gray-200">{details.hotel.city}</span></div>
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Check-in:</span> <span className="font-medium dark:text-gray-200">{details.checkIn}</span></div>
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Check-out:</span> <span className="font-medium dark:text-gray-200">{details.checkOut}</span></div>
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Guests:</span> <span className="font-medium dark:text-gray-200">{details.guests}</span></div>
             <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-gray-100 mt-4 pt-3 border-t dark:border-gray-600">
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
