import { ViewStyle } from 'react-native';

export interface IAppBarProps {
    title: string;
    onBackPress?: () => void;
    style?: ViewStyle;
}
