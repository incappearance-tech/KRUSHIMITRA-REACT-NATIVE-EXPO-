import { z } from 'zod';

export const sellMachineSchema = z.object({
  media: z
    .array(
      z.object({
        uri: z.string().min(1),
        type: z.string().optional(),
      })
    )
    .min(1, 'At least one photo or video is required')
    .max(5, 'Maximum 5 photos/videos allowed'),

  category: z
    .string()
    .min(1, 'Category is required'),

  condition: z
    .enum(['Fair', 'Good', 'Excellent'], {
      errorMap: () => ({ message: 'Condition is required' }),
    }),

  modelYear: z
    .string()
    .regex(/^(19|20)\d{2}$/, 'Enter valid year'),

  price: z
    .string()
    .regex(/^[1-9][0-9]*$/, 'Enter valid price'),

  usageType: z
    .enum(['Personal', 'Commercial'], {
      errorMap: () => ({ message: 'Usage type is required' }),
    }),

  location: z
    .string()
    .min(3, 'Location is required'),
});

export type SellMachineForm = z.infer<typeof sellMachineSchema>;
