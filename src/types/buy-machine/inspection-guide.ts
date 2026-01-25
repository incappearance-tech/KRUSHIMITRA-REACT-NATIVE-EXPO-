import { MaterialIcons } from '@expo/vector-icons';

export interface IInspectionItem {
  id: number;
  title: string;
  desc: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}
