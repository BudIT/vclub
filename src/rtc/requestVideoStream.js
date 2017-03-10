import { setVideoStream, setVideoRequestStatus } from 'vclub/redux/club/videoMedia';
import {
  MediaStatusDismissed, MediaStatusDenied, MediaStatusNoTracks, MediaStatusUnknown,
} from 'vclub/constants/mediaStatus';

const { Raven } = window;


const MediaRequestErrorsMap = {
  PermissionDismissedError: MediaStatusDismissed,
  PermissionDeniedError: MediaStatusDenied,
};

export default function requestVideoStream(store, videoConstraints, videoType) {
  const constraints = {
    audio: false,
    video: videoConstraints,
  };

  return navigator.mediaDevices.getUserMedia(constraints).then(videoStream => {
    const videoTracks = videoStream.getVideoTracks();

    if (videoTracks.length === 0) {
      store.dispatch(setVideoRequestStatus(MediaStatusNoTracks));

      return;
    }

    store.dispatch(setVideoStream(videoStream, videoType));
  }).catch(error => {
    const status = error.name && MediaRequestErrorsMap[error.name];

    if (!status) {
      Raven.captureException(error, {
        tags: { submodule: `video(${videoType})` },
      });
    }

    store.dispatch(setVideoRequestStatus(status || MediaStatusUnknown, error.name));
  });
}
