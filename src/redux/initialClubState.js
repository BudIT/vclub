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
