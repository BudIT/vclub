import { startVideoRequest } from 'vclub/redux/club/videoMedia';
import { WebcamVideoType } from 'vclub/constants/videoTypes';

import requestVideoStream from './requestVideoStream';


export default function requestWebcamStream(store) {
  store.dispatch(startVideoRequest(WebcamVideoType));
  requestVideoStream(store, true, WebcamVideoType);
}
