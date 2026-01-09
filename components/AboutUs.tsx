
import React from 'react';
import { MapPinIcon, SparklesIcon, AirplaneIcon } from './icons/Icons';

export const AboutUs: React.FC = () => {
  return (
    <div className="animate-fade-in bg-white dark:bg-gray-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000" 
          alt="Majestic mountain lake" 
          className="absolute inset-0 w-full h-full object-cover brightness-75 scale-105 animate-slow-zoom"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none mb-6">
            BEYOND THE <br/><span className="text-sky-400 italic">HORIZON.</span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-200 font-bold italic max-w-2xl mx-auto drop-shadow-lg">
            "Travel is the only thing you buy that makes you richer."
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sky-600 font-black uppercase tracking-[0.4em] text-xs mb-6 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-tight">
              WE BELIEVE IN THE <br/><span className="italic text-sky-600">ART OF DISCOVERY.</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-400 leading-relaxed mb-8 font-medium">
              SmartStay wasn't born in a boardroom; it was conceived on a dusty road in Tuscany and a rain-slicked street in Tokyo. We are a collective of restless souls who believe that travel should be effortless, inspiring, and accessible to everyone.
            </p>
            <p className="text-lg text-slate-500 dark:text-gray-500 leading-relaxed mb-10 italic">
              Our mission is simple: to strip away the complexity of booking and leave you with the pure, unadulterated joy of the journey. We don't just find you a room; we find you a home for your memories.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-black text-slate-900 dark:text-white uppercase text-sm mb-2 tracking-widest">Global Reach</h4>
                <p className="text-sm text-slate-500">Connecting you to the most remote corners and vibrant metropolises.</p>
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white uppercase text-sm mb-2 tracking-widest">Vetted Stays</h4>
                <p className="text-sm text-slate-500">Every property in our collection is hand-picked for its character and quality.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-sky-100 dark:bg-sky-900/20 rounded-[3rem] -rotate-2"></div>
            <img 
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000" 
              alt="Serene boat on a lake" 
              className="relative rounded-[2.5rem] shadow-2xl z-10 hover:scale-[1.02] transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Visual Journey Gallery */}
      <section className="bg-slate-50 dark:bg-slate-900 py-32 overflow-hidden">
        <div className="container mx-auto px-4 mb-20">
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white text-center uppercase tracking-tighter">
            WHERE WILL YOUR <span className="text-sky-600 italic">CURIOSITY</span> TAKE YOU?
          </h3>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-12 px-4 no-scrollbar snap-x">
          {[
            { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800", label: "Pristine Escapes" },
            { url: "https://images.unsplash.com/photo-1516483642777-48632144a56d?auto=format&fit=crop&q=80&w=800", label: "Cultural Immersions" },
            { url: "https://images.unsplash.com/photo-1502791440352-39b3b6a74b4b?auto=format&fit=crop&q=80&w=800", label: "Mountain Highs" },
            { url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800", label: "Urban Elegance" },
            { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800", label: "Hidden Gems" }
          ].map((item, i) => (
            <div key={i} className="min-w-[300px] md:min-w-[450px] aspect-[4/5] relative rounded-[2rem] overflow-hidden group snap-center cursor-pointer">
              <img 
                src={item.url} 
                alt={item.label} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10">
                <h4 className="text-white text-2xl font-black uppercase tracking-tight">{item.label}</h4>
                <div className="w-0 group-hover:w-full h-1 bg-sky-400 transition-all duration-700 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-16 tracking-tighter uppercase">THE SMARTSTAY <span className="text-sky-600">PROMISE.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border border-slate-50 dark:border-gray-700 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-sky-50 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <SparklesIcon className="w-8 h-8 text-sky-600" />
              </div>
              <h4 className="font-black text-slate-900 dark:text-white uppercase mb-4 tracking-widest">Curation</h4>
              <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">We don't do 'generic'. Every stay is chosen for its unique contribution to your story.</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border border-slate-50 dark:border-gray-700 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-sky-50 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPinIcon className="w-8 h-8 text-sky-600" />
              </div>
              <h4 className="font-black text-slate-900 dark:text-white uppercase mb-4 tracking-widest">Transparency</h4>
              <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">No hidden fees, no clever marketing tricks. Just the best value for your hard-earned escape.</p>
            </div>
            <div className="p-8 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl border border-slate-50 dark:border-gray-700 hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-sky-50 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AirplaneIcon className="w-8 h-8 text-sky-600" />
              </div>
              <h4 className="font-black text-slate-900 dark:text-white uppercase mb-4 tracking-widest">Support</h4>
              <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">Our team of travel experts is on standby 24/7 to ensure your journey is as smooth as glass.</p>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s linear infinite alternate;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};
