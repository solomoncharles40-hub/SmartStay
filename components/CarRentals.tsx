
import React, { memo } from 'react';
import { CarRentalWidget } from './CarRentalWidget';

const CarRentalsComponent: React.FC = () => {
    return (
        <section id="car-rentals" className="relative min-h-screen bg-slate-900 overflow-hidden">
            {/* Immersive Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
                    alt="Luxury car on a coastal road at sunset" 
                    className="w-full h-full object-cover brightness-[0.4] scale-105 animate-slow-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
                <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
                    <span className="inline-block text-sky-400 font-black uppercase tracking-[0.4em] text-xs mb-6 px-4 py-1.5 bg-sky-900/30 rounded-full border border-sky-800/50 backdrop-blur-sm">
                        Elite Fleet
                    </span>
                    <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-8 uppercase leading-[0.85]">
                        PREMIUM <br/><span className="text-sky-400 italic">MOBILITY.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-bold italic leading-relaxed max-w-2xl mx-auto opacity-90">
                        Find the perfect companion for your journey. From rugged 4x4s for island exploration to luxury sedans for city escapes.
                    </p>
                </div>
                
                <div className="w-full max-w-5xl mx-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden border border-white/20 animate-fade-in-up">
                    <div className="p-2 md:p-4">
                        {/* Increased height to 900px for better visibility of all car pictures and details */}
                        <CarRentalWidget height="900px" />
                    </div>
                </div>

                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center animate-fade-in">
                    <div className="group">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform border border-white/10 backdrop-blur-md">
                            <svg className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <h4 className="font-black text-white uppercase mb-3 tracking-widest">Verified Fleets</h4>
                        <p className="text-sm text-gray-400 font-medium">Only the highest rated global providers with guaranteed vehicle quality.</p>
                    </div>
                    <div className="group">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform border border-white/10 backdrop-blur-md">
                            <svg className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h4 className="font-black text-white uppercase mb-3 tracking-widest">Transparent Pricing</h4>
                        <p className="text-sm text-gray-400 font-medium">No hidden fees. All-inclusive quotes with insurance options clearly explained.</p>
                    </div>
                    <div className="group">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform border border-white/10 backdrop-blur-md">
                            <svg className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <h4 className="font-black text-white uppercase mb-3 tracking-widest">Flexible Terms</h4>
                        <p className="text-sm text-gray-400 font-medium">Change of plans? Enjoy free cancellation on most bookings up to 24h before.</p>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes slow-zoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 25s linear infinite alternate;
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />
        </section>
    );
};

export const CarRentals = memo(CarRentalsComponent);
