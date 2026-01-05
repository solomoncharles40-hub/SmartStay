
import React from 'react';
import type { FlightBookingDetails } from '../types';
import { BackArrowIcon, AirplaneIcon, UserGroupIcon } from './icons/Icons';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CheckoutForm } from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51HPvU92eZvYxgC9s4zcb3s5c9s2s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s00j2s5c9s2');
const PAYPAL_CLIENT_ID = "test";

export const FlightBooking: React.FC<{ details: FlightBookingDetails; onConfirm: () => void; onBack: () => void; isLoggedIn: boolean; theme: 'light' | 'dark' }> = ({ details, onConfirm, onBack, isLoggedIn, theme }) => {
    const paypalOptions = { "client-id": PAYPAL_CLIENT_ID, currency: "USD", intent: "capture" };
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold mb-6">
                <BackArrowIcon className="h-5 w-5" />
                Back to Search
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Flight Summary</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-md mb-4">
                        <p className="font-bold text-lg text-blue-800 dark:text-blue-200 flex items-center gap-2"><AirplaneIcon className="h-5 w-5" />{details.flight.airline}</p>
                        <p className="text-blue-600 dark:text-blue-400 italic text-sm">"{details.flight.dealHighlight}"</p>
                    </div>
                    <div className="space-y-3 text-gray-700 dark:text-gray-300">
                        <div className="flex justify-between items-center"><span className="font-medium text-gray-500 dark:text-gray-400">From</span><span className="font-semibold text-gray-900 dark:text-gray-100">{details.flightParams.departure}</span></div>
                        <div className="flex justify-between items-center"><span className="font-medium text-gray-500 dark:text-gray-400">To</span><span className="font-semibold text-gray-900 dark:text-gray-100">{details.flightParams.destination}</span></div>
                        <div className="flex justify-between items-center"><span className="font-medium text-gray-500 dark:text-gray-400">Depart</span><span className="font-semibold text-gray-900 dark:text-gray-100">{details.flightParams.departDate || 'Not specified'}</span></div>
                        <div className="flex justify-between items-center"><span className="font-medium text-gray-500 dark:text-gray-400">Return</span><span className="font-semibold text-gray-900 dark:text-gray-100">{details.flightParams.returnDate || 'Not specified'}</span></div>
                        <div className="flex justify-between items-center"><span className="font-medium text-gray-500 dark:text-gray-400">Travelers</span><span className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1"><UserGroupIcon className="h-4 w-4" />{details.flightParams.travelers}</span></div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                        <div className="flex justify-between text-gray-700 dark:text-gray-300"><span>{details.flightParams.travelers} traveler(s) x ${details.flight.price}</span><span>${details.totalPrice}</span></div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-gray-100"><span>Total Price</span><span>${details.totalPrice}</span></div>
                    </div>
                </div>
                <div>
                    <PayPalScriptProvider options={paypalOptions}>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm 
                                totalPrice={details.totalPrice}
                                purchaseDescription={`Flight from ${details.flightParams.departure} to ${details.flightParams.destination}`}
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
