import { setAudioStream, setMediaRequestStatus } from 'vclub/redux/club/media';


const MediaRequestErrorsMap = {
  PermissionDismissedError: 2,
  PermissionDeniedError: 3,
};

export default function requestMediaDevices(store) {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((localStream) => {
    const audioTracks = localStream.getAudioTracks();

    if (audioTracks.length === 0) {
      store.dispatch(setMediaRequestStatus(4));
      return;
    }

    store.dispatch(setAudioStream(localStream));
  }).catch(error => {
    const status = error.name && MediaRequestErrorsMap[error.name];
    store.dispatch(setMediaRequestStatus(status || error.name));
  });
}
