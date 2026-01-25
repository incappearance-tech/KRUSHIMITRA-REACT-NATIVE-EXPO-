import { MaterialIcons } from '@expo/vector-icons';

import { z } from 'zod';

export const machineSchema = z
  .object({
    category: z.string().min(1, 'Category is required'),
    subCategory: z.string().min(1, 'Sub-category is required'),

    brand: z.string().min(2, 'Brand is required'),
    model: z.string().min(1, 'Model is required'),

    year: z.string().min(1, 'Year is required'),

    serialNo: z
      .string()
      .min(4, 'Enter last 4 digits')
      .max(4, 'Enter last 4 digits'),

    condition: z.string().min(1, 'Condition is required'),

    sellingReason: z.string().min(1, 'Selling reason is required'),

    usageLevel: z.enum(['light', 'medium', 'heavy']),
    askingPrice: z.string().min(1, 'Asking price is required'),
    isNegotiable: z.boolean(),
    hasRepair: z.boolean(),
    repairDetails: z.string().optional(),

    availability: z.object({
      key: z.string(),
    }),

    ownershipConfirmed: z.boolean().refine((val) => val === true, {
      message: 'You must confirm ownership',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.hasRepair && !data.repairDetails) {
      ctx.addIssue({
        path: ['repairDetails'],
        message: 'Repair details are required',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export interface IAvailabilityOption {
  key: string;
  type?: string;
  label?: string;
}

export interface ISectionHeaderProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
}
