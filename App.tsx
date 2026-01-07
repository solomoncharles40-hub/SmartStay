
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Chatbot } from './components/Chatbot';
import { AboutUs } from './components/AboutUs';
import { CarRentals } from './components/CarRentals';
import { DealMap } from './components/DealMap';
import { PopularRoutesWidget } from './components/PopularRoutesWidget';
import { SearchBar } from './components/SearchBar';
import { CarRentalWidget } from './components/CarRentalWidget';
import { SparklesIcon, AirplaneIcon, SearchIcon } from './components/icons/Icons';

const FeatureCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; delay: string }> = ({ title, desc, icon, delay }) => (
    <div 
        className="group bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:-translate-y-2 animate-fade-in-up"
        style={{ animationDelay: delay }}
    >
        <div className="bg-sky-50 dark:bg-sky-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
            {icon}
        </div>
        <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{title}</h4>
        <p className="text-slate-600 dark:text-gray-400 leading-relaxed font-medium">
            {desc}
        </p>
    </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'about' | 'car-rentals'>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
      setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleLogoClick = () => {
    setView('home');
    window.scrollTo(0, 0);
  }

  const handleNavigateToAbout = () => {
    setView('about');
    window.scrollTo(0, 0);
  };

  const handleNavigateToCarRentals = () => {
    setView('car-rentals');
    window.scrollTo(0, 0);
  };

  const renderMainContent = () => {
    switch (view) {
      case 'home':
        return (
            <div className="flex flex-col">
                <Hero />

                {/* Primary Search Bar - Positioned above 'The World Is On Sale' */}
                <div className="relative z-30 w-full px-4 -mt-20 md:-mt-32 mb-12">
                    <SearchBar />
                </div>
                
                {/* Section 1: The World Is On Sale - Interactive Map Container */}
                <section id="deals" className="py-24 md:py-32 bg-white dark:bg-gray-900 relative">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                            <div className="max-w-3xl">
                                <span className="inline-flex items-center gap-2 text-sky-600 font-black uppercase tracking-[0.4em] text-xs mb-6 px-4 py-1.5 bg-sky-50 dark:bg-sky-900/30 rounded-full border border-sky-100 dark:border-sky-800">
                                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                                    Live Discovery
                                </span>
                                <h2 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.85] uppercase">
                                    THE WORLD IS <br/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400 italic">ON SALE.</span>
                                </h2>
                            </div>
                            <div className="flex flex-col items-start md:items-end text-left md:text-right">
                                <p className="text-slate-500 dark:text-gray-400 font-bold text-lg md:text-xl leading-snug max-w-[320px] italic">
                                    Our AI maps thousands of real-time airfare drops across every continent.
                                </p>
                                <div className="mt-6 flex items-center gap-4">
                                    <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 dark:text-gray-400">
                                        700+ Partners
                                    </div>
                                    <div className="px-4 py-2 bg-sky-50 dark:bg-sky-900/40 rounded-xl text-xs font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
                                        Active Sync
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Deal Map - The visual centerpiece */}
                        <div className="relative group mb-32">
                            <div className="absolute -inset-12 bg-sky-400/10 dark:bg-sky-500/5 blur-[120px] rounded-[5rem] z-0 pointer-events-none group-hover:bg-sky-400/20 transition-all duration-1000"></div>
                            <div className="relative z-10">
                                <DealMap />
                            </div>
                        </div>

                        {/* Supporting Popular Routes Grid */}
                        <div className="mt-32">
                            <div className="flex flex-col md:flex-row items-baseline gap-4 mb-14 border-b border-slate-100 dark:border-slate-800 pb-8">
                                <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Fast-Tracking Escapes</h3>
                                <p className="text-sky-600 font-black italic text-lg">Curated live intelligence</p>
                            </div>
                            <PopularRoutesWidget />
                        </div>
                    </div>
                </section>

                {/* Section 2: AI Intelligence */}
                <section className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-400/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2"></div>
                    
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-24">
                            <h2 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 uppercase leading-[0.85]">
                                WHY SMARTSTAY <br/><span className="text-sky-600">BEATS</span> SEARCH.
                            </h2>
                            <p className="text-2xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto font-bold italic tracking-tight opacity-80">
                                Traditional booking sites prioritize their margins. We prioritize your logic.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <FeatureCard 
                                delay="0s"
                                icon={<SparklesIcon className="w-9 h-9 text-sky-600" />}
                                title="Generative Logic"
                                desc="We calculate routes standard aggregators ignore, including hidden-city and split-ticket combinations."
                            />
                            <FeatureCard 
                                delay="0.1s"
                                icon={<SearchIcon className="w-9 h-9 text-sky-600" />}
                                title="Search Grounding"
                                desc="Directly synced with Google's index to verify local conditions, safety alerts, and peak travel events."
                            />
                            <FeatureCard 
                                delay="0.2s"
                                icon={<AirplaneIcon className="w-9 h-9 text-sky-600" />}
                                title="Total Experience"
                                desc="Don't just land. Generate day-by-day itineraries that match your energy and budget perfectly."
                            />
                        </div>
                    </div>
                </section>

                {/* Section 3: Car Rental Teaser */}
                <section className="relative py-32 md:py-44 overflow-hidden group">
                    <img 
                        src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2000"
                        alt="Road trip through tropical landscape"
                        className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[0.6] group-hover:scale-105 transition-transform duration-[4s]"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950/40 to-slate-950/90 z-10"></div>
                    
                    <div className="container mx-auto px-4 relative z-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="max-w-2xl text-white">
                                <span className="text-sky-400 font-black uppercase tracking-[0.5em] text-xs mb-8 block">Freedom Found</span>
                                <h2 
                                    onClick={handleNavigateToCarRentals}
                                    className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.75] cursor-pointer hover:text-sky-400 transition-colors"
                                >
                                    DRIVE INTO <br/> THE <span className="text-sky-400 italic">UNKNOWN.</span>
                                </h2>
                                <p className="text-2xl font-bold mb-14 text-gray-200 leading-relaxed italic max-w-lg">
                                    Complete your escape. Our premium fleet gives you the keys to hidden coves and mountain peaks.
                                </p>
                                <button 
                                    onClick={handleNavigateToCarRentals}
                                    className="px-14 py-7 bg-white text-slate-900 font-black rounded-3xl hover:bg-sky-400 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl uppercase tracking-[0.2em] text-sm"
                                >
                                    EXPLORE ALL RENTALS
                                </button>
                            </div>

                            {/* Embedded Car Rental Search Widget for immediate use */}
                            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl p-4 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20">
                                <div className="mb-4 flex items-center gap-3 px-4 pt-2">
                                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-ping"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quick Fleet Access</span>
                                </div>
                                <div className="h-[400px]">
                                    <CarRentalWidget height="400px" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Newsletter */}
                <section className="py-32 bg-white dark:bg-gray-900 overflow-hidden">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-6xl mx-auto bg-slate-900 dark:bg-slate-800 rounded-[5rem] p-16 md:p-28 shadow-2xl relative overflow-hidden border border-white/5">
                            <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px]"></div>
                            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]"></div>
                            
                            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-10 uppercase leading-none">
                                NEVER MISS A <br/><span className="text-sky-400 italic">GLITCH FARE.</span>
                            </h2>
                            <p className="text-2xl text-gray-400 mb-16 font-bold max-w-2xl mx-auto leading-tight italic opacity-90">
                                Join our elite squad of travelers. AI-curated anomalies delivered to your inbox every Monday.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5 max-w-2xl mx-auto">
                                <input 
                                    type="email" 
                                    placeholder="your@email.com" 
                                    className="flex-grow px-10 py-7 rounded-3xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold text-xl"
                                />
                                <button className="px-14 py-7 bg-sky-500 text-white font-black rounded-3xl hover:bg-sky-400 transition-all shadow-xl uppercase text-sm tracking-[0.2em] whitespace-nowrap">
                                    GET ACCESS
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
      case 'about':
        return <AboutUs />;
      case 'car-rentals':
        return <CarRentals />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-gray-900 transition-colors duration-500">
      <Header 
        onLogoClick={handleLogoClick} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onAboutClick={handleNavigateToAbout} 
        onCarRentalsClick={handleNavigateToCarRentals} 
      />
      <main className="flex-grow">
        {renderMainContent()}
      </main>
      <Footer onAboutClick={handleNavigateToAbout} />
      <Chatbot />
    </div>
  );
};

export default App;
