import { MediaStatusPending } from 'vclub/constants/mediaStatus';
import { ChatRoomType } from 'vclub/constants/roomTypes';
import { SocketStatusConnecting } from 'vclub/constants/socketStatus';


export default {
  members: {
    online: [],
    all: {},
  },
  auth: {
    authenticated: false,
    authenticating: false,
    user: null, // { id: String, name: String, master: Boolean }
    restored: null,
  },
  rooms: {
    currentRoom: ChatRoomType,
  },
  ui: {
    showMemberPanel: false,
    displayChat: false,
  },
  chat: {
    messages: [],
    unreadCount: 0,
  }, // array of { id: Number, user: String, date: String, message: String }
  sharingRoom: {
    ballPosition: null,
    done: [],
    userMenuPosition: null,
    showBallMenu: false,
    timerStart: null,
    sessionDuration: 300,
    expired: false,
  },
  streamRoom: {
    source: null,
    ownerId: null,
  },
  audioMedia: {
    muted: false,
    status: MediaStatusPending,
    stream: null,
    errorName: null,
  },
  videoMedia: {
    muted: true,
    status: MediaStatusPending,
    type: null,
    stream: null,
    errorName: null,
  },
  rtc: {
    audioStreams: {},
    videoStreams: {},
    allowedStreams: [],
  },
  socket: {
    status: SocketStatusConnecting,
  },
  whiteboard: {
    // any other params?
    figures: [],
  },
  vote: {
    showModalVote: false,
    pros: [],
    cons: [],
  },
  features: {
    screenCapture: false,
    camera: true,
  },
};
