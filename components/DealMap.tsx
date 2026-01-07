
import React, { memo } from 'react';

const widgetSrc = 'https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&lat=51.51&lng=0.06&powered_by=true&search_host=www.aviasales.com%2Fsearch&locale=en&origin=LON&value_min=0&value_max=1000000&round_trip=true&only_direct=false&radius=1&draggable=true&disable_zoom=false&show_logo=false&scrollwheel=false&primary=%233FABDB&secondary=%233FABDB&light=%23ffffff&width=1500&height=500&zoom=2&promo_id=4054&campaign_id=100';

const iframeContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body { margin: 0; padding: 0; overflow: hidden; background: transparent; display: flex; justify-content: center; align-items: center; height: 100vh; }
                .widget-container { width: 100%; height: 100%; display: flex; justify-content: center; }
                /* Ensure the script's injected container takes full height */
                .tp-widget-wrapper { height: 100% !important; width: 100% !important; }
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
        <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-[3rem] overflow-hidden shadow-[0_32px_80px_-16px_rgba(14,165,233,0.3)] bg-white/40 dark:bg-gray-800/40 backdrop-blur-2xl border border-white/50 dark:border-white/10 transition-all hover:shadow-sky-500/30">
            <iframe
                srcDoc={iframeContent}
                title="Interactive Global Deal Map"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"
                className="transition-opacity duration-700"
                onLoad={(e) => {
                    const target = e.target as HTMLIFrameElement;
                    target.style.opacity = '1';
                }}
            />
        </div>
    );
};

export const DealMap = memo(DealMapComponent);
