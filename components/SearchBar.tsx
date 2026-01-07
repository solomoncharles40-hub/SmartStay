
import React, { memo } from 'react';

const SearchBarComponent: React.FC = () => {
    // Exact script URL provided by the user
    const widgetSrc = "https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%2332a8dd&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&plain=false&promo_id=7879&campaign_id=100";
    
    // Using a refined HTML structure for the search bar to maximize horizontal space and readability
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
                        align-items: flex-start;
                        width: 100%;
                    }
                    /* Ensure the widget spans the full container width for readability */
                    #tp-widget-container { 
                        width: 100%; 
                        max-width: 100%;
                        padding: 10px 0;
                    }
                    /* Specific fix for internal script padding */
                    .tp-search-form { width: 100% !important; margin: 0 auto !important; }
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
        <div className="w-full max-w-[1400px] mx-auto group relative px-2">
            {/* Background Glow Effect */}
            <div className="absolute -inset-6 bg-sky-400/15 blur-[100px] rounded-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            
            <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/50 dark:border-gray-700 p-2 overflow-hidden transition-all duration-700 hover:scale-[1.01]">
                
                {/* The Search Widget Container */}
                {/* Height configured to handle vertical expansion (date pickers, person selectors) */}
                <div className="w-full h-[320px] md:h-[220px]">
                    <iframe
                        srcDoc={iframeContent}
                        title="SmartStay Flights and Hotels Search"
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-forms"
                        className="rounded-[2rem]"
                    />
                </div>
            </div>
            
            {/* Quick helper labels below the bar for user UX */}
            <div className="mt-4 flex justify-center gap-8 text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest opacity-60">
                <span className="flex items-center gap-2"><div className="w-1 h-1 bg-sky-400 rounded-full"></div> Best Price Guarantee</span>
                <span className="flex items-center gap-2"><div className="w-1 h-1 bg-sky-400 rounded-full"></div> Verified Partners</span>
                <span className="flex items-center gap-2"><div className="w-1 h-1 bg-sky-400 rounded-full"></div> 24/7 AI Support</span>
            </div>
        </div>
    );
};

export const SearchBar = memo(SearchBarComponent);
