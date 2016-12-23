import { reducer as formReducer } from 'redux-form';
import composeReducers from 'borex-reducers/utils/composeReducers';
import scopeReducer from 'borex-reducers/utils/scopeReducer';

import initHOReducer from './club/init';

import authReducer from './club/auth';
import membersReducer from './club/members';
import roomsReducer from './club/rooms';
import uiReducer from './club/ui';
import chatReducer from './club/chat';
import sharingRoomReducer from './club/sharing';
import streamRoomReducer from './club/streamRoom';
import audioMediaReducer from './club/audioMedia';
import videoMediaReducer from './club/videoMedia';
import rtcReducer from './club/rtc';
import socketReducer from './club/socket';
import whiteboardReducer from './club/whiteboard';
import voteReducer from './club/vote';


const baseReducer = composeReducers(
  scopeReducer('auth', authReducer),
  scopeReducer('members', membersReducer),
  scopeReducer('rooms', roomsReducer),
  scopeReducer('ui', uiReducer),
  scopeReducer('form', formReducer),
  scopeReducer('sharingRoom', sharingRoomReducer),
  scopeReducer('chat', chatReducer),
  scopeReducer('streamRoom', streamRoomReducer),
  scopeReducer('audioMedia', audioMediaReducer),
  scopeReducer('videoMedia', videoMediaReducer()),
  scopeReducer('rtc', rtcReducer),
  scopeReducer('socket', socketReducer),
  scopeReducer('whiteboard', whiteboardReducer),
  scopeReducer('vote', voteReducer),
);

export default initHOReducer(baseReducer);
