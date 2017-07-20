const IceServers = [
  {
    url: 'stun:stun.l.google.com:19302',
  }, {
    url: 'turns:vclub.ga',
    username: 'vclub',
    credential: 'superSecret',
  },
];

let i1 = 0;
const getNum = () => i1++; // eslint-disable-line no-plusplus

export default function createPeerManager({ api, localStreams, active = true }) {
  let negLocked = false;
  let hasQueuedNeg = false;
  let hasQueuedNegReq = false;

  const peer = new RTCPeerConnection({
    iceServers: IceServers,
  });

  function sendOffer() {
    const i = getNum();

    // console.log(`1(${i}). create offer`);
    peer.createOffer().then(localDesc => {
      // console.log('LDO', localDesc);
      // console.log(`1(${i}). set local desc`);
      peer.setLocalDescription(localDesc).then(() => {
        // console.log(`1(${i}). send offer sdp`);
        api.sendSDP(localDesc, true);
      }).catch((err) => console.log(`e1.${i}(set-loc-desc)`, err));
    }).catch((err) => console.log(`e1.${i}(create-offer)`, err));
  }

  function negotiate() {
    if (negLocked) {
      hasQueuedNeg = true;
      // console.log('(X). queue offer');
      return;
    }

    negLocked = true;

    if (!active) {
      api.sendNegReq();
      return;
    }

    sendOffer();
  }

  function processNegReq() {
    if (negLocked) {
      // console.log('(X). queue neg request');
      hasQueuedNegReq = true;
      return;
    }

    negLocked = true;
    api.sendNegAccept();
  }

  function processNegAccept() {
    // console.log('(X). got accept');
    hasQueuedNeg = false;
    sendOffer();
  }

  function finishNegotiation() {
    negLocked = false;

    if (hasQueuedNeg) {
      hasQueuedNeg = false;
      // console.log('(X). resend new offer');
      negotiate();
    }

    if (hasQueuedNegReq) {
      hasQueuedNegReq = false;
      // console.log('(X). accept neg req');
      processNegReq();
    }
  }

  function processSdp(sdp, offer) {
    const sessionDesc = new RTCSessionDescription(sdp);

    const i = getNum();
    // console.log(`2(${i}). set remote desc`);
    // console.log('RD', sessionDesc);
    peer.setRemoteDescription(sessionDesc).then(() => {
      if (!offer) {
        // console.log(`2(${i}). got answer`);
        finishNegotiation();
        return;
      }

      // console.log(`2(${i}). create answer`);

      peer.createAnswer().then(localDesc => {
        // console.log(`2(${i}). set local desc`);
        // console.log('LDA', localDesc);
        peer.setLocalDescription(localDesc).then(() => {
          // console.log(`2(${i}). send answer`);
          api.sendSDP(localDesc);
          finishNegotiation();
        }).catch((err) => console.log(`e2.${i}(set-loc-desc)`, err));
      }).catch((err) => console.log(`e2.${i}(cr-answ)`, err));
    }).catch((err) => console.log(`e2.${i}(set-rmt-desc)`, err));
  }

  function attachStream(stream) {
    peer.addStream(stream);
  }

  function detachStream(stream) {
    peer.removeStream(stream);
  }

  function addIceCandidate(candidate) {
    peer.addIceCandidate(new RTCIceCandidate(candidate));
  }

  function destroy() {
    if (peer.signalingState !== 'closed') {
      peer.close();
    }
  }

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

  peer.onnegotiationneeded = () => negotiate();

  return {
    processNegReq,
    processNegAccept,
    processSdp,
    addIceCandidate,
    attachStream,
    detachStream,
    destroy,
  };
}
