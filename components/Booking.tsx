
import React, { useState } from 'react';
import type { BookingDetails } from '../types';
import { LockClosedIcon, BackArrowIcon } from './icons/Icons';

interface BookingProps {
  details: BookingDetails;
  onConfirm: () => void;
  onBack: () => void;
}

export const Booking: React.FC<BookingProps> = ({ details, onConfirm, onBack }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [formState, setFormState] = useState({
        name: '', email: '', cardNumber: '', expiry: '', cvv: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({ ...prev, [id]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isProcessing) return;

        setIsProcessing(true);
        // Simulate payment processing and confirm after 2 seconds
        setTimeout(() => {
            onConfirm();
        }, 2000);
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6">
                <BackArrowIcon className="h-5 w-5" />
                Back to Hotel Details
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column: Booking Summary */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Your Booking</h2>
                    <img src={details.hotel.imageUrl} alt={details.hotel.name} className="w-full h-48 object-cover rounded-md mb-4" />
                    <h3 className="text-xl font-semibold">{details.hotel.name}</h3>
                    <p className="text-gray-600">{details.hotel.city}, {details.hotel.country}</p>
                    <div className="mt-4 pt-4 border-t space-y-2">
                        <div className="flex justify-between"><span className="text-gray-600">Check-in:</span> <span className="font-medium">{details.checkIn}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Check-out:</span> <span className="font-medium">{details.checkOut}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Guests:</span> <span className="font-medium">{details.guests}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Nights:</span> <span className="font-medium">{details.nights}</span></div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total Price</span>
                            <span>${details.totalPrice}</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Payment Form */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Secure Payment</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="name" value={formState.name} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" id="email" value={formState.email} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                                <input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" value={formState.cardNumber} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                    <input type="text" id="expiry" placeholder="MM/YY" value={formState.expiry} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                                    <input type="text" id="cvv" placeholder="123" value={formState.cvv} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" disabled={isProcessing} className="w-full mt-6 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-lg disabled:bg-gray-400 flex items-center justify-center gap-2">
                           {isProcessing ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" aria-hidden="true"></div>
                                    <span>Processing...</span>
                                </>
                           ) : (
                                <>
                                    <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
                                    <span>Confirm &amp; Pay ${details.totalPrice}</span>
                                </>
                           )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
