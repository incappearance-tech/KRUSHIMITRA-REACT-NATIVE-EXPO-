import { MaterialIcons } from '@expo/vector-icons';

export type IButtonType = 'primary' | 'secondary' | 'danger';

export interface IButtonProps {
    label: string;
    onPress: () => void;

    type?: IButtonType;
    icon?: keyof typeof MaterialIcons.glyphMap;

    loading?: boolean;
    disabled?: boolean;

    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;

    sticky?: boolean;
    style?: any;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}
