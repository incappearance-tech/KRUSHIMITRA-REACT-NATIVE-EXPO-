import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FarmerProfileForm, farmerProfileSchema } from '@/src/validators/farmerProfile.schema';


export const useFarmerProfileForm = () => {
  return useForm<FarmerProfileForm>({
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
