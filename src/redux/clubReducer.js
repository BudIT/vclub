import { combineReducers } from 'redux';

import initHOReducer from './club/init';

import authReducer from './club/auth';
import formsReducer from './club/forms';
import membersReducer from './club/members';
import roomsReducer from './club/rooms';
import uiReducer from './club/ui';


const baseReducer = combineReducers({
  auth: authReducer,
  members: membersReducer,
  rooms: roomsReducer,
  ui: uiReducer,
  forms: formsReducer,
});

export default initHOReducer(baseReducer);
