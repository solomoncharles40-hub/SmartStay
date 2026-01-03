
import React, { useState, useEffect } from 'react';
import { getNearbyAttractions } from '../services/geminiService';
import type { GroundingChunk } from '../types';
import { LinkIcon, MapPinIcon } from './icons/Icons';

interface NearbyAttractionsProps {
    hotelName: string;
    city: string;
}

export const NearbyAttractions: React.FC<NearbyAttractionsProps> = ({ hotelName, city }) => {
    const [attractions, setAttractions] = useState<{ text: string; sources: GroundingChunk[] } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAttractions = async () => {
            setIsLoading(true);
            const result = await getNearbyAttractions(hotelName, city);
            setAttractions(result);
            setIsLoading(false);
        };
        fetchAttractions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hotelName, city]);

    if (isLoading) {
        return (
            <div className="mt-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-600 mt-2">Finding nearby places...</p>
            </div>
        );
    }
    
    if (!attractions) {
        return <p>Could not load nearby attractions.</p>
    }

    return (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><MapPinIcon className="h-6 w-6 text-blue-500" /> What's Nearby?</h3>
             <div className="prose max-w-none mb-4">
                <React.Fragment>
                    {attractions.text.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                    ))}
                </React.Fragment>
            </div>
            {attractions.sources.length > 0 && (
                <div>
                    <h4 className="font-bold text-gray-700">Places on Google Maps:</h4>
                    <ul className="list-disc list-inside text-sm">
                        {attractions.sources.map((source, index) => source.maps && (
                            <li key={index}>
                                <a href={source.maps.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                                    <LinkIcon className="h-4 w-4" />
                                    {source.maps.title || 'View on Map'}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
