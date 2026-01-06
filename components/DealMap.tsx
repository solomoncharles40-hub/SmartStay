
import React, { memo } from 'react';

const widgetSrc = 'https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&lat=51.51&lng=0.06&powered_by=true&search_host=www.aviasales.com%2Fsearch&locale=en&origin=LON&value_min=0&value_max=1000000&round_trip=true&only_direct=false&radius=1&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=false&primary=%233FABDB&secondary=%233FABDB&light=%23ffffff&width=1500&height=500&zoom=2&promo_id=4054&campaign_id=100&target_blank=true';

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

const DealMapComponent: React.FC = () => {
    return (
        <section id="deal-map" className="py-12 bg-white dark:bg-gray-800 rounded-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
                Explore Deals on the Map
            </h2>
            <div className="w-full max-w-6xl mx-auto h-[500px] rounded-lg overflow-hidden shadow-lg">
                <iframe
                    srcDoc={iframeContent}
                    title="Deal Map"
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
                />
            </div>
        </section>
    );
};

export const DealMap = memo(DealMapComponent);
