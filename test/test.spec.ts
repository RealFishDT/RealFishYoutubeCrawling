// tslint:disable-next-line:no-import-side-effect
import 'jasmine';
import {crawling} from '../src/main';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 26000;
describe('crawling test', () => {
  it('crawling video', async () => {
    const result = await crawling('UhQmAfzaw7c');
    console.log(result);
    expect(result.videoId).toEqual('UhQmAfzaw7c');
  });
});
