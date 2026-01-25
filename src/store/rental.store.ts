import { create } from 'zustand';

export interface RentalMachine {
  id: string;
  name: string;
  type: string;
  price: string;
  period: string;
  expiry: string;
  status: string;
  visible: boolean;
  expired: boolean;
  image: string;
  category: string;
  brand: string;
  model: string;
  ownerName: string;
  location: string;
  distance: string;
  rating: number;
}

export interface RentalRequest {
  id: string;
  machineId: string;
  machineName: string;
  machineImage: string;
  borrowerName: string;
  requestDate: string;
  startDate: string;
  endDate: string;
  totalPrice: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
  paymentStatus: 'UNPAID' | 'PAID';
}

interface RentalStore {
  rentals: RentalMachine[];
  requests: RentalRequest[];
  draftRental: Partial<RentalMachine> | null;
  addRental: (rental: RentalMachine) => void;
  updateRental: (id: string, updates: Partial<RentalMachine>) => void;
  removeRental: (id: string) => void;
  toggleRentalVisibility: (id: string) => void;
  setDraftRental: (draft: Partial<RentalMachine>) => void;
  clearDraftRental: () => void;
  addRequest: (request: RentalRequest) => void;
  updateRequestStatus: (id: string, status: RentalRequest['status']) => void;
}

export const useRentalStore = create<RentalStore>((set) => ({
  rentals: [
    {
      id: 'rent_mock_1',
      name: 'John Deere 5050D',
      type: 'Tractor',
      category: 'tractor',
      brand: 'John Deere',
      model: '5050D',
      price: '800',
      period: 'hr',
      expiry: '20 Feb 2025',
      status: 'AVAILABLE',
      visible: true,
      expired: false,
      image:
        'https://images.unsplash.com/photo-1595246140625-573b715e11d3?q=80&w=600',
      ownerName: 'Rahul Kumar',
      location: 'Satara',
      distance: '2.5 km',
      rating: 4.8,
    },
    {
      id: 'rent_mock_2',
      name: 'Kubota DC-70G',
      type: 'Harvester',
      category: 'harvester',
      brand: 'Kubota',
      model: 'DC-70G',
      price: '1500',
      period: 'hr',
      expiry: '15 Mar 2025',
      status: 'AVAILABLE',
      visible: true,
      expired: false,
      image:
        'https://images.unsplash.com/photo-1530267981375-f0de93bf3e94?q=80&w=600',
      ownerName: 'Suresh Patil',
      location: 'Wai',
      distance: '5.2 km',
      rating: 4.5,
    },
    {
      id: 'rent_mock_3',
      name: 'Mahindra Thresher',
      type: 'Implement',
      category: 'implement',
      brand: 'Mahindra',
      model: 'M55',
      price: '1200',
      period: 'day',
      expiry: '10 Jan 2025',
      status: 'EXPIRED',
      visible: false,
      expired: true,
      image:
        'https://images.unsplash.com/photo-1563205764-59e2b9631b7e?q=80&w=600',
      ownerName: 'Rahul Kumar',
      location: 'Satara',
      distance: '1.8 km',
      rating: 4.9,
    },
  ],
  requests: [
    {
      id: 'req_1',
      machineId: 'rent_mock_1',
      machineName: 'John Deere 5050D',
      machineImage:
        'https://images.unsplash.com/photo-1595246140625-573b715e11d3?q=80&w=600',
      borrowerName: 'Sopan Phadtare',
      requestDate: '24 Jan 2026',
      startDate: '26 Jan 2026',
      endDate: '28 Jan 2026',
      totalPrice: '2400',
      status: 'PENDING',
      paymentStatus: 'UNPAID',
    },
  ],
  draftRental: null,
  addRental: (rental) =>
    set((state) => ({ rentals: [...state.rentals, rental] })),
  updateRental: (id, updates) =>
    set((state) => ({
      rentals: state.rentals.map((r) =>
        r.id === id ? { ...r, ...updates } : r,
      ),
    })),
  removeRental: (id) =>
    set((state) => ({
      rentals: state.rentals.filter((r) => r.id !== id),
    })),
  toggleRentalVisibility: (id) =>
    set((state) => ({
      rentals: state.rentals.map((r) =>
        r.id === id ? { ...r, visible: !r.visible } : r,
      ),
    })),
  setDraftRental: (draft) =>
    set((state) => ({
      draftRental: { ...state.draftRental, ...draft },
    })),
  clearDraftRental: () => set({ draftRental: null }),
  addRequest: (request) =>
    set((state) => ({ requests: [request, ...state.requests] })),
  updateRequestStatus: (id, status) =>
    set((state) => ({
      requests: state.requests.map((r) => (r.id === id ? { ...r, status } : r)),
    })),
}));
