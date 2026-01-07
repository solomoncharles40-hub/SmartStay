
import React, { memo } from 'react';

const SearchBarComponent: React.FC = () => {
    // Exact script URL provided by the user
    const widgetSrc = "https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%2332a8dd&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&plain=false&promo_id=7879&campaign_id=100";
    
    // We use a clean HTML structure inside the iframe to host the script
    const iframeContent = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                    body { 
                        margin: 0; 
                        padding: 0; 
                        overflow: hidden; 
                        background: transparent; 
                        display: flex;
                        justify-content: center;
                    }
                    /* Customizing the injected widget container if necessary */
                    #tp-widget-container { width: 100%; max-width: 1200px; }
                </style>
            </head>
            <body>
                <div id="tp-widget-container">
                    <script async src="${widgetSrc}" charset="utf-8"></script>
                </div>
            </body>
        </html>
    `;

    return (
        <div className="w-full max-w-6xl mx-auto group relative">
            {/* Soft Glow/Shadow behind the search bar */}
            <div className="absolute -inset-4 bg-sky-400/20 blur-3xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] border border-white dark:border-gray-700 p-2 overflow-hidden transition-all duration-500 hover:shadow-[0_35px_80px_-20px_rgba(14,165,233,0.25)]">
                
                {/* Visual Label */}
                <div className="absolute top-3 left-8 z-10 hidden md:flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-gray-500">Global Search Intelligence</span>
                </div>

                {/* The Widget Iframe */}
                <div className="w-full h-[280px] md:h-[200px]">
                    <iframe
                        srcDoc={iframeContent}
                        title="SmartStay Flights and Hotels Search"
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-forms"
                        className="rounded-[1.5rem]"
                    />
                </div>
            </div>
        </div>
    );
};

export const SearchBar = memo(SearchBarComponent);
