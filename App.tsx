
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Chatbot } from './components/Chatbot';
import { AboutUs } from './components/AboutUs';
import { DealMap } from './components/DealMap';
import { PopularRoutesWidget } from './components/PopularRoutesWidget';
import { CarRentals } from './components/CarRentals';
import { Flights } from './components/Flights';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'about' | 'car-rentals' | 'flights'>('home');
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
  
  const handleNavigateToFlights = () => {
    setView('flights');
    window.scrollTo(0, 0);
  };

  const renderMainContent = () => {
    switch (view) {
      case 'home':
        return (
            <div>
                <Hero />
                <div className="container mx-auto px-4 py-8">
                    <div className="space-y-16 mt-16">
                        <DealMap />
                        <PopularRoutesWidget />
                    </div>
                </div>
            </div>
        );
      case 'about':
        return <AboutUs />;
      case 'car-rentals':
        return <CarRentals />;
      case 'flights':
        return <Flights />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header 
        onLogoClick={handleLogoClick} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onAboutClick={handleNavigateToAbout} 
        onCarRentalsClick={handleNavigateToCarRentals} 
        onFlightsClick={handleNavigateToFlights} 
      />
      <main className={`flex-grow ${view !== 'home' ? 'container mx-auto px-4 py-8' : ''}`}>
        {renderMainContent()}
      </main>
      <Footer onAboutClick={handleNavigateToAbout} />
      <Chatbot />
    </div>
  );
};

export default App;
