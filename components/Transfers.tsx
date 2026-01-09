
import React, { memo } from 'react';

const TransfersComponent: React.FC = () => {
    const widgetSrc = "https://tpscr.com/content?trs=486598&shmarker=424483&locale=en&show_header=true&powered_by=true&campaign_id=627&promo_id=8951";
    
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
        <section id="transfers" className="py-12 md:py-24 animate-fade-in bg-white dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="inline-block text-sky-600 font-black uppercase tracking-[0.4em] text-xs mb-6 px-4 py-1.5 bg-sky-50 dark:bg-sky-900/30 rounded-full border border-sky-100 dark:border-sky-800">
                        Door-to-Door Ease
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 uppercase leading-none">
                        SEAMLESS <span className="text-sky-600 italic">ARRIVALS.</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-gray-400 font-bold italic leading-relaxed">
                        Skip the taxi queue. Pre-booked airport transfers at fixed prices in over 150 countries. Professional drivers, premium vehicles, zero stress.
                    </p>
                </div>
                
                <div className="w-full max-w-5xl mx-auto bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100 dark:border-gray-700 p-2">
                    <div className="h-[650px] w-full">
                        <iframe
                            srcDoc={iframeContent}
                            title="Global Transfer Search"
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                            sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-forms"
                            className="w-full rounded-[2.5rem]"
                        />
                    </div>
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <div className="text-center group">
                        <div className="w-16 h-16 bg-sky-50 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h4 className="font-black text-slate-900 dark:text-white uppercase mb-3">Wait Guarantee</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">Flight delayed? Your driver monitors your arrival and waits for up to 60 minutes free of charge.</p>
                    </div>
                    <div className="text-center group">
                        <div className="w-16 h-16 bg-sky-50 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <h4 className="font-black text-slate-900 dark:text-white uppercase mb-3">Fixed Pricing</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">The price you see is the price you pay. All tolls, tips, and taxes are included in your quote.</p>
                    </div>
                    <div className="text-center group">
                        <div className="w-16 h-16 bg-sky-50 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                        <h4 className="font-black text-slate-900 dark:text-white uppercase mb-3">Group Friendly</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">From solo business travelers to large family groups, we have the right vehicle for every party size.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Transfers = memo(TransfersComponent);
