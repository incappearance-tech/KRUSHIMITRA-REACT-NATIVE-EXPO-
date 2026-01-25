import { z } from 'zod';

export const farmerProfileSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  farmerId: z.string().min(1, 'Farmer ID is required'),
  district: z.string().min(1, 'District is required'),
  taluka: z.string().min(1, 'Taluka is required'),
  village: z.string().min(1, 'Village is required'),
  pinCode: z.string().regex(/^[0-9]{6}$/, 'Invalid pin code'),
});

export type IFarmerProfileForm = z.infer<typeof farmerProfileSchema>;
