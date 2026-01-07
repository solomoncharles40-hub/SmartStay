
import React, { memo } from 'react';

const CarRentalWidgetComponent: React.FC<{ height?: string }> = ({ height = "450px" }) => {
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
                        overflow: hidden; 
                        background: transparent; 
                        display: flex; 
                        justify-content: center;
                    }
                    /* Ensure widget spans container */
                    #tp-widget-container { width: 100%; max-width: 100%; }
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
