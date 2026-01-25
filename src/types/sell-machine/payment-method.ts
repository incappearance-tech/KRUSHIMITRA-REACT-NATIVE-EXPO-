import { MaterialIcons } from '@expo/vector-icons';

export type PaymentMethod = 'upi' | 'card' | 'netbanking';

export interface IPaymentOptionProps {
  id: PaymentMethod;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle: string;
  selected: PaymentMethod;
  onSelect: (id: PaymentMethod) => void;
}
