import actionCreator from 'borex-actions/actionCreator';
import setMetaStatic from 'borex-actions/setMetaStatic';
import createReducer from 'borex-reducers/createReducer';

export const sendMessage = actionCreator(
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);

export default createReducer(on => {
  on(sendMessage, (state, action) => ({
    messages: [...state.messages, action.payload],
  }));
});

