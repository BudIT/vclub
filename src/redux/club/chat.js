import actionCreator from 'borex-actions/actionCreator';
import setMetaStatic from 'borex-actions/setMetaStatic';
import createReducer from 'borex-reducers/createReducer';
import appendIn from 'borex-reducers/appendIn';
import setIn from 'borex-reducers/setIn';

import { toggleChat } from './ui';


export const sendMessage = actionCreator(
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);

export default createReducer(on => {
  on(sendMessage,
    appendIn('messages'),
    setIn('unreadCount', (_, count) => count + 1)
  );
  on(toggleChat, setIn('unreadCount', () => 0));
});
