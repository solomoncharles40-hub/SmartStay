
import React, { memo } from 'react';
import { AirplaneIcon, ArrowRightIcon, MapPinIcon } from './icons/Icons';

const MapWidget: React.FC = memo(() => {
    const widgetSrc = 'https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&lat=51.51&lng=0.06&powered_by=true&search_host=www.aviasales.com%2Fsearch&locale=en&origin=LON&value_min=0&value_max=1000000&round_trip=true&only_direct=false&radius=1&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=false&primary=%233FABDB&secondary=%233FABDB&light=%23ffffff&width=1500&height=500&zoom=2&promo_id=4054&campaign_id=100';

    const iframeContent = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { margin: 0; overflow: hidden; background: transparent; }
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
        <div className="w-full max-w-6xl mx-auto h-[400px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm border border-white/20">
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
    <div className="relative text-white overflow-hidden bg-gray-900">
        {/* Ambient Background Image */}
        <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109c055?auto=format&fit=crop&q=80&w=1600" 
            alt="Airplane wing over clouds" 
            className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40" 
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/60 via-gray-900/80 to-gray-900 z-10"></div>
        
        <div className="relative z-20 container mx-auto px-4 pt-12 pb-24 md:pt-20 md:pb-32">
            <div className="flex flex-col items-center text-center space-y-12">
                
                {/* Heading Area */}
                <div className="max-w-4xl mx-auto animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-bold mb-6 backdrop-blur-md">
                        <MapPinIcon className="h-4 w-4" />
                        Explore Real-Time Global Flight Deals
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl leading-[0.9]">
                        SMARTER <span className="text-blue-400">TRAVEL</span><br/>BETTER DEALS
                    </h1>
                    <p className="mt-8 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Discover low-fare flights anywhere in the world. Our interactive map and AI tools find the cheapest routes instantly.
                    </p>
                </div>

                {/* Primary Map Widget */}
                <div className="w-full animate-fade-in-up">
                    <MapWidget />
                </div>

                {/* Search CTA Box */}
                <div className="w-full max-w-3xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="bg-white/10 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 group">
                        <div className="flex items-center gap-6 text-left">
                            <div className="bg-blue-600 p-5 rounded-3xl group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/40">
                                <AirplaneIcon className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-1">Ready to fly?</h3>
                                <p className="text-gray-300 text-sm max-w-[250px]">
                                    Book your next trip with our global flight search partner.
                                </p>
                            </div>
                        </div>
                        <a
                            href="https://jet-tickets.com/?marker=424483"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-blue-900 font-black rounded-2xl shadow-xl hover:bg-blue-50 transition-all transform hover:scale-105 text-lg"
                        >
                            <span>SEARCH ALL FLIGHTS</span>
                            <ArrowRightIcon className="h-6 w-6" />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};
