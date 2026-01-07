
import React, { memo } from 'react';

const SearchBarComponent: React.FC = () => {
    // Exact script URL provided by the user
    const widgetSrc = "https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%2332a8dd&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&plain=false&promo_id=7879&campaign_id=100";
    
    const iframeContent = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                    body { margin: 0; padding: 0; overflow: hidden; background: transparent; }
                    /* Adjusting potential widget spacing */
                    .tp-search-form { margin: 0 !important; }
                </style>
            </head>
            <body>
                <script async src="${widgetSrc}" charset="utf-8"></script>
            </body>
        </html>
    `;

    return (
        <div className="w-full max-w-6xl mx-auto h-[280px] md:h-[180px] bg-white dark:bg-gray-800 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-gray-100 dark:border-gray-700 p-2 relative">
            <div className="absolute top-4 left-6 z-10 hidden md:block">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-500 bg-sky-50 dark:bg-sky-900/30 px-3 py-1 rounded-full">Secure Search Provider</span>
            </div>
            <iframe
                srcDoc={iframeContent}
                title="Search Widget"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"
            />
        </div>
    );
};

export const SearchBar = memo(SearchBarComponent);
