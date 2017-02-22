import { setVideoRequestStatus, startVideoRequest } from 'vclub/redux/club/videoMedia';
import { MediaStatusDismissed } from 'vclub/constants/mediaStatus';
import { ScreenVideoType } from 'vclub/constants/videoTypes';

import requestVideoStream from './requestVideoStream';


export default function getScreenCaptureRequest(store) {
  window.addEventListener('message', (event) => {
    if (!event.data || event.data.type !== 'vclub:screenShare:response') return;

    const { response } = event.data;

    if (response.error) {
      store.dispatch(setVideoRequestStatus(MediaStatusDismissed, response.message));

      return;
    }

    requestVideoStream(store, {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: response.sourceId,
        maxWidth: 1920,
        maxHeight: 1080,
      },
    }, ScreenVideoType);
  });

  return () => {
    store.dispatch(startVideoRequest(ScreenVideoType));
    window.postMessage({ type: 'vclub:screenShare:requestSourceId' }, '*');
  };
}
