
import React, { memo } from 'react';

const SearchBarComponent: React.FC = () => {
    const widgetSrc = "https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%2332a8dd&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&plain=false&promo_id=7879&campaign_id=100";
    
    const iframeContent = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <style>body { margin: 0; overflow: hidden; }</style>
            </head>
            <body>
                <script async src="${widgetSrc}" charset="utf-8"></script>
            </body>
        </html>
    `;

    return (
        <section id="search-bar">
            <div className="w-full max-w-5xl mx-auto h-[350px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden border dark:border-gray-700">
                <iframe
                    srcDoc={iframeContent}
                    title="Search Widget"
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
                />
            </div>
        </section>
    );
};

export const SearchBar = memo(SearchBarComponent);
