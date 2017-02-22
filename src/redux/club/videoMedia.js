import actionCreator from 'borex-actions/actionCreator';
import setPayload from 'borex-actions/setPayload';
import createReducer from 'borex-reducers/createReducer';
import setIn from 'borex-reducers/setIn';
import update from 'borex-reducers/update';

import initialState from 'vclub/redux/initialClubState';
import { MediaStatusReady, MediaStatusPending } from 'vclub/constants/mediaStatus';

// import { resetStreaming } from './streamRoom';


export const setVideoStream = actionCreator(
  setPayload((stream, type) => ({ stream, type })),
);

export const setVideoRequestStatus = actionCreator(
  setPayload((status, errorName) => ({ status, errorName })),
);

export const startVideoRequest = actionCreator();


export const toggleVideo = actionCreator();

export const unsetVideoStream = actionCreator();

export default createReducer(on => {
  on(setVideoStream, update((data) => ({
    ...data,
    status: MediaStatusReady,
    errorName: null,
  })));

  on(setVideoRequestStatus, update());

  on(startVideoRequest, update((type) => ({
    type,
    status: MediaStatusPending,
    errorName: null,
  })));

  on(toggleVideo, setIn('muted', (_, muted) => !muted));

  on(unsetVideoStream, () => initialState.videoMedia);
});
