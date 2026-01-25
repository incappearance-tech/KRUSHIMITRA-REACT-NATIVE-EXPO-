export interface IPlan {
  id: string;
  title: string;
  duration: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  valueLabel?: string;
  recommended?: boolean;
}

export interface IPlanCardProps {
  plan: IPlan;
  selected: boolean;
  onSelect: (id: string) => void;
}

export interface IFeatureItemProps {
  icon: string;
  label: string;
}
