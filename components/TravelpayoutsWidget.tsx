
import React, { useEffect, useRef } from 'react';

export const TravelpayoutsWidget: React.FC = () => {
    const widgetContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement('script');
        
        // IMPORTANT: Replace 'YOUR_AFFILIATE_MARKER' with your actual Travelpayouts affiliate marker to earn commissions.
        script.src = '//www.travelpayouts.com/widgets/en/hotels.js?marker=YOUR_AFFILIATE_MARKER&host=search.hotellook.com&locale=en&currency=usd&powered_by=true';
        script.async = true;
        script.charset = 'UTF-8';

        const container = widgetContainerRef.current;
        if (container) {
            container.appendChild(script);
        }

        return () => {
            if (container && container.contains(script)) {
                container.removeChild(script);
                // The widget might leave behind iframes or other elements. 
                // A simple innerHTML clear is a robust way to clean up.
                container.innerHTML = ''; 
            }
        };
    }, []);

    return (
        <section id="travelpayouts" className="py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
                    Explore More Options
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                    Can't find what you're looking for? Broaden your search with our partner, Travelpayouts, for an extensive selection of hotels worldwide.
                </p>
                <div 
                    ref={widgetContainerRef} 
                    className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                >
                    {/* The Travelpayouts widget will be loaded here */}
                </div>
            </div>
        </section>
    );
};
