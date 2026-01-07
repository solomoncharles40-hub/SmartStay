
import React from 'react';
import { ArrowRightIcon, MapPinIcon } from './icons/Icons';

export const Hero: React.FC = () => {
  const scrollToDeals = () => {
    document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-[80vh] md:h-[90vh] overflow-hidden bg-sky-50">
        {/* Caribbean Sunset Background */}
        <img 
            src="https://images.unsplash.com/photo-1518005020250-675c02741660?auto=format&fit=crop&q=80&w=2000" 
            alt="Beautiful Caribbean Sunset over a tropical beach" 
            className="absolute top-0 left-0 w-full h-[120%] object-cover z-0 brightness-110 saturate-[1.1] animate-slow-zoom" 
        />
        
        {/* Gradients for text contrast */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-400/20 via-transparent to-white z-10"></div>
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
            
            {/* Heading Area */}
            <div className="max-w-5xl mx-auto animate-fade-in">
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/95 border border-sky-100 text-sky-700 text-xs font-black mb-12 shadow-xl backdrop-blur-md uppercase tracking-[0.3em]">
                    <MapPinIcon className="h-4 w-4" />
                    AI-OPTIMIZED SUMMER 2024 DEALS
                </div>
                
                <h1 className="text-7xl sm:text-8xl md:text-[11rem] font-black tracking-tighter text-slate-900 leading-[0.75] uppercase select-none mb-12">
                    WANDER <span className="text-sky-600 italic">FAR.</span><br/>
                    <span className="relative">
                        PAY LESS.
                        <svg className="absolute -bottom-4 left-0 w-full h-4 text-sky-400 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                        </svg>
                    </span>
                </h1>
                
                <p className="text-2xl md:text-4xl text-slate-800 max-w-3xl mx-auto leading-tight font-bold italic tracking-tight opacity-90 mb-16">
                    Chase the horizon without breaking the bank. <br className="hidden md:block" />
                    Real-time AI discovery for the world's best escapes.
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    <button 
                        onClick={scrollToDeals}
                        className="px-10 py-5 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-slate-800 transition-all flex items-center gap-4 group shadow-2xl shadow-slate-900/30 transform hover:scale-105 active:scale-95 text-lg"
                    >
                        EXPLORE GLOBAL DEALS
                        <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-10 py-5 bg-white text-slate-900 font-black rounded-[2rem] border-2 border-slate-100 hover:bg-slate-50 transition-all shadow-xl text-lg">
                        HOW IT WORKS
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-50 hover:opacity-100" onClick={scrollToDeals}>
                <div className="w-8 h-12 rounded-full border-2 border-slate-400 flex justify-center p-2">
                    <div className="w-1 h-3 bg-slate-400 rounded-full"></div>
                </div>
            </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
            @keyframes slow-zoom {
                0% { transform: scale(1); }
                100% { transform: scale(1.1); }
            }
            .animate-slow-zoom {
                animation: slow-zoom 20s linear infinite alternate;
            }
        `}} />
    </div>
  );
};
