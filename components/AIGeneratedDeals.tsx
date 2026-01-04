
import React, { useState, useEffect } from 'react';
import { generateAIDeals } from '../services/geminiService';
import type { SearchParams, AIDeal } from '../types';
import { SparklesIcon } from './icons/Icons';

interface AIGeneratedDealsProps {
    searchParams: SearchParams;
    onBookDeal: (deal: AIDeal, searchParams: SearchParams, imageUrl: string) => void;
}

const DealCard: React.FC<{ deal: AIDeal; index: number; onBook: () => void; }> = ({ deal, index, onBook }) => {
    const imageUrl = `https://picsum.photos/seed/${deal.hotelName.replace(/\s/g, '')}${index}/800/600`;
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-2xl dark:hover:shadow-blue-900/50 transition-shadow duration-300">
            <div className="relative">
                <img src={imageUrl} alt={deal.hotelName} className="w-full h-56 object-cover" />
                <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <SparklesIcon className="h-4 w-4" />
                    AI Special Offer
                </div>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{deal.hotelName}</h3>
                    <p className="mt-2 text-sm italic text-blue-600 dark:text-blue-400 font-medium">"{deal.dealHighlight}"</p>
                    <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm leading-relaxed">{deal.description}</p>
                </div>
                <div className="mt-6 flex justify-between items-center">
                    <div>
                        <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">${deal.price}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400"> / total</span>
                    </div>
                    <button onClick={onBook} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Book This Deal
                    </button>
                </div>
            </div>
        </div>
    );
};


const SkeletonCard: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
        <div className="w-full h-56 bg-gray-300 dark:bg-gray-700"></div>
        <div className="p-6">
            <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="mt-3 h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="mt-6 flex justify-between items-center">
                <div className="h-8 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-10 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>
        </div>
    </div>
);


export const AIGeneratedDeals: React.FC<AIGeneratedDealsProps> = ({ searchParams, onBookDeal }) => {
    const [deals, setDeals] = useState<AIDeal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDeals = async () => {
            setIsLoading(true);
            setError('');
            try {
                const results = await generateAIDeals(searchParams);
                if (results.length === 0) {
                   setError("Sorry, the AI couldn't generate deals for this search. Try being more specific!");
                }
                setDeals(results);
            } catch (err) {
                setError('An error occurred while generating deals.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDeals();
    }, [searchParams]);

    const handleBook = (deal: AIDeal, index: number) => {
        const imageUrl = `https://picsum.photos/seed/${deal.hotelName.replace(/\s/g, '')}${index}/800/600`;
        onBookDeal(deal, searchParams, imageUrl);
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-blue-100 dark:border-blue-900/50">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                <SparklesIcon className="h-6 w-6 text-blue-500" />
                Exclusive AI-Generated Deals for {searchParams.location}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our AI has crafted these unique, fictional packages just for you. Get inspired for your next trip!
            </p>

            {isLoading && (
                 <div className="grid grid-cols-1 gap-6">
                    {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            )}
            
            {!isLoading && error && (
                <div className="text-center py-10">
                    <p className="text-red-500">{error}</p>
                </div>
            )}

            {!isLoading && !error && deals.length > 0 && (
                <div className="grid grid-cols-1 gap-6">
                    {deals.map((deal, index) => (
                        <DealCard key={index} deal={deal} index={index} onBook={() => handleBook(deal, index)} />
                    ))}
                </div>
            )}
        </div>
    );
};
