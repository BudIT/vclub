import actionCreator from 'borex-actions/actionCreator';
import createReducer from 'borex-reducers/createReducer';
import appendIn from 'borex-reducers/appendIn';
import rejectIn from 'borex-reducers/rejectIn';
import updateIn from 'borex-reducers/updateIn';
import broadcast from 'vclub/redux/enhancers/broadcast';


export const memberEnter = actionCreator(broadcast);
export const memberLeave = actionCreator(broadcast);


export default createReducer(on => {
  on(memberEnter,
    appendIn('online'),
    updateIn('all', member => ({ [member.id]: member })),
  );
  on(memberLeave,
    rejectIn('online', (member, id) => member.id === id),
  );
});
