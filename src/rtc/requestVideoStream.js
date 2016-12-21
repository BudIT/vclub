import { setVideoStream, setMediaRequestStatus } from 'vclub/redux/club/videoMedia';
import {
  MediaStatusDismissed, MediaStatusDenied, MediaStatusNoTracks, MediaStatusUnknown,
} from 'vclub/constants/mediaStatus';


const MediaRequestErrorsMap = {
  PermissionDismissedError: MediaStatusDismissed,
  PermissionDeniedError: MediaStatusDenied,
};

const mediaConstraints = {
  WEBCAM: {
    video: true,
  },
  SCREEN: {
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
