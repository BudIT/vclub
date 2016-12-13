import actionCreator from 'borex-actions/actionCreator';
import setPayload from 'borex-actions/setPayload';
import setType from 'borex-actions/setType';
import setMetaStatic from 'borex-actions/setMetaStatic';
import createReducer from 'borex-reducers/createReducer';

export const sendMessage = actionCreator(
  setType('Send message'),
  setPayload(message => message),
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);

export default createReducer(on => {
  on(sendMessage, (state, action) => ({
    messages: [...state.messages, action.payload],
  }));
});

