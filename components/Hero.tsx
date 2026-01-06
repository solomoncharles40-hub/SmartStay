
import React, { useEffect, useRef } from 'react';

interface HeroProps {}

export const Hero: React.FC<HeroProps> = () => {
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    
    script.src = 'https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&show_hotels=true&powered_by=false&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%2332a8dd&color_button=%2332a8dd&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&plain=false&promo_id=7879&campaign_id=100&target_blank=true';
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
    <div className="relative rounded-lg overflow-hidden flex flex-col items-center text-white text-center px-4 py-8 md:py-4 md:h-[calc(100vh-200px)] min-h-[500px]">
        <img src="https://picsum.photos/seed/beach-paradise/1600/900" alt="A serene tropical beach with palm trees and turquoise water." className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>
        <div className="relative z-20 w-full max-w-5xl flex flex-col justify-around h-full">
            <div className="pt-8 md:pt-0">
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
                  Why pay more to travel?
                </h1>
                <p className="mt-4 text-lg text-gray-100 max-w-3xl mx-auto drop-shadow-md">
                  SmartStay helps you find cheaper stays and smarter travel deals worldwide.
                </p>
            </div>
            <div ref={widgetContainerRef} className="w-full max-w-3xl min-h-[300px] mx-auto">
              {/* The widget will be loaded here */}
            </div>
        </div>
    </div>
  );
};