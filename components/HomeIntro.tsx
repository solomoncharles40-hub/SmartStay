
import React from 'react';

export const HomeIntro: React.FC = () => {
  return (
    <section className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
        Better Deals, Smarter Stays
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Find your next destination and let our AI create the perfect trip for you.
        </p>
    </section>
  );
};
