
import React from 'react';
import type { BookingDetails } from '../types';
import { BackArrowIcon, MapPinIcon } from './icons/Icons';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CheckoutForm } from './CheckoutForm';

// --- Stripe Configuration ---
const stripePromise = loadStripe('pk_test_51HPvU92eZvYxgC9s4zcb3s5c9s2s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s00j2s5c9s2');
const PAYPAL_CLIENT_ID = "test"; 

export const Booking: React.FC<{ details: BookingDetails; onConfirm: () => void; onBack: () => void; isLoggedIn: boolean; theme: 'light' | 'dark' }> = ({ details, onConfirm, onBack, isLoggedIn, theme }) => {
    
    const paypalOptions = {
        "client-id": PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold mb-6">
                <BackArrowIcon className="h-5 w-5" />
                Back to Hotel Details
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column: Booking Summary */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Booking Summary</h2>
                    <div className="relative mb-4">
                        <img src={details.hotel.imageUrl} alt={details.hotel.name} className="w-full h-48 object-cover rounded-md" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-md">
                            <h3 className="text-xl font-semibold text-white">{details.hotel.name}</h3>
                            <p className="text-gray-200 text-sm flex items-center gap-1 mt-1">
                                <MapPinIcon className="h-4 w-4 flex-shrink-0" />
                                {details.hotel.city}, {details.hotel.country}
                            </p>
                        </div>
                    </div>
                    
                    <div className="space-y-3 text-gray-700 dark:text-gray-300">
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-500 dark:text-gray-400">Check-in date</span>
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{details.checkIn}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-500 dark:text-gray-400">Check-out date</span>
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{details.checkOut}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-500 dark:text-gray-400">Guests</span>
                            <span className="font-semibold text-gray-900 dark:text-gray-100">{details.guests}</span>
                        </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                         <div className="flex justify-between text-gray-700 dark:text-gray-300">
                            <span>{details.nights} night{details.nights > 1 && 's'} x ${details.hotel.pricePerNight}</span>
                            <span>${details.nights * details.hotel.pricePerNight}</span>
                        </div>
                         {/* This is a placeholder for potential future fees */}
                        <div className="flex justify-between text-gray-700 dark:text-gray-300">
                            <span>Taxes &amp; fees</span>
                            <span>${(details.totalPrice - details.nights * details.hotel.pricePerNight).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-gray-100">
                            <span>Total Price</span>
                            <span>${details.totalPrice}</span>
                        </div>
                    </div>
                </div>


                {/* Right Column: Payment Providers */}
                <div>
                     <PayPalScriptProvider options={paypalOptions}>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm 
                                totalPrice={details.totalPrice}
                                purchaseDescription={`${details.hotel.name} - ${details.nights} nights`}
                                onConfirm={onConfirm} 
                                isLoggedIn={isLoggedIn} 
                                theme={theme} 
                            />
                        </Elements>
                    </PayPalScriptProvider>
                </div>
            </div>
        </div>
    );
};
