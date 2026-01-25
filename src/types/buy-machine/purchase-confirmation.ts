export interface IStatusOptionProps {
  id: 'purchased' | 'not_purchased';
  title: string;
  desc: string;
  selected: boolean;
  onSelect: (id: 'purchased' | 'not_purchased') => void;
}
