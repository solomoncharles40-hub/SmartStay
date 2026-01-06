
import React, { useEffect, useRef, memo } from 'react';

const CarRentalsComponent: React.FC = () => {
    const widgetContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement('script');
        
        script.src = 'https://tpscr.com/content?trs=486598&shmarker=424483&locale=en&country=153&city=68511&powered_by=true&campaign_id=87&promo_id=2466';
        script.async = true;
        script.charset = 'utf-8';

        const container = widgetContainerRef.current;
        if (!container) {
            return;
        }
        
        container.innerHTML = '';
        container.appendChild(script);

        return () => {
            if (container) {
                container.innerHTML = ''; 
            }
        };
    }, []);

    return (
        <section id="car-rentals" className="py-12 animate-fade-in">
            <div className="container mx-auto px-6">
                 <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-4">
                    Rent a Car for Your Next Adventure
                </h1>
                <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                    Find the best deals on rental cars from top companies worldwide. Enter your destination and dates to get started.
                </p>
                <div 
                    ref={widgetContainerRef} 
                    className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
                >
                    {/* The car rental widget will be loaded here */}
                </div>
            </div>
        </section>
    );
};

export const CarRentals = memo(CarRentalsComponent);
