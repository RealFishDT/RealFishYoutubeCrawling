// tslint:disable-next-line:no-import-side-effect
import 'jasmine';
import {crawling} from '../src/main';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 26000;
describe('crawling comment test 10', () => {
  it('crawling comments 10', async () => {
    const result = await crawling('QIccuFGe-mc');
    expect(result.videoId).toEqual('QIccuFGe-mc');
  });
});
