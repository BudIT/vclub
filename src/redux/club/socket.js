import actionCreator from 'borex-actions/actionCreator';
import createReducer from 'borex-reducers/createReducer';
import setIn from 'borex-reducers/setIn';

import { SocketStatusConnected, SocketStatusDisconnected } from 'vclub/constants/socketStatus';


export const setConnected = actionCreator();
export const setDisconnected = actionCreator();

export default createReducer(on => {
  on(setConnected, setIn('status', () => SocketStatusConnected));
  on(setDisconnected, setIn('status', () => SocketStatusDisconnected));
});
