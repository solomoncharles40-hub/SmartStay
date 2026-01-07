
import React, { memo } from 'react';

const widgetSrc = 'https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&target_host=www.aviasales.com%2Fsearch&locale=en&limit=6&powered_by=true&primary=%230284c7&promo_id=4044&campaign_id=100';
    
const iframeContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { margin: 0; padding: 0; overflow: hidden; background: transparent; }
                /* Custom styles if needed within iframe if possible */
            </style>
        </head>
        <body>
            <script async src="${widgetSrc}" charset="utf-8"></script>
        </body>
    </html>
`;

const PopularRoutesWidgetComponent: React.FC = () => {
    return (
        <div className="w-full h-[450px] bg-white dark:bg-gray-800/50 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <iframe
                srcDoc={iframeContent}
                title="Popular Flight Routes"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
                className="opacity-95 hover:opacity-100 transition-opacity"
            />
        </div>
    );
};

export const PopularRoutesWidget = memo(PopularRoutesWidgetComponent);
