import R from 'ramda';
import actionCreator from 'borex-actions/actionCreator';
import setPayload from 'borex-actions/setPayload';
import createReducer from 'borex-reducers/createReducer';
import setIn from 'borex-reducers/setIn';
import updateIn from 'borex-reducers/updateIn';
import appendIn from 'borex-reducers/appendIn';
import rejectIn from 'borex-reducers/rejectIn';


export const setPeers = actionCreator();
export const removePeer = actionCreator();

export const addPeer = actionCreator(
  setPayload((userId, peer) => ({ userId, peer })),
);

export const addAudioStream = actionCreator(
  setPayload((userId, stream) => ({ userId, stream })),
);

export const addVideoStream = actionCreator(
  setPayload((userId, stream) => ({ userId, stream })),
);

export const setAllowedStreams = actionCreator();


export default createReducer(on => {
  on(setPeers, setIn('peers'));

  on(addPeer,
    updateIn('peers', ({ userId, peer }) => ({ [userId]: peer })),
    appendIn('passivePeers', ({ userId }) => userId),
  );

  on(removePeer,
    setIn('peers', (userId, peers) => R.dissoc(userId, peers)),
    setIn('audioStreams', (userId, streams) => R.dissoc(userId, streams)),
    setIn('videoStreams', (userId, streams) => R.dissoc(userId, streams)),
    rejectIn('passivePeers', (peerId, targetId) => peerId === targetId),
  );

  on(addAudioStream, updateIn('audioStreams', ({ userId, stream }) => ({ [userId]: stream })));
  on(addVideoStream, updateIn('videoStreams', ({ userId, stream }) => ({ [userId]: stream })));

  on(setAllowedStreams, setIn('allowedStreams'));
});
