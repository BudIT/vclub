import { combineReducers } from 'redux';

import initHOReducer from './club/init';

import authReducer from './club/auth';
import membersReducer from './club/members';
import roomReducer from './club/rooms';
import uiReducer from './club/ui';


const baseReducer = combineReducers({
  auth: authReducer,
  members: membersReducer,
  room: roomReducer,
  ui: uiReducer,
});

export default initHOReducer(baseReducer);
