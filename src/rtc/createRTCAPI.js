import { MediaStatusReady } from 'vclub/constants/mediaStatus';
import { ChatRoomType, MediaRoomType } from 'vclub/constants/roomTypes';
import { WebcamVideoType, ScreenVideoType } from 'vclub/constants/videoTypes';

import { memberEnter, memberLeave } from 'vclub/redux/club/members';
import { INITIALIZE } from 'vclub/redux/club/init';
import { setAudioStream } from 'vclub/redux/club/audioMedia';
import { setVideoStream, unsetVideoStream } from 'vclub/redux/club/videoMedia';
import {
  addAudioStream, addVideoStream, removeStream, setAllowedStreams,
} from 'vclub/redux/club/rtc';

import { StreamSourceWebcam, StreamSourceScreen } from 'vclub/constants/streamSources';

import createPeerManager from './createPeerManager';
import requestWebcamStream from './requestWebcamStream';
import getScreenCaptureRequest from './getScreenCaptureRequest';
import { ByRoomSelectors, DefaultStreamsSelector } from './allowedStreamsSelectors';

const { Raven } = window;


export default function createRTCAPI(ioSocket, store) {
  const requestScreenCapture = getScreenCaptureRequest(store);
  const peers = {};

  function forEachPeer(fn) {
    Object.keys(peers).forEach(userId => fn(peers[userId], userId));
  }

  function createPeer(member, active = true) {
    const { audioMedia, videoMedia } = store.getState();
    const localStreams = [];

    if (audioMedia.stream) {
      localStreams.push(audioMedia.stream);
    }

    if (videoMedia.stream) {
      localStreams.push(videoMedia.stream);
    }

    peers[member.id] = createPeerManager({
      localStreams,
      active,
      api: {
        sendICE(candidate) {
          ioSocket.emit('RTC.ICECandidate', { userId: member.id, candidate });
        },

        handleAddStream(stream) {
          const track = stream.getTracks()[0];
          const addRemoteStream = track.kind === 'video' ? addVideoStream : addAudioStream;

          store.dispatch(addRemoteStream(member.id, stream));
        },

        handleRemoveStream(stream) {
          store.dispatch(removeStream(member.id, stream));
        },

        sendSDP(sdp, offer) {
          ioSocket.emit('RTC.SDP', { userId: member.id, sdp, offer });
        },

        sendNegReq() {
          ioSocket.emit('RTC.NegReq', { userId: member.id });
        },

        sendNegAccept() {
          ioSocket.emit('RTC.NegAccept', { userId: member.id });
        },
      },
    });
  }

  function initPeers(members) {
    const { auth } = store.getState();
    const currentUserId = auth.user.id;

    members.forEach(member => {
      if (member.id === currentUserId) return;

      createPeer(member, false);
    });
  }

  function destroyPeer(memberId) {
    peers[memberId].destroy();
    delete peers[memberId];
  }

  function setupStream(stream) {
    forEachPeer(peer => peer.attachStream(stream));
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

  function getExpectedVideoType() {
    const { auth, videoMedia, rooms, streamRoom } = store.getState();

    if (rooms.currentRoom === ChatRoomType) {
      return videoMedia.muted ? null : WebcamVideoType;
    }

    if (rooms.currentRoom === MediaRoomType) {
      const { source, ownerId } = streamRoom;

      if (ownerId !== auth.user.id) {
        return null;
      } else if (source === StreamSourceWebcam) {
        return WebcamVideoType;
      } else if (source === StreamSourceScreen) {
        return ScreenVideoType;
      }
    }

    return null;
  }

  function manageVideoStreamState(prevState) {
    const { stream, type } = prevState.videoMedia;

    const expectedVideoType = getExpectedVideoType();

    if (type === expectedVideoType) {
      return;
    }

    if (!expectedVideoType) {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        forEachPeer(peer => peer.detachStream(stream));

        store.dispatch(unsetVideoStream());
      }

      return;
    }

    if (expectedVideoType === WebcamVideoType) {
      requestWebcamStream(store);

      return;
    }

    if (expectedVideoType === ScreenVideoType) {
      requestScreenCapture();

      return;
    }
  }

  let dispatchingDeep = 0;

  function dispatch(action, prevState) {
    const { audioMedia, videoMedia, members, auth } = store.getState();

    if (!auth.authenticated) {
      return;
    }

    dispatchingDeep++; // eslint-disable-line no-plusplus

    if (action.type === INITIALIZE) {
      initPeers(members.online);
    }

    if (action.type === memberEnter.type) {
      createPeer(action.payload, true);
    }

    if (action.type === memberLeave.type) {
      destroyPeer(action.payload);
    }

    if (action.type === setAudioStream.type) {
      setupStream(audioMedia.stream);
    }

    if (action.type === setVideoStream.type) {
      setupStream(videoMedia.stream);
    }

    if (dispatchingDeep === 1) {
      manageAllowedStreams();
      manageAudioStreamState();
      manageVideoStreamState(prevState);
    }

    dispatchingDeep--; // eslint-disable-line no-plusplus
  }

  ioSocket.on('RTC.ICECandidate', ({ userId, candidate }) => {
    const peer = peers[userId];

    if (!peer) {
      Raven.captureMessage('RTC.ICECandidate race', {
        tags: { submodule: 'rtc' },
      });

      return;
    }

    peer.addIceCandidate(candidate);
  });

  ioSocket.on('RTC.SDP', ({ userId, sdp, offer }) => {
    const peer = peers[userId];

    if (!peer) {
      Raven.captureMessage('RTC.SDP race', {
        tags: { submodule: 'rtc' },
      });

      return;
    }

    peer.processSdp(sdp, offer);
  });

  ioSocket.on('RTC.NegReq', ({ userId }) => {
    const peer = peers[userId];

    if (!peer) {
      Raven.captureMessage('RTC.NegReq race', {
        tags: { submodule: 'rtc' },
      });

      return;
    }

    peer.processNegReq();
  });

  ioSocket.on('RTC.NegAccept', ({ userId }) => {
    const peer = peers[userId];

    if (!peer) {
      Raven.captureMessage('RTC.NegAccept race', {
        tags: { submodule: 'rtc' },
      });

      return;
    }

    peer.processNegAccept();
  });

  return { dispatch };
}
