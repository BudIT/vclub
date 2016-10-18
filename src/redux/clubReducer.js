import { combineReducers } from 'redux';
import { combineForms } from 'react-redux-form';

import initialState from './initialClubState';

import initHOReducer from './club/init';

import authReducer from './club/auth';
import membersReducer from './club/members';
import roomsReducer from './club/rooms';
import uiReducer from './club/ui';


const baseReducer = combineReducers({
  auth: authReducer,
  members: membersReducer,
  rooms: roomsReducer,
  ui: uiReducer,
  forms: combineForms(initialState.forms, 'forms'),
});

export default initHOReducer(baseReducer);
