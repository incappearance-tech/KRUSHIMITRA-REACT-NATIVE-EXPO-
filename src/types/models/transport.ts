export interface ITransporter {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  vehicleType: string;
  location: string;
  distance: string;
  image: string;
  verified: boolean;
  capacity: string;
  pricePerKm: number;
  availability: 'Available' | 'Busy' | 'Offline';
  vehicles: {
    type: string;
    capacity: string;
    count: number;
  }[];
  completedTrips: number;
  experience: string;
  phone: string;
}
