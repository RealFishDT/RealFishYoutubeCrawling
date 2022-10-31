// eslint-disable-next-line node/no-unpublished-import
//in
import {VideoCrawler} from './crawling';
import {VideoCrawlingInfo} from './types';
export async function crawling(
  videoId: string,
  gl = 'KR',
  gh = 'KO'
): Promise<VideoCrawlingInfo> {
  return await new VideoCrawler(videoId, gl, gh).execute();
}

export default crawling;
