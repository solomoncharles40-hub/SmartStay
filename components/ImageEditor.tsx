
import React, { useState, useCallback } from 'react';
import { editImageWithPrompt } from '../services/geminiService';
import { SparklesIcon, UploadIcon } from './icons/Icons';

interface ImageEditorProps {
    initialImageUrl: string;
}

const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
            } else {
                reject(new Error('Failed to convert blob to base64 string'));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

export const ImageEditor: React.FC<ImageEditorProps> = ({ initialImageUrl }) => {
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState(initialImageUrl);
    const [originalImage, setOriginalImage] = useState<{base64: string; mimeType: string} | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const convertUrlToState = useCallback(async (url: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const base64 = await blobToBase64(blob);
            setOriginalImage({ base64, mimeType: blob.type });
        } catch(e) {
            console.error("Failed to fetch and convert image:", e);
            setError("Could not load initial image for editing.");
        }
    }, []);

    useState(() => {
        convertUrlToState(initialImageUrl);
    });
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const url = reader.result as string;
                setImage(url);
                const base64 = url.split(',')[1];
                setOriginalImage({ base64, mimeType: file.type });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!prompt || !originalImage || isLoading) return;

        setIsLoading(true);
        setError('');
        try {
            const result = await editImageWithPrompt(originalImage.base64, originalImage.mimeType, prompt);
            if (result) {
                setImage(`data:${originalImage.mimeType};base64,${result}`);
            } else {
                setError('Failed to edit image. Please try a different prompt.');
            }
        } catch (e) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Have Fun with AI Image Editing!</h3>
            <p className="text-sm text-gray-600 mb-4">Try prompts like "Add a retro filter", "Make it look like a watercolor painting", or "Add a cute dog in the foreground".</p>
            
            <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                <img src={image} alt="Editable hotel" className="w-full h-full object-cover" />
                {isLoading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 mb-4">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter an editing prompt..."
                    className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSubmit}
                    disabled={isLoading || !prompt}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
                >
                    <SparklesIcon className="h-5 w-5" />
                    Generate
                </button>
                 <label className="cursor-pointer px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center gap-2">
                    <UploadIcon className="h-5 w-5" />
                    Upload
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};
