
export interface Hotel {
  id: number;
  name: string;
  city: string;
  country: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  amenities: string[];
  imageUrl: string;
  description: string;
  maxGuests: number;
  smartStayScore?: number;
}

export interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: {
        reviewSnippets: {
            uri: string;
            text: string;
            reviewer: string;
        }[]
    }[]
  };
}

export interface BookingDetails {
  hotel: Hotel;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalPrice: number;
}
