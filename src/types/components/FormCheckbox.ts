import { Control, FieldValues, Path } from 'react-hook-form';

export interface IFormCheckboxProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    disabled?: boolean;
}
