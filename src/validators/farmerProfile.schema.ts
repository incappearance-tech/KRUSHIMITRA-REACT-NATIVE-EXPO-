import { z } from 'zod';

export const farmerProfileSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  farmerId: z.string().min(5, 'Farmer ID is required'),
  district: z.string().min(1, 'Select district'),
  taluka: z.string().min(1, 'Select taluka'),
  village: z.string().min(2, 'Village is required'),
  pinCode: z
    .string()
    .regex(/^[1-9][0-9]{5}$/, 'Enter valid 6-digit pin code'),
});

export type FarmerProfileForm = z.infer<typeof farmerProfileSchema>;
