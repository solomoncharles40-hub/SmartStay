
import React, { memo } from 'react';

interface PopularDestination {
  name: string;
  price: number;
  imageUrl: string;
}

const destinations: PopularDestination[] = [
  { name: 'Turkey', price: 479, imageUrl: 'https://picsum.photos/seed/istanbul-turkey/800/600' },
  { name: 'Spain', price: 419, imageUrl: 'https://picsum.photos/seed/barcelona-spain/800/600' },
  { name: 'Egypt', price: 580, imageUrl: 'https://picsum.photos/seed/giza-pyramids/800/600' },
  { name: 'Manila', price: 399, imageUrl: 'https://picsum.photos/seed/manila-philippines/800/600' },
  { name: 'Rome', price: 499, imageUrl: 'https://picsum.photos/seed/rome-italy/800/600' },
  { name: 'Barbados', price: 620, imageUrl: 'https://picsum.photos/seed/barbados-beach/800/600' },
  { name: 'Saint Lucia', price: 529, imageUrl: 'https://picsum.photos/seed/st-lucia/800/600' },
  { name: 'Italy', price: 510, imageUrl: 'https://picsum.photos/seed/amalfi-coast/800/600' },
  { name: 'Greece', price: 549, imageUrl: 'https://picsum.photos/seed/santorini-greece/800/600' },
  { name: 'France', price: 500, imageUrl: 'https://picsum.photos/seed/paris-france/800/600' },
];

interface TravelpayoutsWidgetProps {
    onDealClick: (location: string) => void;
}

const TravelpayoutsWidgetComponent: React.FC<TravelpayoutsWidgetProps> = ({ onDealClick }) => {
    return (
        <section id="popular-destinations" className="py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
                    Popular Destinations
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {destinations.map((deal) => (
                        <div 
                            key={deal.name} 
                            onClick={() => onDealClick(deal.name)}
                            className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer h-80"
                        >
                            <img src={deal.imageUrl} alt={deal.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4 text-white">
                                <h3 className="text-xl font-bold">{deal.name}</h3>
                                <p className="text-md font-semibold bg-blue-600 px-3 py-1 rounded-full inline-block mt-2">
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

export const TravelpayoutsWidget = memo(TravelpayoutsWidgetComponent);