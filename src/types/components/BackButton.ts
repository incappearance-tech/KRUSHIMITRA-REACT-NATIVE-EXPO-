import { ViewStyle } from 'react-native';

export interface IBackButtonProps {
    onPress?: () => void;
    size?: number;
    iconSize?: number;
    color?: string;
    style?: ViewStyle;
}
