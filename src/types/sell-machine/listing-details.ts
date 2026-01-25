import { MaterialIcons } from '@expo/vector-icons';

export interface ISpec {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
}

export interface IMediaItem {
  uri: string;
  type: 'image' | 'video';
}

export interface IListingAnalytics {
  views: number;
  calls: number;
}

export interface IListing {
  title: string;
  location: string;
  distance: string;
  rate: string;
  rateUnit: string;
  rateType: string;
  imageUrl: string;
  totalImages: number;
  isLive: boolean;
  analytics: IListingAnalytics;
  media: IMediaItem[];
  specs: ISpec[];
  description: string;
}
