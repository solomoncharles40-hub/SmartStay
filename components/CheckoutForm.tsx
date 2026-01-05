
import React, { useState, useRef, useEffect } from 'react';
import { LockClosedIcon, CheckCircleIcon, ExclamationCircleIcon, CreditCardIcon, PayPalIcon } from './icons/Icons';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

interface CheckoutFormProps {
    totalPrice: number;
    purchaseDescription: string;
    onConfirm: () => void;
    isLoggedIn: boolean;
    theme: 'light' | 'dark';
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ totalPrice, purchaseDescription, onConfirm, isLoggedIn, theme }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [{ isPending: isPaypalLoading }] = usePayPalScriptReducer();
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
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
                color: theme === 'dark' ? '#fff' : '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: theme === 'dark' ? '#6b7280' : '#aab7c4',
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({ ...prev, [id]: value }));
    };

    const handlePaymentMethodChange = (method: 'card' | 'paypal') => {
        if (paymentStatus === 'processing' || paymentStatus === 'successful') return;
        setPaymentMethod(method);
        setError(null);
        setPaymentStatus('idle');
    };

    const handleStripeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // 1. Guard against submission if Stripe.js has not loaded, or if a payment is already in progress.
        if (!stripe || !elements || paymentStatus === 'processing' || paymentStatus === 'successful') {
            return;
        }

        // 2. Set the state to processing to update the UI (e.g., show a spinner).
        setPaymentStatus('processing');
        setError(null);

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setError("Card details not found.");
            setPaymentStatus('failed');
            return;
        }

        // 3. Create a PaymentMethod with the card details and billing information.
        const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: formState.name,
                email: formState.email,
            },
        });

        // 4. Handle the response from Stripe.
        if (error) {
            // Show error message to the customer.
            setError(error.message || "An unexpected error occurred.");
            setPaymentStatus('failed');
        } else {
            // 5. If successful, simulate saving the payment method for future use if the user opted in.
            if (savePaymentInfo) {
                // In a real app, you would send stripePaymentMethod.id to your server to attach it to a customer.
                console.log('User opted to save card. Payment Method ID:', stripePaymentMethod.id);
            }

            // 6. Update the UI to show success and trigger the final confirmation step after a delay.
            setPaymentStatus('successful');
            confirmationTimeoutRef.current = window.setTimeout(() => {
                onConfirm();
            }, 2000);
        }
    };
    
    const handlePaypalApprove = (data: any, actions: any) => {
        setPaymentStatus('processing');
        setError(null);
        return actions.order.capture().then((details: any) => {
            if (savePaymentInfo) {
                console.log('User opted to save PayPal for future payments. Payer ID:', details.payer.payer_id);
            }
            setPaymentStatus('successful');
            confirmationTimeoutRef.current = window.setTimeout(() => {
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
                            onClick={() => handlePaymentMethodChange('card')}
                            disabled={paymentStatus === 'processing' || paymentStatus === 'successful'}
                            className={`flex-1 py-3 font-semibold text-center transition-colors ${paymentMethod === 'card' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'} disabled:cursor-not-allowed disabled:text-gray-400 dark:disabled:text-gray-500`}
                        >
                            Pay with Card
                        </button>
                        <button
                            onClick={() => handlePaymentMethodChange('paypal')}
                            disabled={paymentStatus === 'processing' || paymentStatus === 'successful'}
                            className={`flex-1 py-3 font-semibold text-center transition-colors ${paymentMethod === 'paypal' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'} disabled:cursor-not-allowed disabled:text-gray-400 dark:disabled:text-gray-500`}
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
                                                    <CreditCardIcon className="w-10 h-7 text-gray-300 dark:text-gray-600" />
                                                    <div className="flex-grow h-4 bg-gray-200 dark:bg-gray-600 rounded-full"></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={!stripe}
                                    className="w-full mt-6 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                                >
                                    <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
                                    <span>Pay with Card (${totalPrice})</span>
                                </button>
                            </form>
                        )}

                        {paymentMethod === 'paypal' && (
                            <div className="animate-fade-in">
                                {isPaypalLoading ? (
                                    <div className="space-y-3 animate-pulse pt-4">
                                        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                            <PayPalIcon className="h-7 text-gray-400 dark:text-gray-500" />
                                        </div>
                                        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                            <CreditCardIcon className="h-7 text-gray-400 dark:text-gray-500" />
                                        </div>
                                    </div>
                                 ) : (
                                    <PayPalButtons
                                        style={{ layout: "vertical", color: "blue" }}
                                        createOrder={(data, actions) => {
                                            setError(null);
                                            setPaymentStatus('idle');
                                            return actions.order.create({
                                                purchase_units: [{
                                                    description: purchaseDescription,
                                                    amount: {
                                                        value: totalPrice.toString(),
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

                        {isLoggedIn && (
                            <div className="flex items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <input
                                    id="save-payment"
                                    name="save-payment"
                                    type="checkbox"
                                    checked={savePaymentInfo}
                                    onChange={(e) => setSavePaymentInfo(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-500"
                                />
                                <label htmlFor="save-payment" className="ml-2 block text-sm text-gray-800 dark:text-gray-300">
                                    Securely save my payment information for next time.
                                </label>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
