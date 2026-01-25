import { MaterialIcons } from '@expo/vector-icons';

export interface IRuleItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  desc: string;
  color: string;
  bg: string;
}
