
import React, { memo } from 'react';
import { AirplaneIcon, ArrowRightIcon, MapPinIcon } from './icons/Icons';

const MapWidget: React.FC = memo(() => {
    // Exact widget URL provided by the user
    const widgetSrc = 'https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&lat=51.51&lng=0.06&powered_by=true&search_host=www.aviasales.com%2Fsearch&locale=en&origin=LON&value_min=0&value_max=1000000&round_trip=true&only_direct=false&radius=1&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=false&primary=%233FABDB&secondary=%233FABDB&light=%23ffffff&width=1500&height=500&zoom=2&promo_id=4054&campaign_id=100';

    const iframeContent = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { margin: 0; padding: 0; overflow: hidden; background: transparent; display: flex; justify-content: center; align-items: center; height: 100vh; }
                    .widget-container { width: 100%; height: 100%; }
                </style>
            </head>
            <body>
                <div class="widget-container">
                    <script async src="${widgetSrc}" charset="utf-8"></script>
                </div>
            </body>
        </html>
    `;

    return (
        <div className="w-full max-w-6xl mx-auto h-[450px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl bg-white/60 backdrop-blur-md border border-white/80 transition-all hover:shadow-sky-200/50">
            <iframe
                srcDoc={iframeContent}
                title="Global Flight Map"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
            />
        </div>
    );
});

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-sky-50">
        {/* Bright Summer Background - Vibrant Tropical Sea */}
        <img 
            src="https://images.unsplash.com/photo-1506929113675-b9299d4fd4ea?auto=format&fit=crop&q=80&w=1600" 
            alt="Bright sunny tropical beach with turquoise water" 
            className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-110 saturate-[1.1]" 
        />
        
        {/* Airy Sunlight Overlays - Adjusted for legibility */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-sky-200/40 via-transparent to-white/70 z-10"></div>
        
        <div className="relative z-20 container mx-auto px-4 pt-20 pb-24 md:pt-32 md:pb-48">
            <div className="flex flex-col items-center text-center space-y-16">
                
                {/* Heading Area - High Visibility Typography */}
                <div className="max-w-4xl mx-auto animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/90 border border-sky-200 text-sky-700 text-sm font-black mb-10 shadow-lg shadow-sky-500/5 backdrop-blur-md uppercase tracking-widest">
                        <MapPinIcon className="h-4 w-4" />
                        Live Global Deals • Summer 2024
                    </div>
                    
                    <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter text-slate-900 leading-[0.8] uppercase select-none">
                        WANDER <span className="text-sky-600">FAR.</span><br/>PAY LESS.
                    </h1>
                    
                    <p className="mt-12 text-xl md:text-3xl text-slate-800 max-w-2xl mx-auto leading-relaxed font-bold italic">
                        Chase the sun without breaking the bank. Our real-time map finds the cheapest escapes to paradise.
                    </p>
                </div>

                {/* Main Interactive Map */}
                <div className="w-full animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                    <div className="relative group">
                        {/* Soft background glow */}
                        <div className="absolute -inset-10 bg-sky-400/20 blur-[100px] rounded-full z-0 opacity-40 group-hover:opacity-60 transition-opacity"></div>
                        <div className="relative z-10">
                            <MapWidget />
                        </div>
                    </div>
                </div>

                {/* Minimal CTA */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <a
                        href="https://jet-tickets.com/?marker=424483"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-4 px-14 py-6 bg-sky-600 text-white font-black rounded-[2rem] shadow-[0_20px_50px_rgba(14,165,233,0.3)] hover:bg-sky-500 transition-all transform hover:scale-105 active:scale-95 text-2xl tracking-tight border-b-4 border-sky-800"
                    >
                        <span>BOOK YOUR SUMMER ESCAPE</span>
                        <div className="bg-white/20 p-2 rounded-full group-hover:translate-x-1 transition-transform">
                            <ArrowRightIcon className="h-7 w-7" />
                        </div>
                    </a>
                </div>

            </div>
        </div>
    </div>
  );
};
