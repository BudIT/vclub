export default {
  members: [], // array of { id: String, name: String, master: Boolean }
  auth: {
    authenticated: false,
    authenticating: false,
    user: null, // { id: String, name: String, master: Boolean }
  },
  rooms: {
    currentRoom: 'CHAT',
  },
  ui: {
    showMemberPanel: false,
  },
  sharingRoom: {
    ballPosition: null,
    done: [],
    userMenuPosition: null,
    showBallMenu: false,
    timerStart: null,
    sessionDuration: 300,
    expired: false,
  },
  media: {
    status: 0, // 0 -requesting, 1 - ready, 2 - dismissed, 3 - denied, 4 - empty, 5 - UNKNOWN
    audioStream: null,
  },
  rtc: {
    peers: {}, // ???
    passivePeers: [], // ???
    audioStreams: {},
  },
};
