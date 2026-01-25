export interface IActionGridProps {
  actions: {
    id: string;
    label: string;
    icon: string;
    onPress: () => void;
  }[];
}
