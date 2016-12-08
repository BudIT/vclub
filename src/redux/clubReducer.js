// import { combineReducers } from 'redux';
import composeReducers from 'borex-reducers/utils/composeReducers';
import scopeReducer from 'borex-reducers/utils/scopeReducer';
import { reducer as formReducer } from 'redux-form';


import initHOReducer from './club/init';

import authReducer from './club/auth';
import membersReducer from './club/members';
import roomsReducer from './club/rooms';
import uiReducer from './club/ui';
import sharingRoomReducer from './club/sharing';


// const baseReducer = combineReducers({
//   auth: authReducer,
//   members: membersReducer,
//   rooms: roomsReducer,
//   ui: uiReducer,
//   form: formReducer,
//   sharingRoom: sharingRoomReducer,
// });

const baseReducer = composeReducers(
  scopeReducer('auth', authReducer),
  scopeReducer('members', membersReducer),
  scopeReducer('rooms', roomsReducer),
  scopeReducer('ui', uiReducer),
  scopeReducer('form', formReducer),
  scopeReducer('sharingRoom', sharingRoomReducer),
);

export default initHOReducer(baseReducer);
