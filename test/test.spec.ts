// tslint:disable-next-line:no-import-side-effect
import 'jasmine';
import {crawling} from '../src/main';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 26000;
describe('crawling test', () => {
  it('crawling video', async () => {
    const result = await crawling('-atcp4NXFqg');
    console.log(result);
    expect(result.videoId).toEqual('-atcp4NXFqg');
  });
});

describe('crawling test US EN', () => {
  it('crawling video', async () => {
    const result = await crawling('rb0bjyt1OD0', "US", "EN");
    console.log(result);
    expect(result.videoId).toEqual('rb0bjyt1OD0');
  });
});


describe('crawling test ES ES', () => {
  it('crawling video', async () => {
    const result = await crawling('yDhxCiLXEHs', "ES", "ES");
    console.log(result);
    expect(result.videoId).toEqual('yDhxCiLXEHs');
  });
});
