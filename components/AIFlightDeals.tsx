
import React, { useState, useEffect } from 'react';
import { generateAIFlightDeals } from '../services/geminiService';
import type { FlightSearchParams, AIFlightDeal } from '../types';
import { SparklesIcon, PaperAirplaneIcon, ClockIcon, ArrowRightIcon } from './icons/Icons';

interface AIFlightDealsProps {
    flightParams: FlightSearchParams;
    onBookDeal: (deal: AIFlightDeal) => void;
}

const FlightDealCard: React.FC<{ deal: AIFlightDeal, onBook: () => void }> = ({ deal, onBook }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-blue-900/40 transition-shadow duration-300">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            <PaperAirplaneIcon className="h-5 w-5" /> {deal.airline}
                        </p>
                        <p className="mt-1 text-xs italic text-blue-600 dark:text-blue-400 font-medium">"{deal.dealHighlight}"</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">${deal.price}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">round trip</p>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                        <ClockIcon className="h-5 w-5" />
                        <span>{deal.flightDuration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <ArrowRightIcon className="h-5 w-5" />
                         <span>{deal.stops} stop{deal.stops !== 1 && 's'}</span>
                    </div>
                     <button onClick={onBook} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Book Deal
                    </button>
                </div>
            </div>
        </div>
    );
};

const SkeletonCard: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="p-5">
            <div className="flex justify-between items-start">
                <div>
                    <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="mt-2 h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="text-right">
                    <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="mt-1 h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
             <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-9 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>
        </div>
    </div>
);

export const AIFlightDeals: React.FC<AIFlightDealsProps> = ({ flightParams, onBookDeal }) => {
    const [deals, setDeals] = useState<AIFlightDeal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDeals = async () => {
            setIsLoading(true);
            setError('');
            try {
                const results = await generateAIFlightDeals(flightParams);
                if (results.length === 0) {
                   setError("Sorry, the AI couldn't generate flight deals for this search. Try different airports!");
                }
                setDeals(results);
            } catch (err) {
                setError('An error occurred while generating flight deals.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDeals();
    }, [flightParams]);
    
    return (
        <div className="bg-blue-50 dark:bg-gray-900/50 p-4 sm:p-6 rounded-lg border border-blue-200 dark:border-blue-800">
             <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                <SparklesIcon className="h-6 w-6 text-blue-500" />
                AI-Generated Flight Ideas
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
                Here are some fictional deals crafted by our AI to inspire your trip from {flightParams.departure} to {flightParams.destination}.
            </p>

            {isLoading && (
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            )}
            
            {!isLoading && error && (
                <div className="text-center py-10">
                    <p className="text-red-500">{error}</p>
                </div>
            )}
            
            {!isLoading && !error && deals.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {deals.map((deal, index) => (
                        <FlightDealCard key={index} deal={deal} onBook={() => onBookDeal(deal)} />
                    ))}
                </div>
            )}
        </div>
    );
};
