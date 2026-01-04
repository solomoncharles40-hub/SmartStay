
import React from 'react';
import type { FlightBookingDetails } from '../types';
import { CheckCircleIcon, AirplaneIcon, UserGroupIcon, CalendarIcon } from './icons/Icons';

interface FlightBookingConfirmationProps {
  details: FlightBookingDetails;
  onGoHome: () => void;
}

export const FlightBookingConfirmation: React.FC<FlightBookingConfirmationProps> = ({ details, onGoHome }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center animate-fade-in">
        <CheckCircleIcon className="h-24 w-24 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">Flight Booking Confirmed!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your trip from <strong className="text-gray-700 dark:text-gray-200">{details.flightParams.departure}</strong> to <strong className="text-gray-700 dark:text-gray-200">{details.flightParams.destination}</strong> is booked. Have a wonderful journey!
        </p>

        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-md text-left space-y-3 border border-gray-200 dark:border-gray-700 mb-8">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 border-b dark:border-gray-600 pb-2 mb-3">Your Flight Summary</h3>
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400 flex items-center gap-1"><AirplaneIcon className="h-4 w-4" />Airline:</span> <span className="font-medium dark:text-gray-200">{details.flight.airline}</span></div>
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Route:</span> <span className="font-medium dark:text-gray-200">{details.flightParams.departure} to {details.flightParams.destination}</span></div>
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400 flex items-center gap-1"><CalendarIcon className="h-4 w-4" />Depart:</span> <span className="font-medium dark:text-gray-200">{details.flightParams.departDate || 'N/A'}</span></div>
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400 flex items-center gap-1"><CalendarIcon className="h-4 w-4" />Return:</span> <span className="font-medium dark:text-gray-200">{details.flightParams.returnDate || 'N/A'}</span></div>
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400 flex items-center gap-1"><UserGroupIcon className="h-4 w-4" />Guests:</span> <span className="font-medium dark:text-gray-200">{details.flightParams.travelers}</span></div>
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
