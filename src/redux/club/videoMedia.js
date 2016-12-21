import actionCreator from 'borex-actions/actionCreator';
import setPayload from 'borex-actions/setPayload';
import createReducer from 'borex-reducers/createReducer';
import setIn from 'borex-reducers/setIn';
import update from 'borex-reducers/update';

import initialState from 'vclub/redux/initialClubState';
import { MediaStatusReady } from 'vclub/constants/mediaStatus';

import { resetStreaming } from './streamRoom';


export const setVideoStream = actionCreator();

export const setMediaRequestStatus = actionCreator(
  setPayload((status, errorName) => ({ status, errorName })),
);

export const toggleVideo = actionCreator();

export default () => createReducer(on => {
  on(setVideoStream,
    setIn('stream'),
    update(() => ({
      status: MediaStatusReady,
      errorName: null,
    })),
  );

  on(setMediaRequestStatus, update());

  on(toggleVideo, setIn('muted', (_, muted) => !muted));

  on(resetStreaming, () => initialState.videoMedia);
});
