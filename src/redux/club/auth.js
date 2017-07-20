import actionCreator from 'borex-actions/actionCreator';
import commandCreator from 'borex-actions/commandCreator';
import withSideEffect from 'borex-actions/withSideEffect';
import createReducer from 'borex-reducers/createReducer';
import setIn from 'borex-reducers/setIn';


export const auth = actionCreator(
  withSideEffect((context, authData, remember = true) => {
    const { ioSocket, localStorage, Raven } = context;

    ioSocket.emit('auth', authData);

    Raven.setUserContext(authData);

    Raven.captureMessage('Authenticated', {
      level: 'info',
      logger: 'auth',
      extra: authData,
    });

    if (remember) {
      localStorage.setItem('storedAuth', JSON.stringify(authData));
    }
  }),
);

export const setRestoredData = actionCreator();

export const restoreAuth = commandCreator((context) => {
  const { dispatch, localStorage } = context;
  const authJSON = localStorage.getItem('storedAuth');

  if (authJSON) {
    dispatch(setRestoredData(JSON.parse(authJSON)));
  }
});

export const logOut = commandCreator(() => {
  document.location.reload();
});


export default createReducer(on => {
  on(auth, setIn('authenticating', () => true));
  on(setRestoredData, setIn('restored'));
});
