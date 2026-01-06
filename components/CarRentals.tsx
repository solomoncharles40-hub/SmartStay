
import React, { memo } from 'react';

const CarRentalsComponent: React.FC = () => {
    const widgetSrc = 'https://tpscr.com/content?trs=486598&shmarker=424483&locale=en&country=153&city=68511&powered_by=true&campaign_id=87&promo_id=2466';

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
        <section id="car-rentals" className="py-12 animate-fade-in">
            <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-4">
                Rent a Car for Your Next Adventure
            </h1>
            <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                Find the best deals on rental cars from top companies worldwide. Enter your destination and dates to get started.
            </p>
            <div 
                className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 p-0 rounded-lg shadow-lg overflow-hidden h-[450px]"
            >
                <iframe
                    srcDoc={iframeContent}
                    title="Car Rentals"
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
                />
            </div>
        </section>
    );
};

export const CarRentals = memo(CarRentalsComponent);
