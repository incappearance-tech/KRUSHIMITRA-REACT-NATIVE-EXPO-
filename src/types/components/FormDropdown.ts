import { Control, FieldValues, Path } from 'react-hook-form';

export interface IFormDropdownProps<
  TForm extends FieldValues,
  TValue extends string,
> {
  control: Control<TForm>;
  name: Path<TForm>;

  label?: string;
  placeholder?: string;

  options: TValue[];
  disabled?: boolean;
  required?: boolean;
}
