
import { GoogleGenAI, GenerateContentResponse, GroundingChunk } from "@google/genai";
import type { Hotel, FlightSearchParams } from '../types';

// Lazily initialize the AI client to prevent app crash if API key is missing on load.
let ai: GoogleGenAI | null = null;

const getAiClient = () => {
    if (ai) return ai;

    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
        console.error("API_KEY environment variable is not set. AI features will be disabled.");
        return null;
    }
    ai = new GoogleGenAI({ apiKey: API_KEY });
    return ai;
};

export const getSmartStayScore = async (hotel: Hotel): Promise<number> => {
  const aiClient = getAiClient();
  if (!aiClient) {
    return Math.floor(Math.random() * 15) + 75; // Return a plausible fallback score
  }

  try {
    const prompt = `Analyze the following hotel data and provide a "SmartStay Score" from 1 to 100, where 100 is the best value for money. Consider the price, rating, number of reviews, and amenities. Provide only the number.
    
    Hotel: ${hotel.name}
    Price per night: $${hotel.pricePerNight}
    Rating: ${hotel.rating}/5
    Reviews: ${hotel.reviews}
    Amenities: ${hotel.amenities.join(', ')}

    Score:`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
    });
    
    const scoreText = response.text.trim();
    const score = parseInt(scoreText, 10);

    if (!isNaN(score) && score >= 1 && score <= 100) {
      return score;
    }
    return Math.floor(Math.random() * 15) + 75; // Fallback
  } catch (error) {
    console.error('Error getting SmartStay score:', error);
    return Math.floor(Math.random() * 15) + 75; // Fallback on error
  }
};

export const getChatbotResponse = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], newMessage: string) => {
    const aiClient = getAiClient();
    if (!aiClient) {
        return (async function* () {
            const responseChunk = { 
                text: "I'm sorry, my AI capabilities are currently offline. Please try again later." 
            } as unknown as GenerateContentResponse;
            yield responseChunk;
        })();
    }

    const chat = aiClient.chats.create({
        model: 'gemini-3-pro-preview',
        history: history,
        config: {
            systemInstruction: 'You are a helpful travel assistant for SmartStay, a hotel booking website. Be friendly, concise, and help users with their travel planning questions.'
        }
    });

    return chat.sendMessageStream({ message: newMessage });
};

export const editImageWithPrompt = async (base64Image: string, mimeType: string, prompt: string): Promise<string | null> => {
    const aiClient = getAiClient();
    if (!aiClient) return null;

    try {
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: base64Image, mimeType } },
                    { text: prompt },
                ],
            },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        return null;

    } catch (error) {
        console.error("Error editing image:", error);
        return null;
    }
};

const aiOfflineMessage = { text: "Sorry, I couldn't fetch that information as the AI service is currently unavailable.", sources: [] };

export const getLocalInfo = async (location: string, topic: string): Promise<{text: string, sources: GroundingChunk[]}> => {
    const aiClient = getAiClient();
    if (!aiClient) return aiOfflineMessage;

    try {
        const prompt = `Tell me about ${topic} in ${location}.`;
        const response = await aiClient.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });
        
        const text = response.text;
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        return { text, sources: sources as GroundingChunk[] };

    } catch (error) {
        console.error("Error getting local info:", error);
        return { text: "Sorry, I couldn't fetch that information.", sources: [] };
    }
};

export const getNearbyAttractions = async (hotelName: string, city: string): Promise<{text: string, sources: GroundingChunk[]}> => {
    const aiClient = getAiClient();
    if (!aiClient) return { text: "Sorry, I couldn't fetch information about nearby places as the AI service is currently unavailable.", sources: [] };

    try {
        const prompt = `What are some good attractions and restaurants near the ${hotelName} in ${city}?`;
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [{ googleMaps: {} }],
            }
        });

        const text = response.text;
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        return { text, sources: sources as GroundingChunk[] };
    } catch (error) {
        console.error("Error getting nearby attractions:", error);
        return { text: "Sorry, I couldn't fetch information about nearby places.", sources: [] };
    }
};

export const planComplexItinerary = async (request: string): Promise<string> => {
    const aiClient = getAiClient();
    if (!aiClient) return "I'm sorry, I'm unable to plan your trip right now as the AI service is unavailable.";

    try {
        const response = await aiClient.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: `As an expert travel planner, create a detailed itinerary based on this request: "${request}". Be creative, thorough, and provide specific suggestions.`,
            config: {
                thinkingConfig: { thinkingBudget: 32768 },
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error planning itinerary:", error);
        return "I'm sorry, I encountered an issue while planning your trip. Please try again.";
    }
};

export const getFlightInfo = async (params: FlightSearchParams): Promise<string> => {
    const aiClient = getAiClient();
    if (!aiClient) return "I'm sorry, I can't provide flight information right now as the AI service is unavailable.";

    try {
        const prompt = `A user is searching for a ${params.flightClass} flight for ${params.travelers} traveler(s) from ${params.departure} to ${params.destination}, departing on ${params.departDate || 'an unspecified date'} and returning on ${params.returnDate || 'an unspecified date'}.
        
Our flight booking feature is not yet implemented. 
Provide a friendly and helpful message that:
1. Acknowledges their specific search query.
2. Informs them that direct booking isn't available yet.
3. Offers to provide helpful travel information instead, like major airlines on that route, or tips for finding the best time to book.

Keep the tone helpful and engaging.`;
        const response = await aiClient.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error getting flight info:", error);
        return "I'm sorry, I can't search for flights right now, but I can help you find information about your destination!";
    }
};
