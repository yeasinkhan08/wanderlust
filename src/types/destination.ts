export interface Destination {
  _id?: string;
  id?: string;
  destinationName: string;
  country: string;
  category?: string;
  price: string | number;
  duration: string;
  departureDate?: string;
  imageUrl: string;
  description?: string;
  rating?: number | string;
}
