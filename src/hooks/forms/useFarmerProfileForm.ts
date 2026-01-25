import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  IFarmerProfileForm,
  farmerProfileSchema,
} from '../../types/validators/farmerProfile.schema';

export const useFarmerProfileForm = () => {
  return useForm<IFarmerProfileForm>({
    resolver: zodResolver(farmerProfileSchema),
    mode: 'onSubmit',
    defaultValues: {
      fullName: '',
      farmerId: '',
      district: '',
      taluka: '',
      village: '',
    },
  });
};
