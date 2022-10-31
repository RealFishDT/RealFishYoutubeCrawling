import axios from 'axios';
import * as Types from './types';

export enum CrawlingErrorCode {
  Normal,
  PlayerResponse,
  InitalData,
  InitalContinueData,
  Unknown,
}

export class CrawlingError extends Error {
  code: CrawlingErrorCode;
  name = '';
  constructor(code: CrawlingErrorCode, message?: string) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
  }
}

export class VideoCrawler {
  private mvidID: string;
  constructor(vidID: string) {
    this.mvidID = vidID;
  }

  public getThumnail() {
    return `https://i.ytimg.com/${this.mvidID}/hqdefault.jpg`;
  }

  private async getHtml() {
    try {
      return await axios.get(
        `https://www.youtube.com/watch?v=${this.mvidID}&gl=kr&hl=ko`
      );
    } catch (error) {
      return null;
    }
  }

  decodeUnicode(unicodeString) {
    const r = /\\u([\d\w]{4})/gi;
    unicodeString = unicodeString.replace(r, (_match, grp) => {
      return String.fromCharCode(parseInt(grp, 16));
    });
    return decodeURI(unicodeString);
  }

  //publishDate
  private analizeInitPlayerInfo(data: string) {
    const regexObj = new RegExp('ytInitialPlayerResponse = ({.*?});', 's');
    const playerInfoMatch = regexObj.exec(data);
    const ytInitialData = JSON.parse(playerInfoMatch[1]);
    const microformat = ytInitialData.microformat.playerMicroformatRenderer;
    const viewDetail = ytInitialData.videoDetails;
    let youtubeAD = false;
    const serviceTracks = ytInitialData.responseContext.serviceTrackingParams;

    const streamData =
      ytInitialData.streamingData && ytInitialData.streamingData.formats
        ? ytInitialData.streamingData.formats[0]
        : null;
    if (serviceTracks && serviceTracks.length > 0) {
      const CSI = serviceTracks.find(item => item.service === 'CSI');
      if (CSI && CSI.params.length > 0) {
        const ad = CSI.params.find(item => item.key === 'yt_ad');
        youtubeAD = ad && true;
      }
    }
    const videoInfo: Types.VideoCrawlingInfoPlayer = {
      videoId: this.mvidID,
      category: microformat.category.replace(/"/gi, '""'),
      title: viewDetail.title.replace(/"/gi, '""'),
      views: Number(viewDetail.viewCount),
      publishDate: microformat.publishDate,
      uploadDate: microformat.uploadDate,
      ownerChannelName: microformat.ownerChannelName.replace(/"/gi, '""'),
      channelId: viewDetail.channelId,
      ad: youtubeAD,
      duration: streamData ? Number(streamData.approxDurationMs) : -1,
      paidOverlay: !ytInitialData.paidContentOverlay ? false : true,
    };
    return videoInfo;
  }

  private analizeContinuationsInfo(data: string) {
    try {
      const regexObj = new RegExp('ytInitialData = ({.*?});', 's');
      const playerInfoMatch = regexObj.exec(data);
      const ytInitialData = JSON.parse(playerInfoMatch[1]);
      const videoPrimaryInfos =
        ytInitialData.contents.twoColumnWatchNextResults.results.results
          .contents;
      const itemSectionRenderer = videoPrimaryInfos.find(item => {
        return (
          item.itemSectionRenderer !== undefined &&
          item.itemSectionRenderer.sectionIdentifier === 'comment-item-section'
        );
      }).itemSectionRenderer;
      const continuations_endpoint =
        itemSectionRenderer.contents[0].continuationItemRenderer
          .continuationEndpoint;

      return {
        continuation: continuations_endpoint.continuationCommand.token,
        clickTrackingParams: continuations_endpoint.clickTrackingParams,
      };
    } catch (e) {
      throw new CrawlingError(CrawlingErrorCode.InitalContinueData);
    }
  }

  private analizeInitYoutubeData(data: string): Types.VideoCrawlingInfoInit {
    try {
      const regexObj = new RegExp('ytInitialData = ({.*?});', 's');
      const playerInfoMatch = regexObj.exec(data);
      const ytInitialData = JSON.parse(playerInfoMatch[1]);
      const contents =
        ytInitialData.contents.twoColumnWatchNextResults.results.results
          .contents;
      const videoPrimaryInfo = contents.find(
        item => item.videoPrimaryInfoRenderer !== undefined
      ).videoPrimaryInfoRenderer;
      const videoSecondaryInfo = contents.find(
        item => item.videoSecondaryInfoRenderer !== undefined
      ).videoSecondaryInfoRenderer;
      let videoTags = [];
      if (
        videoSecondaryInfo &&
        videoSecondaryInfo.metadataRowContainer &&
        videoSecondaryInfo.metadataRowContainer.metadataRowContainerRenderer
      ) {
        const rows =
          videoSecondaryInfo.metadataRowContainer.metadataRowContainerRenderer
            .rows;
        if (rows && rows[0].richMetadataRowRenderer) {
          videoTags = rows[0].richMetadataRowRenderer.contents.map(item => {
            if (item.richMetadataRenderer.title.simpleText) {
              return item.richMetadataRenderer.title.simpleText;
            } else if (item.richMetadataRenderer.title.runs) {
              return item.richMetadataRenderer.title.runs
                .map(item => item.text)
                .join('');
            }
          });
        }
      }
      let onTrend: number;
      let superText: string;
      if (videoPrimaryInfo.superTitleLink) {
        superText = videoPrimaryInfo.superTitleLink.runs[0].text;

        if (superText.includes('인기 급상승 동영상 ')) {
          onTrend = Number(superText.replace('인기 급상승 동영상 #', ''));
        }
        if (superText.includes(' ON TRENDING')) {
          const temp = superText.replace('ON TRENDING', '');
          onTrend = Number(temp.replace('#', ''));
        }
      }
      let likeCount = -1;
      if (
        videoPrimaryInfo.videoActions.menuRenderer &&
        videoPrimaryInfo.videoActions.menuRenderer.topLevelButtons
      ) {
        const buttons: any[] =
          videoPrimaryInfo.videoActions.menuRenderer.topLevelButtons;
        const videoLikeTogglebutton = buttons.find(
          el =>
            el.toggleButtonRenderer !== undefined &&
            el.toggleButtonRenderer.targetId === 'watch-like'
        );
        let videoLikeTogglebuttonRenderer = undefined;
        if (videoLikeTogglebutton === undefined) {
          videoLikeTogglebuttonRenderer =
            videoPrimaryInfo.videoActions.menuRenderer.topLevelButtons[0]
              .segmentedLikeDislikeButtonRenderer.likeButton
              .toggleButtonRenderer;
        } else {
          videoLikeTogglebuttonRenderer =
            videoLikeTogglebutton.toggleButtonRenderer;
        }
        if (videoLikeTogglebuttonRenderer.toggledText.accessibility) {
          const likeLabels =
            videoLikeTogglebuttonRenderer.toggledText.accessibility
              .accessibilityData;
          const likeNumString: string[] = likeLabels.label.split(' ');
          let singleLikeNumString: string | null = null;
          if (likeNumString.length > 1) {
            singleLikeNumString = likeNumString.join('');
          } else {
            singleLikeNumString = likeNumString[0];
          }
          likeCount = Number(singleLikeNumString.replace(/\D/g, ''));
        } else {
          likeCount = -1;
        }
      }

      return {
        likes: likeCount,
        tags: videoTags,
        rank: onTrend,
        superText: superText,
      };
    } catch (e) {
      console.log(e);
      throw new CrawlingError(CrawlingErrorCode.InitalData);
    }
  }

  public async execute(): Promise<Types.VideoCrawlingInfo> {
    const result = await this.getHtml();
    if (result) {
      const initPlayerInfo = this.analizeInitPlayerInfo(result.data); // view, pub, category,
      const initYoutubeInfo = this.analizeInitYoutubeData(result.data); // like, tags

      return {
        ...initPlayerInfo,
        ...initYoutubeInfo,
      };
    }
    return null;
  }
}

export default VideoCrawler;
