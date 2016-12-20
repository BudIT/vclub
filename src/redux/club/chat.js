import actionCreator from 'borex-actions/actionCreator';
import setType from 'borex-actions/setType';
import setMetaStatic from 'borex-actions/setMetaStatic';
import createReducer from 'borex-reducers/createReducer';

export const sendMessage = actionCreator(
  setType('sendMessage'),
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);

export default createReducer(on => {
  on(sendMessage, (state, action) => ({
    messages: [...state.messages, action.payload],
  }));
});

