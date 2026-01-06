
import React, { useEffect, useRef, memo } from 'react';

const TravelpayoutsWidgetComponent: React.FC = () => {
    const widgetContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement('script');
        
        script.src = 'https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&target_host=www.aviasales.com%2Fsearch&locale=en&limit=4&powered_by=false&primary=%230085FF&promo_id=4044&campaign_id=100';
        script.async = true;
        script.charset = 'utf-8';

        const container = widgetContainerRef.current;
        if (!container) {
            return;
        }

        // Append the script to let it initialize.
        container.appendChild(script);

        return () => {
            // On cleanup, robustly clear the container of any content the script may have added.
            // This is crucial for React's Strict Mode, which mounts/unmounts components twice in development,
            // and ensures we don't have lingering widgets or multiple script instances.
            if (container) {
                container.innerHTML = ''; 
            }
        };
    }, []);

    return (
        <section id="travelpayouts" className="py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
                    Find More Deals
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    Can't find what you're looking for? Broaden your search with our partner for an extensive selection of flights, hotels, and car rentals worldwide.
                </p>
                <div 
                    ref={widgetContainerRef} 
                    className="max-w-4xl mx-auto min-h-[400px]"
                >
                    {/* The Aviasales widget will be loaded here */}
                </div>
            </div>
        </section>
    );
};

export const TravelpayoutsWidget = memo(TravelpayoutsWidgetComponent);