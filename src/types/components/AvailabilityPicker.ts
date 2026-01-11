export type IAvailabilityOption =
    | {
        type: 'static';
        key: string;
        label: string;
    }
    | {
        type: 'date';
        key: string;
        label: string;
    };

export type IAvailabilityValue =
    | { key: string }
    | { key: string; date: Date };

export interface IAvailabilityPickerProps {
    label?: string;
    options: IAvailabilityOption[];
    value?: IAvailabilityValue;
    onChange: (value: IAvailabilityValue) => void;
}
