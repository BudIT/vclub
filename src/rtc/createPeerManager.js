const IceServers = [
  {
    url: 'stun:stun.l.google.com:19302',
  }, {
    url: 'stun:stun.anyfirewall.com:3478',
  },
];

let i1 = 0;
const getNum = () => i1++; // eslint-disable-line no-plusplus

export default function createPeerManager({ api, localStreams, active = true }) {
  let sendingOffer = false;
  let hasQueuedOffer = false;

  const peer = new RTCPeerConnection({
    iceServers: IceServers,
  });

  localStreams.forEach(stream => peer.addStream(stream));

  peer.onicecandidate = event => {
    if (!event.candidate) return;

    api.sendICE(event.candidate);
  };

  peer.onaddstream = event => {
    api.handleAddStream(event.stream);
  };

  peer.onremovestream = event => {
    api.handleRemoveStream(event.stream);
  };

  // peer.onnegotiationneeded = () => {
  //   console.log('onneg', peer.signalingState);
  //   sendOffer(peer, userId);
  // };

  peer.onsignalingstatechange = () => {
    console.log('sigstate', peer.signalingState);
  };

  function sendOffer() {
    if (!active) {
      api.notifyNegotiation();
      return;
    }

    const i = getNum();

    if (sendingOffer) {
      hasQueuedOffer = true;
      console.log(`1(${i}). queue offer`);
      return;
    }

    sendingOffer = true;

    console.log(`1(${i}). create offer`);
    // sendingOffer = true;
    peer.createOffer().then(localDesc => {
      console.log(`1(${i}). set local desc`);
      peer.setLocalDescription(localDesc).then(() => {
        console.log(`1(${i}). send sdp`);
        api.sendSDP(localDesc, true);
      }).catch((err) => console.log(`e1.${i}(set-loc-desc)`, err));
    }).catch((err) => console.log(`e1.${i}(create-offer)`, err));
  }

  function processSdp(sdp, offer) {
    const sessionDesc = new RTCSessionDescription(sdp);

    const i = getNum();
    console.log(`2(${i}). set remote desc`);
    peer.setRemoteDescription(sessionDesc).then(() => {
      if (!offer) {
        sendingOffer = false;

        if (hasQueuedOffer) {
          hasQueuedOffer = false;
          console.log(`2(${i}). resend new offer`);
          sendOffer();
        }

        console.log(`2(${i}). got answer`);
        return;
      }

      console.log(`2(${i}). create answer`);

      peer.createAnswer().then(localDesc => {
        console.log(`2(${i}). set local desc`);
        peer.setLocalDescription(localDesc).then(() => {
          console.log(`2(${i}). send sdp`);
          api.sendSDP(localDesc);
        }).catch((err) => console.log(`e2.${i}(set-loc-desc)`, err));
      }).catch((err) => console.log(`e2.${i}(cr-answ)`, err));
    }).catch((err) => console.log(`e2.${i}(set-rmt-desc)`, err));
  }

  function attachStream(stream) {
    peer.addStream(stream);
    sendOffer();
  }

  function detachStream(stream) {
    peer.removeStream(stream);
    sendOffer();
  }

  function addIceCandidate(candidate) {
    peer.addIceCandidate(new RTCIceCandidate(candidate));
  }

  function destroy() {
    if (peer.signalingState !== 'closed') {
      peer.close();
    }
  }

  if (active) {
    sendOffer();
  }

  return {
    sendOffer,
    addIceCandidate,
    processSdp,
    attachStream,
    detachStream,
    destroy,
  };
}
