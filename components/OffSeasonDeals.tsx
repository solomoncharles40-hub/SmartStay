
import React from 'react';

const deals = [
  {
    name: 'Venice, Italy',
    originalPrice: 250,
    discountedPrice: 149,
    imageUrl: 'https://picsum.photos/seed/venice-winter/800/600',
    season: 'Winter Deal'
  },
  {
    name: 'Aspen, Colorado',
    originalPrice: 450,
    discountedPrice: 229,
    imageUrl: 'https://picsum.photos/seed/aspen-summer/800/600',
    season: 'Summer Steal'
  },
  {
    name: 'Santorini, Greece',
    originalPrice: 380,
    discountedPrice: 219,
    imageUrl: 'https://picsum.photos/seed/santorini-quiet/800/600',
    season: 'Spring/Fall Special'
  },
  {
    name: 'Queenstown, NZ',
    originalPrice: 320,
    discountedPrice: 199,
    imageUrl: 'https://picsum.photos/seed/queenstown-spring/800/600',
    season: 'Shoulder Season'
  },
];

interface OffSeasonDealsProps {
    onDealClick: (location: string) => void;
}

export const OffSeasonDeals: React.FC<OffSeasonDealsProps> = ({ onDealClick }) => {
  return (
    <section id="off-season-deals" className="py-12 bg-white dark:bg-gray-800 rounded-lg">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
          Exclusive Off-Season Deals
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Travel to iconic destinations during their quiet season and enjoy fewer crowds with unbeatable prices.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => {
            const savings = Math.round(((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100);
            return (
              <div 
                  key={deal.name} 
                  onClick={() => onDealClick(deal.name)}
                  className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer h-96"
              >
                <img src={deal.imageUrl} alt={deal.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-0 right-0 m-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  SAVE {savings}%
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <span className="text-sm font-semibold bg-green-600 px-2 py-1 rounded-full">{deal.season}</span>
                  <h3 className="text-2xl font-bold mt-2">{deal.name}</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-2xl font-bold text-yellow-300">
                      ${deal.discountedPrice}
                    </p>
                     <p className="text-md font-semibold text-gray-300 line-through">
                      ${deal.originalPrice}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
