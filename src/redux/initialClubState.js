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
  },
};

// PropTypes, make it as object to export probably

// for members

// members: PropTypes.arrayOf(PropTypes.shape({
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   master: PropTypes.boolean.isRequired,
// })).isRequired

// for rooms

// rooms: PropTypes.shape({
//   currentRoom: PropTypes.string.isRequired,
// }).isRequired

// for ui

// ui: PropTypes.shape({
//   showMemberPanel: PropTypes.bool.isRequired,
// }).isRequired

// auth: PropTypes.shape({
//   authenticated: PropTypes.bool.isRequired,
//   authenticating: PropTypes.bool.isRequired,
//   user: PropTypes.object.isRequired,
// })
