# RealFish Youtube Crawling

Real Fish Youtube Crawling

- **pure crawling youtube video site and public api**
- **this module do not use youtube/google api, don't worry google api quota**

## **Install**

```
npm install ryc
```

## **Support features:**

- Get views, likes from youtube video web site
- this RYC don't use headless browser and selector library like cheerio or scrapy, just use ajax, so fast and light
- this works on nodejs and electron
  - unfortunately, not support common modern browser because CORS or SOP error
- Typescript support
- async/await support

## **Dependency:**

- axios

## **RYC APIS**

- Tyscript

  **youtube video crawling** : return information videos

  ```ts
  import {crawling} from 'realfish-yc';
  const result = await crawling('QIccu1Ge-mc');
  ```

- Javascript

  ```js
  const A = require('realfish-yc');
  const test = () => {
    A.crawling_('wnlh9yoxBek').then(h => {
      console.log(h);
    });
  };
  test();
  ```

  **youtube video crawling** : return information videos

  - crawling(videoid: string)
    - videoID: Youtube video id

- Output

  - output data is json
    ```
    {
        videoId: 'QIccuFGe-mc',
        category: 'Comedy',
        title: 'this is title',
        views: 87572,
        publishDate: '2018-10-12',
        uploadDate: '2018-10-12',
        ownerChannelName: 'Real Fish Viewer',
        channelId: 'UCe323-y0YdvVSCwX3QbQb-A',
        ad: undefined,
        duration: 131448,
        paidOverlay: false,
        likes: 277,
        tags: [],
        rank: undefined,
        superText: '#인기급상승동영상'
    }
    ```

- properties
  - videoId: youtube video id
  - category: video category
  - title: video title
  - views: video current views count
  - publishDate: video published at
  - uploadDate: video upload at
  - ownerChannelName: this video owner channel name
  - channelId: this video owner channel id
  - ad: this video have ad
  - duration: this video duration, second
  - paidOverlay: this video have paidOverlay
  - likes: video likes count
  - tags: video tag, like "game", "mine craft"
  - rank: if video is in on trend(인급동), this propety show rank
  - superText: video supertext, this supert text show, videos category and features is written by author

**Product**

- [RealFishDev Hom](https://realfish-likeview.web.app/")

**RYC(RealFish Youtube Crawling) LICENSE**

- Real Fish ISC

```
Copyright (c) 2022 year, Real Fish Inc Content Dev Solutions

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

made by RealFishDT
