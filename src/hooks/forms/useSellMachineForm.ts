import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SellMachineForm, sellMachineSchema } from '@/src/validators/sellMachine.schema';


export const useSellMachineForm = () => {
  return useForm<SellMachineForm>({
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
