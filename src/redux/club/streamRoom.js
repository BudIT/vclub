import actionCreator from 'borex-actions/actionCreator';
// import commandCreator from 'borex-actions/commandCreator';
import setPayload from 'borex-actions/setPayload';
import remote from 'vclub/redux/enhancers/remote';
import broadcast from 'vclub/redux/enhancers/broadcast';

import createReducer from 'borex-reducers/createReducer';
import update from 'borex-reducers/update';

import initialState from 'vclub/redux/initialClubState';


export const resetStreaming = actionCreator(
  remote, broadcast,
);

export const setVideoSource = actionCreator(
  setPayload((source, ownerId) => ({ source, ownerId })),
  remote, broadcast,
);

export default createReducer(on => {
  on(setVideoSource, update());

  on(resetStreaming, () => initialState.streamRoom);
});
