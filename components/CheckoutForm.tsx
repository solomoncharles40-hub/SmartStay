
import React, { useState, useRef, useEffect } from 'react';
import { LockClosedIcon, CheckCircleIcon, ExclamationCircleIcon } from './icons/Icons';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface CheckoutFormProps {
    totalPrice: number;
    purchaseDescription: string;
    onConfirm: () => void;
    isLoggedIn: boolean;
    theme: 'light' | 'dark';
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ totalPrice, onConfirm, isLoggedIn, theme }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'successful' | 'failed'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [formState, setFormState] = useState({ name: '', email: '' });
    const [savePaymentInfo, setSavePaymentInfo] = useState(false);
    const confirmationTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (confirmationTimeoutRef.current) {
                clearTimeout(confirmationTimeoutRef.current);
            }
        };
    }, []);

    const cardElementOptions = {
        style: {
            base: {
                color: theme === 'dark' ? '#fff' : '#1a202c',
                fontFamily: '"Inter", sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: theme === 'dark' ? '#4a5568' : '#a0aec0',
                },
            },
            invalid: {
                color: "#e53e3e",
                iconColor: "#e53e3e",
            },
        },
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({ ...prev, [id]: value }));
    };

    const handleStripeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!stripe || !elements || paymentStatus === 'processing' || paymentStatus === 'successful') {
            return;
        }

        setPaymentStatus('processing');
        setError(null);

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setError("Card component not initialized.");
            setPaymentStatus('failed');
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
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
            setPaymentStatus('successful');
            confirmationTimeoutRef.current = window.setTimeout(() => {
                onConfirm();
            }, 1500);
        }
    };

    if (paymentStatus === 'successful') {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
                <CheckCircleIcon className="h-20 w-20 text-green-500 mb-6" />
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Payment Success</h3>
                <p className="text-gray-500 dark:text-gray-400 font-bold italic">Finalizing your booking details...</p>
            </div>
        );
    }

    if (paymentStatus === 'processing') {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
                <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 border-4 border-sky-100 dark:border-gray-700 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tight">Processing</h3>
                <p className="text-gray-500 dark:text-gray-400 font-bold italic">Communicating with secure servers...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleStripeSubmit} className="space-y-6 animate-fade-in">
            {paymentStatus === 'failed' && error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-2xl flex items-center gap-3 border border-red-100 dark:border-red-800">
                    <ExclamationCircleIcon className="h-6 w-6 flex-shrink-0" />
                    <span className="font-bold text-sm">{error}</span>
                </div>
            )}

            <div className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Cardholder Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={formState.name} 
                        onChange={handleInputChange} 
                        required 
                        placeholder="John Doe"
                        className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold text-gray-900 dark:text-white transition-all"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Email for Receipt</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={formState.email} 
                        onChange={handleInputChange} 
                        required 
                        placeholder="john@example.com"
                        className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold text-gray-900 dark:text-white transition-all"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Card Information</label>
                    <div className="px-5 py-5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl transition-all">
                        <CardElement options={cardElementOptions} />
                    </div>
                </div>
            </div>

            {isLoggedIn && (
                <div className="flex items-center gap-3 py-2">
                    <input
                        id="save-card"
                        type="checkbox"
                        checked={savePaymentInfo}
                        onChange={(e) => setSavePaymentInfo(e.target.checked)}
                        className="w-5 h-5 rounded-md border-gray-300 text-sky-600 focus:ring-sky-500 dark:bg-gray-900 dark:border-gray-700"
                    />
                    <label htmlFor="save-card" className="text-sm font-bold text-gray-600 dark:text-gray-400 cursor-pointer">
                        Securely save my card for future bookings
                    </label>
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe}
                className="w-full py-5 bg-sky-600 text-white font-black rounded-3xl hover:bg-sky-500 transition-all shadow-xl shadow-sky-600/20 active:scale-[0.98] disabled:bg-gray-400 flex items-center justify-center gap-3 text-lg tracking-tight"
            >
                <LockClosedIcon className="h-6 w-6" />
                PAY ${totalPrice.toFixed(2)}
            </button>
            
            <p className="text-center text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] pt-4">
                Powered by Stripe • PCI Compliant
            </p>
        </form>
    );
};
