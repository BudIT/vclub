import actionCreator from 'borex-actions/actionCreator';
import createReducer from 'borex-reducers/createReducer';
import setIn from 'borex-reducers/setIn';


export const enableScreenCapture = actionCreator();

export default createReducer(on => {
  on(enableScreenCapture, setIn('screenCapture', () => true));
});
