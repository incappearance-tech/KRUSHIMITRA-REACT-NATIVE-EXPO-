import { MaterialIcons } from '@expo/vector-icons';

export interface ISafetyItemProps {
    icon: keyof typeof MaterialIcons.glyphMap;
    color: string;
    text: string;
}
