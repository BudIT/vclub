export default {
  members: [], // array of { id: String, name: String, master: Boolean }
  auth: {
    authenticated: false,
    authenticating: false,
    user: null, // { id: String, name: String, master: Boolean }
  },
};
