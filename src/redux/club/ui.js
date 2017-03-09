import actionCreator from 'borex-actions/actionCreator';
import createReducer from 'borex-reducers/createReducer';
import setIn from 'borex-reducers/setIn';


export const toggleMemberPanel = actionCreator();
export const toggleChat = actionCreator();

export default createReducer(on => {
  on(toggleMemberPanel, setIn('showMemberPanel', (_, flag) => !flag));
  on(toggleChat, setIn('displayChat', (_, flag) => !flag));
});
