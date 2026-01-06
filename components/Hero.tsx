
import React from 'react';

export const Hero: React.FC = () => {
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
    <div className="relative rounded-lg overflow-hidden text-white text-center">
        <img src="https://picsum.photos/seed/beach-paradise/1600/900" alt="A serene tropical beach with palm trees and turquoise water." className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
        <div className="relative z-20 container mx-auto px-4">
            <div className="flex flex-col items-center justify-between md:h-[calc(100vh-200px)] min-h-[600px] py-10">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
                    Better Deals, Smarter Stays
                    </h1>
                    <p className="mt-4 text-lg text-gray-100 max-w-3xl mx-auto drop-shadow-md">
                    Find your next destination and let our AI create the perfect trip for you.
                    </p>
                </div>
                <div className="w-full h-[350px] bg-transparent">
                    <iframe
                        srcDoc={iframeContent}
                        title="Search Widget"
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
                    />
                </div>
            </div>
        </div>
    </div>
  );
};
