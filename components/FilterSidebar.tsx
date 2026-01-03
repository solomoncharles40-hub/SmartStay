
import React, { useState, useEffect } from 'react';

const allAmenities = ['Pool', 'Gym', 'WiFi', 'Parking', 'Restaurant', 'Spa', 'Pet Friendly'];

interface FilterSidebarProps {
  onFilterChange: (filters: { price: number; rating: number; amenities: string[] }) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const [price, setPrice] = useState(500);
  const [rating, setRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  useEffect(() => {
    onFilterChange({ price, rating, amenities: selectedAmenities });
  }, [price, rating, selectedAmenities, onFilterChange]);

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
      <h3 className="text-xl font-bold mb-4">Filter By</h3>
      
      <div className="mb-6">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Max Price: <span className="font-bold text-blue-600">${price}</span></label>
        <input
          id="price"
          type="range"
          min="50"
          max="500"
          step="10"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Rating (at least)</label>
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${rating >= star ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              {star}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Amenities</h4>
        <div className="space-y-2">
          {allAmenities.map(amenity => (
            <div key={amenity} className="flex items-center">
              <input
                id={amenity}
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={amenity} className="ml-2 text-sm text-gray-600">{amenity}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
