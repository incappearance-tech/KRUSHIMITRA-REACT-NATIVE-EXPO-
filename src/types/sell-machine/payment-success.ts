import { MaterialIcons } from '@expo/vector-icons';

export interface IDetailRowProps {
    label: string;
    value: string;
    mono?: boolean;
    icon?: keyof typeof MaterialIcons.glyphMap;
}

export interface IBadgeProps {
    icon: keyof typeof MaterialIcons.glyphMap;
    text: string;
    bg: string;
    color: string;
}
