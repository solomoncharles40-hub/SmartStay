
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Chatbot } from './components/Chatbot';
import { AboutUs } from './components/AboutUs';
import { CarRentals } from './components/CarRentals';
import { DealMap } from './components/DealMap';
import { PopularRoutesWidget } from './components/PopularRoutesWidget';
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
                
                {/* Section 1: The World Is On Sale - Interactive Map Container */}
                <section id="deals" className="py-24 bg-white dark:bg-gray-900 relative">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div className="max-w-2xl">
                                <span className="text-sky-600 font-black uppercase tracking-[0.3em] text-sm mb-4 block">Discovery Dashboard</span>
                                <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                                    THE WORLD IS <br/><span className="text-sky-500 italic">ON SALE.</span>
                                </h2>
                            </div>
                            <div className="flex flex-col items-end text-right hidden md:block">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Live Sync: Active</p>
                                </div>
                                <p className="text-slate-400 text-sm font-medium">Real-time fares from 700+ airlines</p>
                            </div>
                        </div>

                        {/* Interactive Deal Map */}
                        <div className="relative group mb-12">
                            <div className="absolute -inset-10 bg-sky-100/50 dark:bg-sky-500/10 blur-3xl rounded-[4rem] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <div className="relative z-10">
                                <DealMap />
                            </div>
                        </div>

                        {/* Supporting Routes */}
                        <div className="mt-12">
                            <PopularRoutesWidget />
                        </div>
                    </div>
                </section>

                {/* Section 2: AI Advantages */}
                <section className="py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
                    
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 uppercase">
                                Travel Smarter, Not <span className="text-sky-600">Harder.</span>
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto font-bold italic">
                                SmartStay uses advanced reasoning to bypass traditional booking engines.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <FeatureCard 
                                delay="0s"
                                icon={<SparklesIcon className="w-8 h-8 text-sky-600" />}
                                title="Generative Logic"
                                desc="Our AI doesn't just filter; it computes combinations other sites miss to find the true bottom price."
                            />
                            <FeatureCard 
                                delay="0.1s"
                                icon={<SearchIcon className="w-8 h-8 text-sky-600" />}
                                title="Grounding Engine"
                                desc="Search results are synchronized with Google Search to warn you about local strikes, weather, or events."
                            />
                            <FeatureCard 
                                delay="0.2s"
                                icon={<AirplaneIcon className="w-8 h-8 text-sky-600" />}
                                title="Route Optimization"
                                desc="Leverage multi-city logic to turn one trip into a multi-destination adventure for the same price."
                            />
                        </div>
                    </div>
                </section>

                {/* Section 3: Car Rental Teaser */}
                <section className="relative py-32 overflow-hidden group">
                    <img 
                        src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1600"
                        alt="Road trip through tropical landscape"
                        className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-75 group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent z-10"></div>
                    
                    <div className="container mx-auto px-4 relative z-20">
                        <div className="max-w-xl text-white">
                            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.8]">
                                DRIVE INTO <br/> THE <span className="text-sky-400">WILD.</span>
                            </h2>
                            <p className="text-xl font-bold mb-10 text-gray-200 leading-relaxed italic">
                                Your adventure doesn't stop at the tarmac. Grab the keys to freedom with our premium rental fleet.
                            </p>
                            <button 
                                onClick={handleNavigateToCarRentals}
                                className="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-sky-400 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-2xl uppercase tracking-widest text-sm"
                            >
                                EXPLORE RENTALS
                            </button>
                        </div>
                    </div>
                </section>

                {/* Section 4: Newsletter */}
                <section className="py-24 bg-white dark:bg-gray-900">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-4xl mx-auto bg-slate-900 dark:bg-slate-800 rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden border border-white/10">
                            <div className="absolute -top-24 -left-24 w-64 h-64 bg-sky-500/20 rounded-full blur-[80px]"></div>
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]"></div>
                            
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8">
                                READY TO <span className="text-sky-400 italic underline decoration-sky-400 underline-offset-8">ESCAPE?</span>
                            </h2>
                            <p className="text-xl text-gray-400 mb-12 font-bold max-w-2xl mx-auto">
                                Join 50,000+ smart travelers who get our AI-curated "Glitch Fares" every Monday morning.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                                <input 
                                    type="email" 
                                    placeholder="your@email.com" 
                                    className="flex-grow px-8 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold"
                                />
                                <button className="px-10 py-5 bg-sky-500 text-white font-black rounded-2xl hover:bg-sky-400 transition-all shadow-lg uppercase text-sm tracking-widest">
                                    JOIN US
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
