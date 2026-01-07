
import React, { memo } from 'react';

const widgetSrc = 'https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&lat=51.51&lng=0.06&powered_by=true&search_host=www.aviasales.com%2Fsearch&locale=en&origin=LON&value_min=0&value_max=1000000&round_trip=true&only_direct=false&radius=1&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=false&primary=%233FABDB&secondary=%233FABDB&light=%23ffffff&width=1500&height=500&zoom=2&promo_id=4054&campaign_id=100';

const iframeContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { margin: 0; padding: 0; overflow: hidden; background: transparent; display: flex; justify-content: center; align-items: center; height: 100vh; }
                .widget-container { width: 100%; height: 100%; }
            </style>
        </head>
        <body>
            <div class="widget-container">
                <script async src="${widgetSrc}" charset="utf-8"></script>
            </div>
        </body>
    </html>
`;

const DealMapComponent: React.FC = () => {
    return (
        <div className="w-full h-[450px] md:h-[650px] rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] bg-white/40 dark:bg-gray-800/40 backdrop-blur-2xl border border-white/50 dark:border-white/10 transition-all">
            <iframe
                srcDoc={iframeContent}
                title="Global Flight Map"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
            />
        </div>
    );
};

export const DealMap = memo(DealMapComponent);
