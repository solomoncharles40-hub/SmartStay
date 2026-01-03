
import React, { useState } from 'react';
import { planComplexItinerary } from '../services/geminiService';
import type { SearchParams } from '../types';
import { SparklesIcon } from './icons/Icons';

interface AITripPlannerProps {
    searchParams: SearchParams;
}

export const AITripPlanner: React.FC<AITripPlannerProps> = ({ searchParams }) => {
    const defaultPrompt = `Plan a 5-day trip to ${searchParams.location} for a couple interested in history and good food. My check-in is around ${searchParams.checkIn || 'anytime'}. I want a mix of popular attractions and hidden gems.`;
    const [request, setRequest] = useState(defaultPrompt);
    const [itinerary, setItinerary] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePlanTrip = async () => {
        if (!request || isLoading) return;
        setIsLoading(true);
        setItinerary('');
        try {
            const result = await planComplexItinerary(request);
            setItinerary(result);
        } catch (error) {
            setItinerary('Sorry, I was unable to create an itinerary. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <SparklesIcon className="h-6 w-6 text-blue-500" />
                AI-Powered Itinerary Planner
            </h3>
            <p className="text-gray-600 mb-4">Let our most powerful AI create a detailed, personalized trip plan for you. The more detail you provide, the better the result!</p>
            
            <textarea
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                placeholder="e.g., Plan a 7-day family trip to Paris with two kids (8 and 12)..."
            />
            <button
                onClick={handlePlanTrip}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
                {isLoading ? 'Thinking...' : 'Plan My Trip'}
            </button>

            {isLoading && (
                <div className="mt-6 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Our AI is crafting your perfect trip. This may take a moment...</p>
                </div>
            )}

            {itinerary && (
                <div className="mt-6 prose max-w-none">
                     <React.Fragment>
                        {itinerary.split('\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                        ))}
                    </React.Fragment>
                </div>
            )}
        </div>
    );
};
