
import React, { useState } from 'react';
import type { BookingDetails } from '../types';
import { BackArrowIcon, MapPinIcon, CreditCardIcon, PayPalIcon } from './icons/Icons';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { CheckoutForm } from './CheckoutForm';

// --- Stripe Configuration ---
const stripePromise = loadStripe('pk_test_51HPvU92eZvYxgC9s4zcb3s5c9s2s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s00j2s5c9s2');
const PAYPAL_CLIENT_ID = "test"; 

export const Booking: React.FC<{ 
    details: BookingDetails; 
    onConfirm: () => void; 
    onBack: () => void; 
    isLoggedIn: boolean; 
    theme: 'light' | 'dark' 
}> = ({ details, onConfirm, onBack, isLoggedIn, theme }) => {
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
    
    const paypalOptions = {
        "client-id": PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
    };

    return (
        <div className="animate-fade-in container mx-auto px-4 py-8">
            <button 
                onClick={onBack} 
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-bold mb-8 group transition-all"
            >
                <BackArrowIcon className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
                Back to Hotel Details
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Column: Booking Summary (40%) */}
                <div className="lg:col-span-5 bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-700">
                    <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white tracking-tight">Your Trip Summary</h2>
                    
                    <div className="relative mb-8 group overflow-hidden rounded-3xl shadow-lg">
                        <img src={details.hotel.imageUrl} alt={details.hotel.name} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-2xl font-bold text-white mb-1">{details.hotel.name}</h3>
                            <p className="text-sky-300 text-sm flex items-center gap-1 font-bold">
                                <MapPinIcon className="h-4 w-4" />
                                {details.hotel.city}, {details.hotel.country}
                            </p>
                        </div>
                    </div>
                    
                    <div className="space-y-6 mb-8">
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                            <div>
                                <span className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Check-in</span>
                                <span className="font-bold text-gray-900 dark:text-white">{details.checkIn}</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Check-out</span>
                                <span className="font-bold text-gray-900 dark:text-white">{details.checkOut}</span>
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center px-4">
                            <span className="font-bold text-gray-500 dark:text-gray-400">Total Guests</span>
                            <span className="font-black text-gray-900 dark:text-white">{details.guests} Travelers</span>
                        </div>

                        <div className="flex justify-between items-center px-4">
                            <span className="font-bold text-gray-500 dark:text-gray-400">Duration</span>
                            <span className="font-black text-gray-900 dark:text-white">{details.nights} {details.nights === 1 ? 'Night' : 'Nights'}</span>
                        </div>
                    </div>
                    
                    <div className="pt-8 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-2 font-medium">
                            <span>Base Rate (${details.hotel.pricePerNight} x {details.nights})</span>
                            <span>${details.nights * details.hotel.pricePerNight}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-6 font-medium">
                            <span>Service & Processing Fees</span>
                            <span>${(details.totalPrice - details.nights * details.hotel.pricePerNight).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-baseline pt-4 border-t border-gray-100 dark:border-gray-700">
                            <span className="text-xl font-black text-gray-900 dark:text-white">Total Amount</span>
                            <span className="text-3xl font-black text-sky-600 dark:text-sky-400">${details.totalPrice}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Payment Tabs and Forms (60%) */}
                <div className="lg:col-span-7 bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-700 min-h-[600px] flex flex-col">
                    <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white tracking-tight">Payment Method</h2>
                    
                    {/* Payment Method Selector Tabs */}
                    <div className="grid grid-cols-2 gap-4 mb-10 bg-gray-50 dark:bg-gray-900 p-2 rounded-3xl">
                        <button
                            onClick={() => setPaymentMethod('card')}
                            className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-black transition-all ${
                                paymentMethod === 'card' 
                                ? 'bg-white dark:bg-gray-800 text-sky-600 shadow-md ring-1 ring-gray-100 dark:ring-gray-700' 
                                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                            }`}
                        >
                            <CreditCardIcon className="h-6 w-6" />
                            <span>Credit Card</span>
                        </button>
                        <button
                            onClick={() => setPaymentMethod('paypal')}
                            className={`flex items-center justify-center gap-3 py-4 rounded-2xl font-black transition-all ${
                                paymentMethod === 'paypal' 
                                ? 'bg-white dark:bg-gray-800 text-[#0070ba] shadow-md ring-1 ring-gray-100 dark:ring-gray-700' 
                                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                            }`}
                        >
                            <PayPalIcon className="h-6 w-6" />
                            <span>PayPal</span>
                        </button>
                    </div>

                    <div className="flex-grow flex flex-col">
                        {paymentMethod === 'card' ? (
                            <div className="animate-fade-in flex-grow">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm 
                                        totalPrice={details.totalPrice}
                                        purchaseDescription={`${details.hotel.name} Booking`}
                                        onConfirm={onConfirm} 
                                        isLoggedIn={isLoggedIn} 
                                        theme={theme} 
                                    />
                                </Elements>
                            </div>
                        ) : (
                            <div className="animate-fade-in flex-grow pt-4">
                                <p className="text-slate-500 dark:text-gray-400 mb-8 font-medium">
                                    You will be redirected to PayPal's secure gateway to complete your transaction.
                                </p>
                                <PayPalScriptProvider options={paypalOptions}>
                                    <PayPalButtons
                                        style={{ layout: "vertical", color: "blue", shape: "pill", label: "pay" }}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [{
                                                    description: `${details.hotel.name} Booking`,
                                                    amount: {
                                                        value: details.totalPrice.toString(),
                                                    },
                                                }],
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order!.capture().then(() => {
                                                onConfirm();
                                            });
                                        }}
                                    />
                                </PayPalScriptProvider>
                                <div className="mt-auto pt-8 flex items-center gap-3 text-xs text-slate-400 font-bold uppercase tracking-widest justify-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    Secure PayPal Environment
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
