
import React, { useEffect, useRef, memo } from 'react';

const PopularRoutesWidgetComponent: React.FC = () => {
    const widgetContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement('script');
        
        script.src = 'https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&target_host=www.aviasales.com%2Fsearch&locale=en&limit=6&powered_by=true&primary=%230085FF&promo_id=4044&campaign_id=100';
        script.async = true;
        script.charset = 'utf-8';

        const container = widgetContainerRef.current;
        if (!container) {
            return;
        }
        
        container.appendChild(script);

        return () => {
            if (container) {
                container.innerHTML = ''; 
            }
        };
    }, []);

    return (
        <section id="popular-routes" className="py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="container mx-auto px-6">
                 <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
                    Popular Flight Deals
                </h2>
                <div 
                    ref={widgetContainerRef} 
                    className="w-full max-w-6xl mx-auto"
                >
                    {/* The popular routes widget will be loaded here */}
                </div>
            </div>
        </section>
    );
};

export const PopularRoutesWidget = memo(PopularRoutesWidgetComponent);
