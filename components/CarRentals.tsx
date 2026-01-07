
import React, { memo } from 'react';
import { CarRentalWidget } from './CarRentalWidget';

const CarRentalsComponent: React.FC = () => {
    return (
        <section id="car-rentals" className="py-12 md:py-24 animate-fade-in bg-white dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 uppercase">
                        PREMIUM <span className="text-sky-600">MOBILITY.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-gray-400 font-bold italic leading-relaxed">
                        Find the perfect companion for your journey. From rugged 4x4s for island exploration to luxury sedans for city escapes.
                    </p>
                </div>
                
                <div className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="p-2">
                        <CarRentalWidget height="600px" />
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
                    <div className="p-8">
                        <h4 className="font-black text-slate-900 dark:text-white uppercase mb-2">Verified Fleets</h4>
                        <p className="text-sm text-slate-500">Only the highest rated global providers.</p>
                    </div>
                    <div className="p-8">
                        <h4 className="font-black text-slate-900 dark:text-white uppercase mb-2">Transparent Pricing</h4>
                        <p className="text-sm text-slate-500">No hidden fees, all insurance options upfront.</p>
                    </div>
                    <div className="p-8">
                        <h4 className="font-black text-slate-900 dark:text-white uppercase mb-2">Flexible Terms</h4>
                        <p className="text-sm text-slate-500">Free cancellation on most bookings.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const CarRentals = memo(CarRentalsComponent);
