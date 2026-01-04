
import React, { useState } from 'react';
import type { BookingDetails } from '../types';
import { LockClosedIcon, BackArrowIcon, CheckCircleIcon, ExclamationCircleIcon, MapPinIcon } from './icons/Icons';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

// --- Stripe Configuration ---
// It's safe to expose the publishable key.
const stripePromise = loadStripe('pk_test_51HPvU92eZvYxgC9s4zcb3s5c9s2s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s00j2s5c9s2');
const cardElementOptions = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

// --- PayPal Configuration ---
const PAYPAL_CLIENT_ID = "test"; // Use "test" for sandbox environment

// --- Internal Checkout Form Component ---
const CheckoutForm: React.FC<{ details: BookingDetails; onConfirm: () => void; isLoggedIn: boolean; }> = ({ details, onConfirm, isLoggedIn }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [{ isPending: isPaypalLoading }] = usePayPalScriptReducer();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'successful' | 'failed'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [formState, setFormState] = useState({ name: '', email: '' });
    const [saveCard, setSaveCard] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({ ...prev, [id]: value }));
    };

    const handleStripeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements || paymentStatus === 'processing' || paymentStatus === 'successful') return;

        setPaymentStatus('processing');
        setError(null);

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setError("Card details not found.");
            setPaymentStatus('failed');
            return;
        }

        const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: formState.name,
                email: formState.email,
            },
        });

        if (error) {
            setError(error.message || "An unexpected error occurred.");
            setPaymentStatus('failed');
        } else {
            console.log('Stripe PaymentMethod:', stripePaymentMethod);
            if (saveCard) {
                // In a real app, you'd send paymentMethod.id to your server to attach it to a customer.
                console.log('User opted to save card. Payment Method ID:', stripePaymentMethod.id);
            }
            setPaymentStatus('successful');
            setTimeout(() => {
                onConfirm();
            }, 2000);
        }
    };
    
    const handlePaypalApprove = (data: any, actions: any) => {
        setPaymentStatus('processing');
        setError(null);
        return actions.order.capture().then((details: any) => {
            console.log('PayPal Transaction Details:', details);
            setPaymentStatus('successful');
            setTimeout(() => {
                onConfirm();
            }, 2000);
        }).catch((err: any) => {
            console.error("PayPal Capture Error:", err);
            setError("An error occurred with your PayPal payment. Please try again.");
            setPaymentStatus('failed');
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-center min-h-[450px]">
             {paymentStatus === 'successful' ? (
                <div className="text-center py-8 animate-fade-in">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Payment Successful!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Please wait while we confirm your booking.</p>
                </div>
            ) : paymentStatus === 'processing' ? (
                 <div className="text-center py-8 animate-fade-in">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Processing Payment...</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">This may take a moment. Please don't close this window.</p>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4 dark:text-gray-100 self-start">Secure Payment</h2>
                    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 w-full">
                        <button
                            onClick={() => setPaymentMethod('card')}
                            className={`flex-1 py-3 font-semibold text-center transition-colors ${paymentMethod === 'card' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'}`}
                        >
                            Pay with Card
                        </button>
                        <button
                            onClick={() => setPaymentMethod('paypal')}
                            className={`flex-1 py-3 font-semibold text-center transition-colors ${paymentMethod === 'paypal' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'}`}
                        >
                            Pay with PayPal
                        </button>
                    </div>

                    {paymentStatus === 'failed' && error && (
                        <div className="w-full mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 dark:bg-red-900/30 dark:text-red-300 animate-fade-in">
                            <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}
                    
                    <div className="w-full">
                        {paymentMethod === 'card' && (
                            <form onSubmit={handleStripeSubmit} className="animate-fade-in">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                        <input type="text" id="name" value={formState.name} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                        <input type="email" id="email" value={formState.email} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Card Details</label>
                                        <div className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm min-h-[50px] flex items-center dark:border-gray-600">
                                            {stripe && elements ? (
                                                <div className="w-full">
                                                    <CardElement options={cardElementOptions} />
                                                </div>
                                            ) : (
                                                <div className="w-full flex items-center gap-3 animate-pulse">
                                                    <div className="w-10 h-7 bg-gray-200 dark:bg-gray-600 rounded-md"></div>
                                                    <div className="flex-grow h-4 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {isLoggedIn && (
                                        <div className="flex items-center pt-2">
                                            <input
                                                id="save-card"
                                                name="save-card"
                                                type="checkbox"
                                                checked={saveCard}
                                                onChange={(e) => setSaveCard(e.target.checked)}
                                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-500"
                                            />
                                            <label htmlFor="save-card" className="ml-2 block text-sm text-gray-800 dark:text-gray-300">
                                                Save this card for future payments
                                            </label>
                                        </div>
                                    )}
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={!stripe}
                                    className="w-full mt-6 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                                >
                                    <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
                                    <span>Pay with Card (${details.totalPrice})</span>
                                </button>
                            </form>
                        )}

                        {paymentMethod === 'paypal' && (
                            <div className="animate-fade-in">
                                {isPaypalLoading ? (
                                     <div className="space-y-3 animate-pulse pt-4">
                                        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                    </div>
                                 ) : (
                                    <PayPalButtons
                                        style={{ layout: "vertical", color: "blue" }}
                                        createOrder={(data, actions) => {
                                            setError(null);
                                            setPaymentStatus('idle');
                                            return actions.order.create({
                                                purchase_units: [{
                                                    description: `${details.hotel.name} - ${details.nights} nights`,
                                                    amount: {
                                                        value: details.totalPrice.toString(),
                                                    },
                                                }],
                                            });
                                        }}
                                        onApprove={handlePaypalApprove}
                                        onError={(err) => {
                                            console.error("PayPal Button Error:", err);
                                            setError("An error occurred with PayPal. Please check your details and try again.");
                                            setPaymentStatus('failed');
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};


// --- Main Booking Component ---
export const Booking: React.FC<{ details: BookingDetails; onConfirm: () => void; onBack: () => void; isLoggedIn: boolean; }> = ({ details, onConfirm, onBack, isLoggedIn }) => {
    
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
                            <CheckoutForm details={details} onConfirm={onConfirm} isLoggedIn={isLoggedIn} />
                        </Elements>
                    </PayPalScriptProvider>
                </div>
            </div>
        </div>
    );
};
