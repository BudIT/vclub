import { MediaStatusPending } from 'vclub/constants/mediaStatus';
import { ChatRoomType } from 'vclub/constants/roomTypes';
import uuid from 'uuid';
import moment from 'moment';

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
  chat: {
    messages: [
      {
        id: uuid.v4(),
        user: 'Bot',
        date: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        message: 'Hello! Welcome to chat!',
      },
    ],
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
  },
  vote: {
    showModalVote: false,
    pros: [],
    cons: [],
  },
};
