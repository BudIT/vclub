import R from 'ramda';
import { MediaStatusReady } from 'vclub/constants/mediaStatus';

import { MEMBER_ENTER, MEMBER_LEAVE } from 'vclub/redux/club/members';
import { INITIALIZE } from 'vclub/redux/club/init';
import { setAudioStream } from 'vclub/redux/club/media';
import {
  setPeers, addPeer, removePeer, addAudioStream, setAllowedStreams,
} from 'vclub/redux/club/rtc';

import { ByRoomSelectors, DefaultStreamsSelector } from './allowedStreamsSelectors';


const IceServers = [
  {
    url: 'stun:stun.l.google.com:19302',
  }, {
    url: 'stun:stun.anyfirewall.com:3478',
  }, {
    url: 'turn:turn.bistri.com:80',
    credential: 'homeo',
    username: 'homeo',
  }, {
    url: 'turn:turn.anyfirewall.com:443?transport=tcp',
    credential: 'webrtc',
    username: 'webrtc',
  },
];

export default function createRTCAPI(ioSocket, store) {
  function createPeerConnection(userId) {
    const { media } = store.getState();
    const peer = new RTCPeerConnection({
      iceServers: IceServers,
    });

    if (media.stream) {
      peer.addStream(media.stream);
    }

    peer.onicecandidate = event => {
      if (!event.candidate) return;

      ioSocket.emit('RTC.ICECandidate', { userId, candidate: event.candidate });
    };

    peer.onaddstream = event => {
      store.dispatch(addAudioStream(userId, event.stream));
    };

    return peer;
  }

  function initPeers(members) {
    const { auth } = store.getState();
    const currentUserId = auth.user.id;

    const peers = members.reduce((memo, member) => {
      if (member.id === currentUserId) return memo;

      const peer = createPeerConnection(member.id);

      peer.createOffer().then(localDesc => {
        peer.setLocalDescription(localDesc).then(() => {
          ioSocket.emit('RTC.SDP', { userId: member.id, sdp: localDesc });
        });
      });

      // eslint-disable-next-line no-param-reassign
      memo[member.id] = peer;

      return memo;
    }, {});

    store.dispatch(setPeers(peers));
  }

  function createPeer(member) {
    const peer = createPeerConnection(member.id);

    store.dispatch(addPeer(member.id, peer));
  }

  function destroyPeer(memberId, rtc) {
    const { peers } = rtc;
    const peer = peers[memberId];

    store.dispatch(removePeer(memberId));

    if (peer.signalingState !== 'closed') {
      peer.close();
    }
  }

  function setupStream(stream, peers) {
    R.values(peers).forEach(peer => {
      peer.addStream(stream);
    });
  }

  function manageAllowedStreams() {
    const state = store.getState();
    const { rooms, rtc } = store.getState();

    const roomSelector = ByRoomSelectors[rooms.currentRoom];
    const selector = roomSelector || DefaultStreamsSelector;
    const newStreams = selector(state);

    if (newStreams !== rtc.allowedStreams) {
      store.dispatch(setAllowedStreams(newStreams));
    }
  }

  function manageStreamState() {
    const { auth, media, rtc } = store.getState();

    if (media.status !== MediaStatusReady) {
      return;
    }

    const userId = auth.user.id;
    const hasAllowedStream = rtc.allowedStreams.includes(userId);
    const shouldBeEnabled = !media.muted && hasAllowedStream;
    const track = media.stream.getAudioTracks()[0];

    if (track.enabled !== shouldBeEnabled) {
      track.enabled = shouldBeEnabled;
    }
  }

  function dispatch(action) {
    const { media, members, rtc, auth } = store.getState();

    if (!auth.authenticated) {
      return;
    }

    if (action.type === INITIALIZE) {
      initPeers(members);
    }

    if (action.type === MEMBER_ENTER) {
      createPeer(action.payload);
    }

    if (action.type === MEMBER_LEAVE) {
      destroyPeer(action.payload, rtc);
    }

    if (action.type === setAudioStream.type) {
      setupStream(media.stream, rtc.peers);
    }

    manageAllowedStreams();
    manageStreamState();
  }

  ioSocket.on('RTC.ICECandidate', ({ userId, candidate }) => {
    const { rtc } = store.getState();
    const peer = rtc.peers[userId];

    if (!peer) {
      // track this place 'ICE-JOIN race'
      return;
    }

    peer.addIceCandidate(new RTCIceCandidate(candidate));
  });

  ioSocket.on('RTC.SDP', ({ userId, sdp }) => {
    const { rtc } = store.getState();
    const { peers, passivePeers } = rtc;
    const peer = peers[userId];
    const isPassive = passivePeers.includes(userId);

    if (!peer) {
      // track this place 'SDP-JOIN race'
      return;
    }

    const sessionDesc = new RTCSessionDescription(sdp);

    peer.setRemoteDescription(sessionDesc).then(() => {
      if (!isPassive) return;

      peer.createAnswer().then(localDesc => {
        peer.setLocalDescription(localDesc).then(() => {
          ioSocket.emit('RTC.SDP', { userId, sdp: localDesc });
        });
      });
    });
  });

  return { dispatch };
}
