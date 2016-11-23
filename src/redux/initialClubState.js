import { MediaStatusPending } from 'vclub/constants/mediaStatus';
import { ChatRoomType } from 'vclub/constants/roomTypes';


export default {
  members: [], // array of { id: String, name: String, master: Boolean }
  auth: {
    authenticated: false,
    authenticating: false,
    user: null, // { id: String, name: String, master: Boolean }
  },
  rooms: {
    currentRoom: ChatRoomType,
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
    muted: false,
    status: MediaStatusPending,
    stream: null,
    errorName: null,
  },
  rtc: {
    peers: {},
    passivePeers: [],
    streams: {},
    allowedStreams: [],
  },
  whiteboard: {
    // any other params?
    figures: [],
    currentFigure: 1,
  },
};
