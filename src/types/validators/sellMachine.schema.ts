import { z } from 'zod';

export const sellMachineSchema = z.object({
    media: z.array(z.any()),
    category: z.string().min(1, "Category is required"),
    condition: z.string().min(1, "Condition is required"),
    modelYear: z.string().min(1, "Model year is required"),
    price: z.string().min(1, "Price is required"),
    usageType: z.string().min(1, "Usage type is required"),
    location: z.string().min(1, "Location is required"),
});

export type ISellMachineForm = z.infer<typeof sellMachineSchema>;
