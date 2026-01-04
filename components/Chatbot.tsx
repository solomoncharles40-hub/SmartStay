
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import { ChatBubbleIcon, PaperAirplaneIcon, CloseIcon, SparklesIcon } from './icons/Icons';
import { GenerateContentResponse } from '@google/genai';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! How can I help you plan your travel today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));
    
    // Add an empty placeholder for the model's response
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
      const stream = await getChatbotResponse(history, input);

      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        const chunkText = c.text;
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage.role === 'model') {
            lastMessage.text += chunkText;
          }
          return [...prev];
        });
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, something went wrong.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-transform transform hover:scale-110 focus:outline-none z-50"
      >
        {isOpen ? <CloseIcon className="h-8 w-8" /> : <ChatBubbleIcon className="h-8 w-8" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md h-[60vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl flex flex-col z-50 animate-fade-in-up">
          <div className="p-4 bg-blue-600 text-white rounded-t-xl flex justify-between items-center">
            <h3 className="font-bold text-lg flex items-center gap-2"><SparklesIcon className="h-5 w-5" /> SmartStay Assistant</h3>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            {messages.map((msg, index) => (
              <div key={index} className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-2xl px-4 py-2 max-w-xs ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>
                    {msg.text || <span className="inline-block w-2 h-4 bg-gray-500 dark:bg-gray-400 animate-pulse"></span>}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about destinations..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                disabled={isLoading}
              />
              <button onClick={handleSend} disabled={isLoading} className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-blue-300 transition-colors">
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
