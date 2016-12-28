import { setVideoRequestStatus } from 'vclub/redux/club/videoMedia';
import { MediaStatusDismissed } from 'vclub/constants/mediaStatus';

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
        maxWidth: 1280,
        maxHeight: 720,
      },
    });
  });

  return () => {
    window.postMessage({ type: 'vclub:screenShare:requestSourceId' }, '*');
  };
}
