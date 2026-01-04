
import React, { useState } from 'react';
import type { FlightBookingDetails } from '../types';
import { LockClosedIcon, BackArrowIcon, CheckCircleIcon, ExclamationCircleIcon, AirplaneIcon, UserGroupIcon, CalendarIcon } from './icons/Icons';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const stripePromise = loadStripe('pk_test_51HPvU92eZvYxgC9s4zcb3s5c9s2s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s5s00j2s5c9s2');
const PAYPAL_CLIENT_ID = "test";

const CheckoutForm: React.FC<{ details: FlightBookingDetails; onConfirm: () => void; isLoggedIn: boolean; theme: 'light' | 'dark' }> = ({ details, onConfirm, isLoggedIn, theme }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [{ isPending: isPaypalLoading }] = usePayPalScriptReducer();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'successful' | 'failed'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [formState, setFormState] = useState({ name: '', email: '' });

    const cardElementOptions = {
        style: {
            base: {
                color: theme === 'dark' ? '#fff' : '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: theme === 'dark' ? '#6b7280' : '#aab7c4',
                },
            },
            invalid: { color: "#fa755a", iconColor: "#fa755a" },
        },
    };

    const handleStripeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements || paymentStatus === 'processing') return;
        setPaymentStatus('processing');
        setError(null);
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setError("Card details not found.");
            setPaymentStatus('failed');
            return;
        }
        const { error: stripeError } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: { name: formState.name, email: formState.email },
        });

        if (stripeError) {
            setError(stripeError.message || "An unexpected error occurred.");
            setPaymentStatus('failed');
        } else {
            setPaymentStatus('successful');
            setTimeout(() => onConfirm(), 2000);
        }
    };

    const handlePaypalApprove = (data: any, actions: any) => {
        setPaymentStatus('processing');
        setError(null);
        return actions.order.capture().then(() => {
            setPaymentStatus('successful');
            setTimeout(() => onConfirm(), 2000);
        }).catch(() => {
            setError("An error occurred with your PayPal payment.");
            setPaymentStatus('failed');
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-center min-h-[450px]">
            {paymentStatus === 'successful' ? (
                <div className="text-center py-8 animate-fade-in">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Payment Successful!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Finalizing your flight booking...</p>
                </div>
            ) : paymentStatus === 'processing' ? (
                <div className="text-center py-8 animate-fade-in">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Processing Payment...</h3>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4 dark:text-gray-100 self-start">Secure Payment</h2>
                    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 w-full">
                        <button onClick={() => setPaymentMethod('card')} className={`flex-1 py-3 font-semibold text-center transition-colors ${paymentMethod === 'card' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'}`}>Pay with Card</button>
                        <button onClick={() => setPaymentMethod('paypal')} className={`flex-1 py-3 font-semibold text-center transition-colors ${paymentMethod === 'paypal' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'}`}>Pay with PayPal</button>
                    </div>
                    {error && <div className="w-full mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 dark:bg-red-900/30 dark:text-red-300"><ExclamationCircleIcon className="h-5 w-5" /><span>{error}</span></div>}
                    {paymentMethod === 'card' ? (
                        <form onSubmit={handleStripeSubmit} className="animate-fade-in space-y-4">
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                <input type="text" id="name" value={formState.name} onChange={(e) => setFormState(s => ({...s, name: e.target.value}))} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                <input type="email" id="email" value={formState.email} onChange={(e) => setFormState(s => ({...s, email: e.target.value}))} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Card Details</label>
                                <div className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm dark:border-gray-600"><CardElement options={cardElementOptions} /></div>
                            </div>
                            <button type="submit" disabled={!stripe} className="w-full mt-6 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"><LockClosedIcon className="h-5 w-5" /><span>Pay with Card (${details.totalPrice})</span></button>
                        </form>
                    ) : (
                        <div className="animate-fade-in">
                            {isPaypalLoading ? <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" /> : 
                                <PayPalButtons style={{ layout: "vertical", color: "blue" }}
                                    createOrder={(data, actions) => actions.order.create({ purchase_units: [{ description: `Flight from ${details.flightParams.departure} to ${details.flightParams.destination}`, amount: { value: details.totalPrice.toString() } }] })}
                                    onApprove={handlePaypalApprove}
                                    onError={() => setError("An error occurred with PayPal.")}
                                />
                            }
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

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
                            <CheckoutForm details={details} onConfirm={onConfirm} isLoggedIn={isLoggedIn} theme={theme} />
                        </Elements>
                    </PayPalScriptProvider>
                </div>
            </div>
        </div>
    );
};
