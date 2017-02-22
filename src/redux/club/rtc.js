import R from 'ramda';
import actionCreator from 'borex-actions/actionCreator';
import setPayload from 'borex-actions/setPayload';
import createReducer from 'borex-reducers/createReducer';
import setIn from 'borex-reducers/setIn';
import updateIn from 'borex-reducers/updateIn';

import { MEMBER_LEAVE } from './members';


export const addAudioStream = actionCreator(
  setPayload((userId, stream) => ({ userId, stream })),
);

export const addVideoStream = actionCreator(
  setPayload((userId, stream) => ({ userId, stream })),
);

export const removeStream = actionCreator(
  setPayload((userId, stream) => ({ userId, stream })),
);

export const setAllowedStreams = actionCreator();


export default createReducer(on => {
  on(MEMBER_LEAVE,
    setIn('audioStreams', (userId, streams) => R.dissoc(userId, streams)),
    setIn('videoStreams', (userId, streams) => R.dissoc(userId, streams)),
  );

  on(addAudioStream, updateIn('audioStreams', ({ userId, stream }) => ({ [userId]: stream })));
  on(addVideoStream, updateIn('videoStreams', ({ userId, stream }) => ({ [userId]: stream })));

  function cleanupStreams({ userId, stream }, streams) {
    const userStream = streams[userId];
    const matches = userStream && stream.id === userStream.id;

    return matches ? R.dissoc(userId, streams) : streams;
  }

  on(removeStream,
    setIn('audioStreams', cleanupStreams),
    setIn('videoStreams', cleanupStreams),
  );

  on(setAllowedStreams, setIn('allowedStreams'));
});
