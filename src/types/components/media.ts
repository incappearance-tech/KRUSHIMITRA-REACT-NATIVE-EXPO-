export interface IMediaItem {
  uri: string;
  type: 'image' | 'video';
}

export interface IMediaPickerProps {
  title?: string;
  media: IMediaItem[];
  min?: number;
  max?: number;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export interface IMediaUploaderProps {
  title?: string;
  min?: number;
  max?: number;
  initialMedia?: IMediaItem[];
  onChange: (media: IMediaItem[]) => void;
}
