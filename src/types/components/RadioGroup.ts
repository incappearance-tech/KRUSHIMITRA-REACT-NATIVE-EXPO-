export interface IRadioOption<T extends string> {
    label: string;
    value: T;
}

export interface IRadioGroupProps<T extends string> {
    label?: string;
    value?: T;
    options: IRadioOption<T>[];
    onChange: (value: T) => void;
}
