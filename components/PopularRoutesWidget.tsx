
import React, { memo, useRef, useEffect } from 'react';

const widgetSrc = 'https://tpscr.com/content?currency=usd&trs=486598&shmarker=424483&target_host=www.aviasales.com%2Fsearch&locale=en&limit=6&powered_by=true&primary=%230085FF&promo_id=4044&campaign_id=100';
    
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

const PopularRoutesWidgetComponent: React.FC = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            const doc = iframe.contentDocument;
            if (doc) {
                doc.open();
                doc.write(iframeContent);
                doc.close();
            }
        }
    }, []);

    return (
        <section id="popular-routes" className="py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
                Popular Flight Deals
            </h2>
            <div className="w-full max-w-6xl mx-auto h-[400px]">
                    <iframe
                    ref={iframeRef}
                    title="Popular Flight Routes"
                    width="100%"
                    height="100%"
                    style={{ border: 'none' }}
                    sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
                />
            </div>
        </section>
    );
};

export const PopularRoutesWidget = memo(PopularRoutesWidgetComponent);
