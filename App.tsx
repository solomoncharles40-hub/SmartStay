
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Chatbot } from './components/Chatbot';
import { AboutUs } from './components/AboutUs';
import { CarRentals } from './components/CarRentals';

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
            <div className="animate-fade-in">
                <Hero />
                <div className="bg-gray-50 dark:bg-gray-900 py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                                <h4 className="text-xl font-bold mb-4">Real-time Data</h4>
                                <p className="text-gray-600 dark:text-gray-400">Our flight map updates live with the latest pricing from over 700 airlines.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                                <h4 className="text-xl font-bold mb-4">AI Optimized</h4>
                                <p className="text-gray-600 dark:text-gray-400">Leverage advanced algorithms to find "hidden city" tickets and save up to 40%.</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                                <h4 className="text-xl font-bold mb-4">Global Network</h4>
                                <p className="text-gray-600 dark:text-gray-400">From local budget hops to international long-hauls, we cover the entire planet.</p>
                            </div>
                        </div>
                    </div>
                </div>
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
