
import React, { memo } from 'react';

const TaxiServiceComponent: React.FC = () => {
    const widgetSrc = "https://tpscr.com/content?trs=486598&powered_by=true&shmarker=424483&language=en&display_currency=USD&transfer_type=any&hide_form_extras=true&hide_external_links=true&disable_currency_selector=true&campaign_id=1&promo_id=691";
    
    const iframeContent = `
        <!DOCTYPE html>
        <html lang="en">
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
                        justify-content: center;
                        align-items: flex-start;
                    }
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
        <section id="taxi-service" className="py-12 md:py-24 animate-fade-in bg-white dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="inline-block text-sky-600 font-black uppercase tracking-[0.4em] text-xs mb-6 px-4 py-1.5 bg-sky-50 dark:bg-sky-900/30 rounded-full border border-sky-100 dark:border-sky-800">
                        Rapid Transit
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 uppercase leading-none">
                        PREMIUM <span className="text-sky-600 italic">TAXI.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-gray-400 font-bold italic leading-relaxed">
                        Global access to trusted taxi networks. Book local rides and city-to-city transfers with ease. Upfront pricing, vetted drivers, and a fleet that moves with your schedule.
                    </p>
                </div>
                
                <div className="w-full max-w-5xl mx-auto bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100 dark:border-gray-700 p-2">
                    <div className="h-[600px] w-full">
                        <iframe
                            srcDoc={iframeContent}
                            title="Taxi Service Search"
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                            sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-forms"
                            className="w-full rounded-[2.5rem]"
                        />
                    </div>
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <div className="flex gap-6 items-start">
                        <div className="w-14 h-14 bg-sky-100 dark:bg-sky-900/40 rounded-2xl flex items-center justify-center flex-shrink-0">
                             <svg className="w-7 h-7 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div>
                            <h4 className="font-black text-slate-900 dark:text-white uppercase mb-2">Instant Booking</h4>
                            <p className="text-slate-500 dark:text-gray-400 text-sm font-medium leading-relaxed">Secure your ride in seconds. Our direct integration with local operators ensures your taxi is ready when you are.</p>
                        </div>
                    </div>
                    <div className="flex gap-6 items-start">
                        <div className="w-14 h-14 bg-sky-100 dark:bg-sky-900/40 rounded-2xl flex items-center justify-center flex-shrink-0">
                             <svg className="w-7 h-7 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <div>
                            <h4 className="font-black text-slate-900 dark:text-white uppercase mb-2">Vetted Network</h4>
                            <p className="text-slate-500 dark:text-gray-400 text-sm font-medium leading-relaxed">We only partner with established, licensed taxi companies globally to guarantee safety and professional service.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const TaxiService = memo(TaxiServiceComponent);
