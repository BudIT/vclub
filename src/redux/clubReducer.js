import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


import initHOReducer from './club/init';

import authReducer from './club/auth';
import membersReducer from './club/members';
import roomsReducer from './club/rooms';
import uiReducer from './club/ui';
import sharingRoomReducer from './club/sharing';


const baseReducer = combineReducers({
  auth: authReducer,
  members: membersReducer,
  rooms: roomsReducer,
  ui: uiReducer,
  form: formReducer,
  sharingRoom: sharingRoomReducer,
});

export default initHOReducer(baseReducer);
