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

export default createReducer(on => {
  on(setPeers, setIn('peers'));

  on(addPeer,
    updateIn('peers', ({ userId, peer }) => ({ [userId]: peer })),
    appendIn('passivePeers', ({ userId }) => userId),
  );

  on(removePeer,
    setIn('peers', (userId, peers) => {
      if (!peers[userId]) return peers;

      const newPeers = { ...peers };
      delete newPeers[userId];

      return newPeers;
    }),
    setIn('streams', (userId, streams) => {
      if (!streams[userId]) return streams;

      const newStreams = { ...streams };
      delete newStreams[userId];

      return newStreams;
    }),
    rejectIn('passivePeers', (peerId, targetId) => peerId === targetId),
  );

  on(addAudioStream, updateIn('streams', ({ userId, stream }) => ({ [userId]: stream })));
});
