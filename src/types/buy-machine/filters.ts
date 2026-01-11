import { MaterialIcons } from '@expo/vector-icons';

export interface ICategory {
    id: string;
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
}

export interface ICondition {
    id: string;
    label: string;
    subLabel: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    colorBg: string;
    colorText: string;
}

export interface ISectionTitleProps {
    title: string;
}

export interface ICategoryPillsProps {
    selected: string;
    onSelect: (id: string) => void;
}

export interface IDistanceSliderProps {
    value: number;
    onValueChange: (val: number) => void;
}

export interface IPriceRangeProps {
    min: string;
    max: string;
    setMin: (val: string) => void;
    setMax: (val: string) => void;
}

export interface IConditionListProps {
    selected: string;
    onSelect: (id: string) => void;
}
