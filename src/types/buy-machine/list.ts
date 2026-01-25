import { MaterialIcons } from '@expo/vector-icons';

export interface ICategory {
  id: string;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

export interface IMachine {
  id: string;
  type: string;
  title: string;
  postedTime: string;
  image: string;
  condition: string;
  hours: string;
  price: string;
  rawPrice?: number;
  negotiable: boolean;
}

export interface IHeaderProps {
  search: string;
  setSearch: (text: string) => void;
}

export interface IFilterTabsProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export interface IMachineCardProps {
  item: IMachine;
}
