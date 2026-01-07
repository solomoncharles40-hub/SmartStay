
import React, { memo } from 'react';

const widgetSrc = 'https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&lat=51.51&lng=0.06&powered_by=true&search_host=www.aviasales.com%2Fsearch&locale=en&origin=LON&value_min=0&value_max=1000000&round_trip=true&only_direct=false&radius=1&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=false&primary=%233FABDB&secondary=%233FABDB&light=%23ffffff&width=1500&height=500&zoom=2&promo_id=4054&campaign_id=100';

const iframeContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <style>body { margin: 0; overflow: hidden; font-family: sans-serif; }</style>
        </head>
        <body>
            <script async src="${widgetSrc}" charset="utf-8"></script>
        </body>
    </html>
`;

const DealMapComponent: React.FC = () => {
    return (
        <section id="deal-map" className="py-20 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors shadow-inner">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
                    Explore Global Flight Deals
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                    Use our interactive map to discover the cheapest flights from London to destinations worldwide. Find your next adventure at a glance.
                </p>
                <div className="w-full max-w-6xl mx-auto h-[500px] rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 border-4 border-white dark:border-gray-700">
                    <iframe
                        srcDoc={iframeContent}
                        title="Global Deal Map"
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
                    />
                </div>
            </div>
        </section>
    );
};

export const DealMap = memo(DealMapComponent);
