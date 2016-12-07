import { setAudioStream, setMediaRequestStatus } from 'vclub/redux/club/media';
import {
  MediaStatusDismissed, MediaStatusDenied, MediaStatusNoAudio, MediaStatusUnknown,
} from 'vclub/constants/mediaStatus';


const MediaRequestErrorsMap = {
  PermissionDismissedError: MediaStatusDismissed,
  PermissionDeniedError: MediaStatusDenied,
};

export default function requestMediaDevices(store) {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((localStream) => {
    const audioTracks = localStream.getAudioTracks();

    if (audioTracks.length === 0) {
      store.dispatch(setMediaRequestStatus(MediaStatusNoAudio));
      return;
    }

    store.dispatch(setAudioStream(localStream));
  }).catch(error => {
    const status = error.name && MediaRequestErrorsMap[error.name];
    store.dispatch(setMediaRequestStatus(status || MediaStatusUnknown, error.name));
  });
}
