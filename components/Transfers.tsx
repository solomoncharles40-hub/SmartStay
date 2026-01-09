
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
        <section id="transfers" className="relative min-h-screen bg-slate-900 overflow-hidden">
            {/* Immersive Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000" 
                    alt="Luxury transfer vehicle waiting at terminal" 
                    className="w-full h-full object-cover brightness-[0.35] scale-105 animate-slow-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950/90"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-16 md:py-32">
                <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
                    <span className="inline-block text-sky-400 font-black uppercase tracking-[0.4em] text-xs mb-6 px-4 py-1.5 bg-sky-900/40 rounded-full border border-sky-500/30 backdrop-blur-sm">
                        Door-to-Door Ease
                    </span>
                    <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-8 uppercase leading-[0.85]">
                        SEAMLESS <br/><span className="text-sky-400 italic">ARRIVALS.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-bold italic leading-relaxed max-w-2xl mx-auto opacity-90">
                        Skip the taxi queue. Pre-booked airport transfers at fixed prices in over 150 countries. Professional drivers, premium vehicles, zero stress.
                    </p>
                </div>
                
                <div className="w-full max-w-5xl mx-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden border border-white/20 animate-fade-in-up">
                    <div className="h-[650px] w-full p-2">
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

                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <div className="text-center group animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <div className="w-20 h-20 bg-white/10 dark:bg-sky-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform border border-white/10 backdrop-blur-md">
                            <svg className="w-10 h-10 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h4 className="font-black text-white uppercase mb-4 tracking-widest text-lg">Wait Guarantee</h4>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium">Flight delayed? Your driver monitors your arrival and waits for up to 60 minutes free of charge.</p>
                    </div>
                    <div className="text-center group animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="w-20 h-20 bg-white/10 dark:bg-sky-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform border border-white/10 backdrop-blur-md">
                            <svg className="w-10 h-10 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <h4 className="font-black text-white uppercase mb-4 tracking-widest text-lg">Fixed Pricing</h4>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium">The price you see is the price you pay. All tolls, tips, and taxes are included in your quote.</p>
                    </div>
                    <div className="text-center group animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="w-20 h-20 bg-white/10 dark:bg-sky-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform border border-white/10 backdrop-blur-md">
                            <svg className="w-10 h-10 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                        <h4 className="font-black text-white uppercase mb-4 tracking-widest text-lg">Group Friendly</h4>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium">From solo business travelers to large family groups, we have the right vehicle for every party size.</p>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes slow-zoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 25s linear infinite alternate;
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />
        </section>
    );
};

export const Transfers = memo(TransfersComponent);
