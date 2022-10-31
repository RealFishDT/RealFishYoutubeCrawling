// eslint-disable-next-line node/no-unpublished-import
//in
import {VideoCrawler} from './crawling';
import {VideoCrawlingInfo} from './types';
export async function crawling(videoId: string): Promise<VideoCrawlingInfo> {
  return await new VideoCrawler(videoId).execute();
}

export default crawling;
