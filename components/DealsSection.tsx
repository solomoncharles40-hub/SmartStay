
import React from 'react';

const deals = [
  {
    name: 'Philippines',
    price: 399,
    imageUrl: 'https://picsum.photos/seed/philippines/800/600',
  },
  {
    name: 'Saint Lucia',
    price: 529,
    imageUrl: 'https://picsum.photos/seed/stlucia/800/600',
  },
  {
    name: 'Turkey',
    price: 479,
    imageUrl: 'https://picsum.photos/seed/turkey/800/600',
  },
  {
    name: 'Spain',
    price: 419,
    imageUrl: 'https://picsum.photos/seed/spain/800/600',
  },
  {
    name: 'Maldives',
    price: 799,
    imageUrl: 'https://picsum.photos/seed/maldives/800/600',
  },
  {
    name: 'Greece',
    price: 549,
    imageUrl: 'https://picsum.photos/seed/greece/800/600',
  },
  {
    name: 'Thailand',
    price: 379,
    imageUrl: 'https://picsum.photos/seed/thailand/800/600',
  },
  {
    name: 'Costa Rica',
    price: 449,
    imageUrl: 'https://picsum.photos/seed/costarica/800/600',
  },
  {
    name: 'Kyoto, Japan',
    price: 680,
    imageUrl: 'https://picsum.photos/seed/kyoto/800/600',
  },
  {
    name: 'Cairo, Egypt',
    price: 580,
    imageUrl: 'https://picsum.photos/seed/cairo/800/600',
  },
  {
    name: 'Patagonia, Chile',
    price: 920,
    imageUrl: 'https://picsum.photos/seed/patagonia/800/600',
  },
  {
    name: 'Auckland, NZ',
    price: 760,
    imageUrl: 'https://picsum.photos/seed/auckland/800/600',
  },
];

export const DealsSection: React.FC = () => {
  return (
    <section id="deals" className="py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          Find Your Next Getaway
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <div key={deal.name} className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer h-96">
              <img src={deal.imageUrl} alt={deal.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{deal.name}</h3>
                <p className="text-lg font-semibold bg-blue-600 px-3 py-1 rounded-full inline-block mt-2">
                  From ${deal.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
