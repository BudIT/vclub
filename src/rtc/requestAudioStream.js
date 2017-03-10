import { setAudioStream, setAudioRequestStatus } from 'vclub/redux/club/audioMedia';
import {
  MediaStatusDismissed, MediaStatusDenied, MediaStatusNoTracks, MediaStatusUnknown,
} from 'vclub/constants/mediaStatus';

const { Raven } = window;


const MediaRequestErrorsMap = {
  PermissionDismissedError: MediaStatusDismissed,
  PermissionDeniedError: MediaStatusDenied,
};

export default function requestMediaDevices(store) {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((localStream) => {
    const audioTracks = localStream.getAudioTracks();

    if (audioTracks.length === 0) {
      store.dispatch(setAudioRequestStatus(MediaStatusNoTracks));

      return;
    }

    store.dispatch(setAudioStream(localStream));
  }).catch(error => {
    const status = error.name && MediaRequestErrorsMap[error.name];

    if (!status) {
      Raven.captureException(error, {
        tags: { submodule: 'audio' },
      });
    }

    store.dispatch(setAudioRequestStatus(status || MediaStatusUnknown, error.name));
  });
}
