export interface DtoSong {
  category: string;
  resultType: string;
  title: string;
  album: Album;
  inLibrary: boolean;
  feedbackTokens: FeedbackTokens;
  videoId: string;
  videoType: string;
  duration: string;
  year: any;
  artists: Artist[];
  duration_seconds: number;
  isExplicit: boolean;
  thumbnails: Thumbnail[];
}

export interface Album {
  name: string;
  id: string;
}

export interface FeedbackTokens {
  add: any;
  remove: any;
}

export interface Artist {
  name: string;
  id: string;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
