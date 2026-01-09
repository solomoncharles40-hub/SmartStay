
import React, { memo } from 'react';

const CarRentalWidgetComponent: React.FC<{ height?: string }> = ({ height = "500px" }) => {
    // Exact script URL provided by the user
    const widgetSrc = 'https://tpscr.com/content?trs=486598&shmarker=424483&locale=en&country=153&city=68511&powered_by=true&campaign_id=87&promo_id=2466';

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
                        /* Changed overflow from hidden to auto to ensure all car cards and images are visible */
                        overflow-y: auto; 
                        overflow-x: hidden;
                        background: transparent; 
                        display: flex; 
                        justify-content: center;
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    }
                    /* Ensure widget spans container and handles its own layout gracefully */
                    #tp-widget-container { 
                        width: 100%; 
                        max-width: 100%; 
                        padding-bottom: 20px;
                    }
                    /* Custom scrollbar for better aesthetics inside the iframe */
                    body::-webkit-scrollbar { width: 6px; }
                    body::-webkit-scrollbar-track { background: transparent; }
                    body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
                </style>
            </head>
            <body>
                <div id="tp-widget-container">
                    <script async src="${widgetSrc}" charset="utf-8"></script>
                </div>
            </body>
        </html>
    `;

    return (
        <div className="w-full h-full overflow-hidden rounded-[2rem]">
            <iframe
                srcDoc={iframeContent}
                title="Car Rental Search"
                width="100%"
                height={height}
                style={{ border: 'none' }}
                sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-forms"
                className="w-full"
            />
        </div>
    );
};

export const CarRentalWidget = memo(CarRentalWidgetComponent);
