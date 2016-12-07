import actionCreator from 'borex-actions/actionCreator';
import createReducer from 'borex-reducers/createReducer';
import setIn from 'borex-reducers/setIn';


export const setAudioStream = actionCreator();
export const setMediaRequestStatus = actionCreator();

export default createReducer(on => {
  on(setAudioStream,
    setIn('stream'),
    setIn('status', () => 1)
  );

  on(setMediaRequestStatus, setIn('status'));
});
