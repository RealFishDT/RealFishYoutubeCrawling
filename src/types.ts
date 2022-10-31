export interface VideoCrawlingInfoInit {
  likes: number;
  tags: string[];
  rank?: number;
  superText?: string;
}

export interface VideoCrawlingInfoComment {
  comments?: number;
}

export interface VideoCrawlingInfoPlayer {
  videoId: string;
  category: string;
  title: string;
  views: number;
  publishDate: string;
  uploadDate: string;
  ownerChannelName: string;
  channelId: string;
  ad: boolean;
  duration: number;
  paidOverlay: boolean;
}

export interface VideoTrendFeedInfo {
  videoId: string;
  thumbnail?: string;
  title: string;
  channelId: string;
  rank: number;
  type: 'shorts' | 'video';
}

export type VideoTrendFeedInfos = VideoTrendFeedInfo[];

export type VideoCrawlingInfo = VideoCrawlingInfoPlayer &
  VideoCrawlingInfoInit &
  VideoCrawlingInfoComment;

export type VideoCrawlingInfos = VideoCrawlingInfo[];
