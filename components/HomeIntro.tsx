
import React from 'react';
import { SparklesIcon } from './icons/Icons';

const features = [
  {
    icon: SparklesIcon,
    title: 'Smarter Deal Finding',
    description: 'Our AI analyzes thousands of data points to find you the best hotel deals, ensuring you get maximum value for your money with our unique SmartStay Score.',
    iconColor: 'text-blue-500',
  },
];


export const HomeIntro: React.FC = () => {
    return (
        <section id="features" className="py-16 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-200">Travel Smarter, Not Harder</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        SmartStay is infused with cutting-edge AI to make your travel planning seamless, insightful, and more affordable.
                    </p>
                </div>
                <div className="flex justify-center">
                    {features.map((feature, index) => (
                         <div key={index} className="p-8 bg-white dark:bg-gray-800 rounded-lg text-center transform hover:scale-105 transition-transform duration-300 max-w-md shadow-lg">
                            <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.iconColor}`} />
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
