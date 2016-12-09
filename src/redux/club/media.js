import actionCreator from 'borex-actions/actionCreator';
import setPayload from 'borex-actions/setPayload';
import createReducer from 'borex-reducers/createReducer';
import setIn from 'borex-reducers/setIn';
import update from 'borex-reducers/update';

import { MediaStatusReady } from 'vclub/constants/mediaStatus';


export const setAudioStream = actionCreator();

export const setMediaRequestStatus = actionCreator(
  setPayload((status, errorName) => ({ status, errorName })),
);

export const toggleAudio = actionCreator();

export default createReducer(on => {
  on(setAudioStream,
    setIn('stream'),
    update(() => ({
      status: MediaStatusReady,
      errorName: null,
    })),
  );

  on(setMediaRequestStatus, update());

  on(toggleAudio, setIn('muted', (_, muted) => !muted));
});
