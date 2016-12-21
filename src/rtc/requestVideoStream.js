import { setVideoStream, setMediaRequestStatus } from 'vclub/redux/club/videoMedia';
import {
  MediaStatusDismissed, MediaStatusDenied, MediaStatusNoTracks, MediaStatusUnknown,
} from 'vclub/constants/mediaStatus';

import { StreamSourceWebcam, StreamSourceScreen } from 'vclub/constants/streamSources';


const MediaRequestErrorsMap = {
  PermissionDismissedError: MediaStatusDismissed,
  PermissionDeniedError: MediaStatusDenied,
};

const mediaConstraints = {
  [StreamSourceWebcam]: {
    video: true,
  },
  [StreamSourceScreen]: {
    video: {
      mandatory: { chromeMediaSource: 'desktop' },
    },
  },
};

export default function requestVideoStream(store, type) {
  return navigator.mediaDevices.getUserMedia(mediaConstraints[type]).then(videoStream => {
    const videoTracks = videoStream.getVideoTracks();

    if (videoTracks.length === 0) {
      store.dispatch(setMediaRequestStatus(MediaStatusNoTracks));

      return;
    }

    store.dispatch(setVideoStream(videoStream));
  }).catch(error => {
    const status = error.name && MediaRequestErrorsMap[error.name];
    store.dispatch(setMediaRequestStatus(status || MediaStatusUnknown, error.name));
  });
}
