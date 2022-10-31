# Sandbox Youtube Comment Crawling
![alt text](https://raw.githubusercontent.com/jisueo/sycl-sample/master/sd_min.png) Youtube video comment crawling module just crawling web page (SYC)

* **pure crawling youtube video site and public api**
* **this module do not use headless browser, just use ajax.**
* **this module can extract comment from youtube video website**
* **this module do not use youtube/google api, don't worry google api quota**
* unlimited comment crawling comment

* 0.2.0 version update include
    - result data type change [[aaaa], [bbbb], [ccc]] -> [aaaa,bbbb,ccc]
    - support yield, next functions
    - support new youtube method(endpoint) `youtubei/v1/next`

**Sample Code**
-

- [Sample nodejs code](https://github.com/jisueo/sycl-sample)

**Install**
-
```
npm install sandbox-youtube-comments
```
- this module name is **SYC**

**Support features:**
-

- Get comments from youtube video web site
- this SYC don't use headless browser and selector library like cheerio or scrapy, just use ajax, so fast and light
    - <s>use public youtube API: https://www.youtube.com/comment_service_ajax</s>
    - youtube change method(end point), they use `https://www.youtube.com/youtubei/v1/next` now
    - `comment_service_ajax` not work any more
    
- this works on nodejs and electron
    - unfortunately, not support common modern browser because CORS or SOP error
- Typescript support

**Dependency:**
-
- axios
- form-data

**SYC APIS**
-
* Tyscript

    **comment crawling** : return all comments
    - if you want 20 comment
        ```ts
        import {crawling, crawlingCallback} from 'sandbox-youtube-comments';
        const result = await crawling('QIccu1Ge-mc', 20);
        ```
    - crawling(videoid: string, limit: number)
        - videoID: Youtube video id
        - limit: how many comment

    **comment crawling itorator**: when each comments obtain from youtube api, return async yield type 
    - if you want 200 comment
        ```ts
        import {crawlingIterator} from 'sandbox-youtube-comments';

        const itor = await crawlingIterator('UcfvY9v6QmQ', 200);
        let d = false;
        let length = 0;
        while (!d) {
            const {value, done} = await itor.next();
            length += value ? value.length : 0;
            d = done;
        }
        ```
    - crawlingIterator(videoid: string, limit: number)
        - videoID: Youtube video id
        - limit: how many comment
        - return itorator function
     
    **comment crawling callback**: when each comments obtain from youtube api, callback is called. commonly 20 comments are obtained at once  
    - if you want 200 comment, callback is called 10 times approximately 
        ```ts
        import {crawlingCallback} from 'sandbox-youtube-comments';
        crawlingCallback('QIccu1Ge-mc', 1, (arr, end) => {
        });
        ```
    - crawlingCallback(videoid: string, limit: number, callback: (results, end))
        - videoID: Youtube video id
        - limit: how many comment
        - callback
            - results: comments
            - end: is end or not
            
* SYC Funcitons(Nodejs)
    **comment crawling** : return all comments
    ```js
    const syc = require('sandbox-youtube-comments');

    async function test() {
        const result = await syc.crawling('ONpwVdyngpY', 30);
        console.log(result);    
    }
    ```

    **comment crawling** : callback
    ```js
    const syc = require('sandbox-youtube-comments');

    async function test() {
        const result = await syc.crawlingCallback('ONpwVdyngpY', 30, (arr, end) => {
                console.log(arr);   
        });
         
    }
    ```

    **comment crawling** : yield
    ```js
    const syc = require('sandbox-youtube-comments');
    async function test() {
        const itor = await syc.crawlingIterator('ONpwVdyngpY', 30);
        let d = false;
        let length = 0;
        while (!d) {
            const {value, done} = await itor.next();
            length += value ? value.length : 0;
            d = done;
        }
        console.log(result);    
    }

* Output
    - output data is string[], 
    - if comment have line feed or carriage return, originally youtube present like ['ABCD', '\n', 'EFGH]
    - SYC module merge this things, ['ABCD\nEFGH']

    - example 7 comments
    ```
    [
        'Sandbox network ct dev team',
        'WOW!!!',
        'Que clipe',
        'wow....wonderfull',
        'We are literally strong.'
        'Popular opinion'
    ]
    ```

- If comment have '\r\n' or '\n' -> 'Sandbox network ct dev team \nleader jisueo',
   
**SYC LICENSE**
- SANDBOX NETWORK ISC
```
Copyright (c) 2021 year, Sandboxnetwork Inc CT-DEV

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

made by sandboxnetwork jisueo