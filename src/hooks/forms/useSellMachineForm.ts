import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ISellMachineForm, sellMachineSchema } from '../../types/validators/sellMachine.schema';


export const useSellMachineForm = () => {
  return useForm<ISellMachineForm>({
    resolver: zodResolver(sellMachineSchema),
    mode: 'onSubmit',
    defaultValues: {
      media: [],
      category: '',
      condition: 'Good',
      modelYear: '',
      price: '',
      usageType: 'Personal',
      location: '',
    },
  });
};
