import { ITransporter } from '@/src/types/models/transport';

export type Transporter = ITransporter;

export const TRANSPORTERS: Transporter[] = [
  {
    id: '1',
    name: 'Ramesh Transport',
    rating: 4.8,
    reviews: 45,
    vehicleType: 'Tractor Trolley',
    location: 'Rampur',
    distance: '3km',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdtbS_uvvRIPfkAPYsl7xYrbH0IpXVSbUO1I3BktIYTSKAh8fz-F71mFhwlwZXT9Y9ERSEcwbcYL-clZYBVAOAD2fOSIIAeHbdDJ3f_13eQ_t3vhp20lk27OB3-CJ_XueC0W5Kv6FLpUWP_pbfRL6UzX4htFygc6hiG9nyVySPasYaofS7wcikpdkIBbgWjBfytu6MT96DND1onCXYVh9bJ0L_bD70WzcmtMUzE2KKABsmG19F93cZlDUWdY8OvPltgZIdU4j2KULg',
    verified: true,
    capacity: '5 tons',
    pricePerKm: 25,
    availability: 'Available',
    vehicles: [
      { type: 'Tractor Trolley', capacity: '5 tons', count: 2 },
      { type: 'Pickup Truck', capacity: '2 tons', count: 1 },
    ],
    completedTrips: 234,
    experience: '8 years',
    phone: '+91 9876543210',
  },
  {
    id: '2',
    name: 'Singh Logistics',
    rating: 4.6,
    reviews: 32,
    vehicleType: 'Mini Truck',
    location: 'Rampur',
    distance: '5km',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuApk84aWbcNLQBrZThLO99rZMJAhkWYYqTL4pr5wXSvyE93YkQmg5H-Ibji2CLdU3Y6slnWMLI4qIKI0aJM5nw-vbrEfjcu7DISWgsjyZ3RTJuCDVH3XgQxzaUpK5Ic_OIMg7zagsXedrfEJgUvfFoVKU1Qkjkfo7gXpJzAB1_UymIsYIwbE_2sgs6Hqx6KaiAL3FUPVoU_jrM8_fRNTna0Vu9lVT9vRq-VloZckNSl9mzGdU21JLjSopr13OSIGdimmAVBSHnnfol3',
    verified: true,
    capacity: '3 tons',
    pricePerKm: 30,
    availability: 'Available',
    vehicles: [{ type: 'Mini Truck', capacity: '3 tons', count: 3 }],
    completedTrips: 187,
    experience: '5 years',
    phone: '+91 9876543211',
  },
  {
    id: '3',
    name: 'Patel Carriers',
    rating: 4.9,
    reviews: 68,
    vehicleType: 'Large Truck',
    location: 'Rampur',
    distance: '7km',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBMy19G-xnQHR98-uu3X-fJmN4JeIyerRi8Jo0Un-8tEy6dD8hEy9F1oTiZjhqttP2gyEXbMAnXUMt9Pz_1UIOENrz_iIJ-AWX2Te1MBmDNTX-xyO5SVeApXokp-vR9NkgPhTATf9NBcXPJGgIW_AQNESTRQ3ANvDt7VSKojeUm7xjDFBZ1VNKQTsir97jOjB4SlTBicV-ynxfAPrpn6XSlJQAhrqqQcw6O2QYZaMVypVOOhTfqfwmiBbOa9Ns2pcR4mhJnJXC-sz01',
    verified: true,
    capacity: '10 tons',
    pricePerKm: 45,
    availability: 'Busy',
    vehicles: [
      { type: 'Large Truck', capacity: '10 tons', count: 2 },
      { type: 'Tractor Trolley', capacity: '5 tons', count: 1 },
    ],
    completedTrips: 456,
    experience: '12 years',
    phone: '+91 9876543212',
  },
  {
    id: '4',
    name: 'Kumar Transport Service',
    rating: 4.3,
    reviews: 18,
    vehicleType: 'Pickup Van',
    location: 'Rampur',
    distance: '4km',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAbfbohGeqsrCVcBkGcOS0qQ7-CPmcpW537fUQtha8JSYREncudAUn4ICKVhpalq7LsNTchNqD1boGugDxP8IGMTIL_Ro-fg0A_Y0eeovNaFTA_LdYqoN0IpsfttGs1ZRKsfbqvhtdrZJ5wNgADLJC-Yy4nljKfuU-c7-9SzUOK7u8GX1VE4Qb1t9VXTPJhzv6cyLde0DhqnCT6Ew_AoyaWjCu8q-o4EPW2bv0adhAZ8oTFUmcJyWiiDL0ep3-8-Sw4OH3iTsOzJ2iv',
    verified: false,
    capacity: '1.5 tons',
    pricePerKm: 20,
    availability: 'Available',
    vehicles: [{ type: 'Pickup Van', capacity: '1.5 tons', count: 2 }],
    completedTrips: 89,
    experience: '3 years',
    phone: '+91 9876543213',
  },
];

export const VEHICLE_TYPES = [
  'All',
  'Tractor Trolley',
  'Mini Truck',
  'Large Truck',
  'Pickup Van',
  'Pickup Truck',
];
