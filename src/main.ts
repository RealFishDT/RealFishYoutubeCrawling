// eslint-disable-next-line node/no-unpublished-import
import {VideoCrawler} from './crawling';

export async function crawling_(videoId: string) {
  return await new VideoCrawler(videoId).execute();
}

export const crawling = crawling_;
