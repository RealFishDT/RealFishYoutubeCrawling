# RealFish Youtube Crawling

Real Fish Youtube Crawling

- **pure crawling youtube video site and public api**
- **this module do not use youtube/google api, don't worry google api quota**

## **Install**

```
npm i realfish-yc
```

## **Support features:**

- Get views, likes from youtube video web site
- region and language support
  support languages are "KO", "EN", ISO 639-1, CAPITAL CASE
  support region are ISO 3166-1 alpha-2 that youtube support, CAPITAL CASE
- this RYC don't use headless browser and selector library like cheerio or scrapy, just use ajax, so fast and light
- this works on nodejs and electron
  - unfortunately, not support common modern browser because CORS or SOP error
- Typescript support
- async/await support

##FIX
- 0.1.8: in case of English Crawling, Module can not extract rank from on trend super text tag
- 0.1.8: in case of music category video, Module can not extract rank from on trend suport text tag

##ADD
- 0.1.8 support ES language

## **Dependency:**

- axios
- node js > 16.0.0

## **RYC APIS**

- API
  - crawling(videoid: string, gl: string, hl: string)
    - videoid: youtube video id
    - gl: region(national code) defualt "KR"
      - on trend(인급동) video ranks list is diffrent by gl
      - each region have each "on trend videos"
      - it affect "rank" property
    - hl: lanugage code default "KO", it's only support "KO", "EN", "ES"
      - if you use other language code, this module can not extract video list from youtube
- Typescript

  **youtube video crawling** : return information videos

  ```ts
  import {crawling} from 'realfish-yc';
  const result = await crawling('QIccu1Ge-mc');
  ```

  ```ts
  import {crawling} from 'realfish-yc';
  const result = await crawling('QIccu1Ge-mc', 'US', 'EN');
  ```

- Javascript

  ```js
  const A = require('realfish-yc');

  A.crawling('wnlh9yoxBek').then(h => {
    console.log(h);
  });
  ```

  ```js
  const A = require('realfish-yc');

  A.crawling('wnlh9yoxBek', 'US', 'EN').then(h => {
    console.log(h);
  });
  ```

  **youtube video crawling** : return information videos

  - crawling(videoid: string)
    - videoID: Youtube video id

- Output

  - output data is json, gl=KR, hl=KO, korea, korean

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

  - output data is json, gl=SG, hl=EN, singapole, english
    ```
    {
        videoId: 'UhQmAfzaw7c',
        category: 'Gaming',
        title: 'Dota 2 The International 2022 - Main Event - Final Day',
        views: 3407950,
        publishDate: '2022-10-30',
        uploadDate: '2022-10-30',
        ownerChannelName: 'dota2',
        channelId: 'UCTQKT5QqO3h7y32G8VzuySQ',
        ad: undefined,
        duration: 39937973,
        paidOverlay: false,
        likes: 23100,
        tags: [ 'Dota 2', 'Gaming' ],
        rank: 1,
        superText: '#1 ON TRENDING'
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

- [RealFishDev Hom](https://realfish-likeview.web.app)

- [Chrome Extension, Realfish View Like](https://chrome.google.com/webstore/search/realfish%20view%20like?authuser=1?authuser=1&gclid=CjwKCAjwzY2bBhB6EiwAPpUpZmzaXPt4vGxm3A_ubGvCZYhmwjFjcNb9k8tyakGaGNWUa5c_TJWfLBoC_c0QAvD_BwE)

  **RYC(RealFish Youtube Crawling) LICENSE**

- Real Fish ISC

```
Copyright (c) 2022 year, Real Fish Inc Content Dev Solutions

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

made by RealFishDT
