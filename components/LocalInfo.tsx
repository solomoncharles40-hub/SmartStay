
import React, { useState } from 'react';
import { getLocalInfo } from '../services/geminiService';
import type { GroundingChunk } from '../types';
import { SearchIcon, LinkIcon } from './icons/Icons';

interface LocalInfoProps {
    location: string;
}

export const LocalInfo: React.FC<LocalInfoProps> = ({ location }) => {
    const [topic, setTopic] = useState('popular events and festivals');
    const [info, setInfo] = useState<{ text: string; sources: GroundingChunk[] } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFetchInfo = async () => {
        if (!topic || isLoading) return;
        setIsLoading(true);
        setInfo(null);
        try {
            const result = await getLocalInfo(location, topic);
            setInfo(result);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Discover {location}</h3>
            <p className="text-gray-600 mb-4">Get up-to-date information powered by Google Search.</p>
            
            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., best restaurants, local holidays..."
                />
                <button
                    onClick={handleFetchInfo}
                    disabled={isLoading || !topic}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
                >
                    <SearchIcon className="h-5 w-5" />
                    Search
                </button>
            </div>

            {isLoading && (
                <div className="mt-6 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Searching for the latest info...</p>
                </div>
            )}

            {info && (
                <div className="mt-6">
                    <div className="prose max-w-none mb-4">
                        <React.Fragment>
                            {info.text.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                            ))}
                        </React.Fragment>
                    </div>
                    {info.sources.length > 0 && (
                        <div>
                            <h4 className="font-bold text-gray-700">Sources:</h4>
                            <ul className="list-disc list-inside text-sm">
                                {info.sources.map((source, index) => source.web && (
                                    <li key={index}>
                                        <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                                            <LinkIcon className="h-4 w-4" />
                                            {source.web.title || source.web.uri}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
