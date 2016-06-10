import createReducer from 'vclub/redux/createReducer';

import { auth } from 'vclub/actions/core';


export default createReducer({
  [auth]: (atom) => ({
    ...atom,
    authenticating: true,
  }),
}, {
  authenticated: false,
  authenticating: false,
  currentRoom: 'chat',
});
