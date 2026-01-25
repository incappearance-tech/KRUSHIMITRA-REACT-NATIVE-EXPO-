import { Control, FieldValues, Path } from 'react-hook-form';

export interface IFormSwitchProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
}
