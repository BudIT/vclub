import { MEMBER_ENTER, MEMBER_LEAVE } from 'vclub/redux/club/members';
import { INITIALIZE } from 'vclub/redux/club/init';

import { setPeers, addPeer, removePeer, addAudioStream } from 'vclub/redux/club/rtc';


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

    peer.addStream(media.stream);

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

  function dispatch(action) {
    const { members, rtc } = store.getState();

    if (action.type === INITIALIZE) {
      initPeers(members);
    }

    if (action.type === MEMBER_ENTER) {
      createPeer(action.payload);
    }

    if (action.type === MEMBER_LEAVE) {
      destroyPeer(action.payload, rtc);
    }
  }

  ioSocket.on('RTC.ICECandidate', ({ userId, candidate }) => {
    const { rtc } = store.getState();
    const peer = rtc.peers[userId];

    if (!peer) {
      console.log('ICE-JOIN race');
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
      console.log('SDP-JOIN race');
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
