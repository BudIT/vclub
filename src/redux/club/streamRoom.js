import ServerTime from 'vclub/utils/ServerTime';

import actionCreator from 'borex-actions/actionCreator';
import setPayload from 'borex-actions/setPayload';
import remote from 'vclub/redux/enhancers/remote';
import broadcast from 'vclub/redux/enhancers/broadcast';

import createReducer from 'borex-reducers/createReducer';
import update from 'borex-reducers/update';
import updateIn from 'borex-reducers/updateIn';

import initialState from 'vclub/redux/initialClubState';


export const resetStreaming = actionCreator(
  remote, broadcast,
);

export const setVideoSource = actionCreator(
  setPayload((source, ownerId) => ({ source, ownerId })),
  remote, broadcast,
);

export const setSourceData = actionCreator(
  remote, broadcast,
);

export const play = actionCreator(
  remote, broadcast,
);

export const pause = actionCreator(
  remote, broadcast,
);

export const seekTo = actionCreator(
  remote, broadcast,
);

export default createReducer(on => {
  on(setVideoSource, update());
  on(setSourceData, updateIn('sourceData'));

  on(play,
    updateIn('playback', (newPos, playback) => ({
      playing: true,
      startedAt: ServerTime.now(),
      pos: typeof newPos === 'undefined' ? playback.pos : newPos,
    })),
  );

  on(pause,
    updateIn('playback', pos => ({
      playing: false,
      pos,
    }))
  );

  on(seekTo,
    updateIn('playback', pos => ({
      pos,
      startedAt: ServerTime.now(),
    }))
  );

  on(resetStreaming, () => initialState.streamRoom);
});
