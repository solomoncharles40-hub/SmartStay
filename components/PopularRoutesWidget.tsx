
import React, { memo } from 'react';

const PopularRoutesWidgetComponent: React.FC = () => {
    // Exact script URL provided by the user
    const widgetSrc = 'https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&target_host=www.aviasales.com%2Fsearch&locale=en&limit=6&powered_by=true&primary=%230085FF&promo_id=4044&campaign_id=100';
    
    const iframeContent = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                    body { 
                        margin: 0; 
                        padding: 0; 
                        overflow-x: hidden; 
                        background: transparent; 
                        display: flex; 
                        flex-direction: column;
                        align-items: center;
                    }
                    /* Container for the injected widget */
                    #widget-holder { width: 100%; }
                </style>
            </head>
            <body>
                <div id="widget-holder">
                    <script async src="${widgetSrc}" charset="utf-8"></script>
                </div>
            </body>
        </html>
    `;

    return (
        <div className="w-full min-h-[500px] md:min-h-[600px] bg-white dark:bg-gray-800/50 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-500 hover:shadow-sky-500/10">
            <iframe
                srcDoc={iframeContent}
                title="Fast-Tracking Popular Escapes"
                width="100%"
                height="650px"
                style={{ border: 'none' }}
                sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"
                className="opacity-95 hover:opacity-100 transition-opacity"
            />
        </div>
    );
};

export const PopularRoutesWidget = memo(PopularRoutesWidgetComponent);
