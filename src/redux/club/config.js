import actionCreator from 'borex-actions/actionCreator';
import createReducer from 'borex-reducers/createReducer';
import set from 'borex-reducers/set';


export const setConfig = actionCreator();

export default createReducer(on => {
  on(setConfig, set());
});
