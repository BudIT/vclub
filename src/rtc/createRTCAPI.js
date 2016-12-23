import { MediaStatusReady } from 'vclub/constants/mediaStatus';

import { MEMBER_ENTER, MEMBER_LEAVE } from 'vclub/redux/club/members';
import { INITIALIZE } from 'vclub/redux/club/init';
import { setAudioStream } from 'vclub/redux/club/audioMedia';
import { setVideoStream } from 'vclub/redux/club/videoMedia';
import { resetStreaming, setVideoSource } from 'vclub/redux/club/streamRoom';
import {
  setPeers, addPeer, removePeer, addAudioStream, addVideoStream, removeStream, setAllowedStreams,
} from 'vclub/redux/club/rtc';

import { StreamSourceWebcam, StreamSourceScreen } from 'vclub/constants/streamSources';

import requestVideoStream from './requestVideoStream';
import { ByRoomSelectors, DefaultStreamsSelector } from './allowedStreamsSelectors';


const IceServers = [
  {
    url: 'stun:stun.l.google.com:19302',
  }, {
    url: 'stun:stun.anyfirewall.com:3478',
  },
];

export default function createRTCAPI(ioSocket, store) {
  function createPeerConnection(userId) {
    const { audioMedia, videoMedia } = store.getState();
    const peer = new RTCPeerConnection({
      iceServers: IceServers,
    });

    if (audioMedia.stream) {
      peer.addStream(audioMedia.stream);
    }

    if (videoMedia.stream) {
      peer.addStream(videoMedia.stream);
    }

    peer.onicecandidate = event => {
      if (!event.candidate) return;

      ioSocket.emit('RTC.ICECandidate', { userId, candidate: event.candidate });
    };

    peer.onaddstream = event => {
      const stream = event.stream;
      const track = stream.getTracks()[0];
      const addRemoteStream = track.kind === 'video' ? addVideoStream : addAudioStream;

      store.dispatch(addRemoteStream(userId, event.stream));
    };

    peer.onremovestream = event => {
      store.dispatch(removeStream(userId, event.stream));
    };

    return peer;
  }

  function sendOffer(peer, userId) {
    peer.createOffer().then(localDesc => {
      peer.setLocalDescription(localDesc).then(() => {
        ioSocket.emit('RTC.SDP', { userId, sdp: localDesc, offer: true });
      });
    });
  }

  function initPeers(members) {
    const { auth } = store.getState();
    const currentUserId = auth.user.id;

    const peers = members.reduce((memo, member) => {
      if (member.id === currentUserId) return memo;

      const peer = createPeerConnection(member.id);

      // eslint-disable-next-line no-param-reassign
      memo[member.id] = peer;

      return memo;
    }, {});

    store.dispatch(setPeers(peers));
  }

  function createPeer(member) {
    const peer = createPeerConnection(member.id);

    store.dispatch(addPeer(member.id, peer));
    sendOffer(peer, member.id);
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
    Object.keys(peers).forEach(userId => {
      const peer = peers[userId];

      peer.addStream(stream);
      sendOffer(peer, userId);
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

  function manageAudioStreamState() {
    const { auth, audioMedia, rtc } = store.getState();

    if (audioMedia.status !== MediaStatusReady) {
      return;
    }

    const userId = auth.user.id;
    const hasAllowedStream = rtc.allowedStreams.includes(userId);
    const shouldBeEnabled = !audioMedia.muted && hasAllowedStream;
    const track = audioMedia.stream.getAudioTracks()[0];

    if (track.enabled !== shouldBeEnabled) {
      track.enabled = shouldBeEnabled;
    }
  }

  function manageVideoSource() {
    const { streamRoom, auth } = store.getState();
    const { source, ownerId } = streamRoom;

    if (ownerId !== auth.user.id) {
      return;
    }

    if (source === StreamSourceWebcam || source === StreamSourceScreen) {
      requestVideoStream(store, source);

      return;
    }
  }

  function dispatch(action, prevState) {
    const { audioMedia, videoMedia, members, rtc, auth } = store.getState();

    if (!auth.authenticated) {
      return;
    }

    if (action.type === INITIALIZE) {
      initPeers(members);
      manageVideoSource();
    }

    if (action.type === MEMBER_ENTER) {
      createPeer(action.payload);
    }

    if (action.type === MEMBER_LEAVE) {
      destroyPeer(action.payload, rtc);
    }

    if (action.type === setAudioStream.type) {
      setupStream(audioMedia.stream, rtc.peers);
    }

    if (action.type === setVideoStream.type) {
      setupStream(videoMedia.stream, rtc.peers);
    }

    if (action.type === setVideoSource.type) {
      manageVideoSource(action);
    }

    if (action.type === resetStreaming.type) {
      const { stream } = prevState.videoMedia;

      if (stream) {
        stream.getTracks().forEach(track => track.stop());

        Object.keys(rtc.peers).forEach(userId => {
          const peer = rtc.peers[userId];

          peer.removeStream(stream);
          sendOffer(peer, userId);
        });
      }
    }

    manageAllowedStreams();
    manageAudioStreamState();
  }

  ioSocket.on('RTC.ICECandidate', ({ userId, candidate }) => {
    const { rtc } = store.getState();
    const peer = rtc.peers[userId];

    if (!peer) {
      // TODO: track this place 'ICE-JOIN race'
      return;
    }

    peer.addIceCandidate(new RTCIceCandidate(candidate));
  });

  ioSocket.on('RTC.SDP', ({ userId, sdp, offer }) => {
    const { rtc } = store.getState();
    const { peers } = rtc;
    const peer = peers[userId];

    if (!peer) {
      // TODO: track this place 'SDP-JOIN race'
      return;
    }

    const sessionDesc = new RTCSessionDescription(sdp);

    peer.setRemoteDescription(sessionDesc).then(() => {
      if (!offer) return;

      peer.createAnswer().then(localDesc => {
        peer.setLocalDescription(localDesc).then(() => {
          ioSocket.emit('RTC.SDP', { userId, sdp: localDesc });
        });
      });
    });
  });

  return { dispatch };
}
