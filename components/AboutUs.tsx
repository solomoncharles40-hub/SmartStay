
import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about-us" className="py-12 bg-white rounded-lg shadow-md">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Our Story
        </h2>
        <div className="space-y-6 text-gray-700 leading-relaxed text-lg text-justify sm:text-left">
          <p>
            SmartStay was born from a simple question: why should finding a great place to stay ever mean overpaying?
          </p>
          <p>
            Like many travelers, we loved exploring new cities—but we were frustrated by hidden fees, confusing prices, and the feeling that better deals were always just out of reach. So we decided to build something better.
          </p>
          <p>
            SmartStay is designed to work smarter for you. By combining intelligent technology, transparent pricing, and direct partnerships with hosts and hotels, we uncover deals others miss and put real savings back into your journey. No tricks. No inflated prices. Just stays that make sense.
          </p>
          <p>
            We believe travel should feel exciting, not stressful—and that a great stay shouldn’t depend on luck. Whether you’re planning months ahead or booking last-minute, SmartStay helps you find the right place, at the right price, every time.
          </p>
          <p className="font-semibold text-gray-800">
            Because smart travel starts with a smart stay.
          </p>
        </div>
      </div>
    </section>
  );
};
