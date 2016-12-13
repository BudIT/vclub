import initialState from 'vclub/redux/initialClubState';

export const AUTH = 'club/auth/auth';
export const LOG_OUT = 'club/auth/log-out';
export const RESTORE_AUTH = 'club/auth/restoreAuth';

export function auth(authData, remember = false) {
  return {
    type: AUTH,
    payload: authData,
    meta: {
      sideEffect: ({
        ioSocket,
        localStorage,
      }) => {
        ioSocket.emit('auth', authData);

        if (remember) {
          localStorage.setItem('name', authData.name);
          localStorage.setItem('master', authData.master);
        }
      },
    },
  };
}

export function restoreAuth() {
  return {
    type: RESTORE_AUTH,
    meta: {
      sideEffect: ({
        store,
        localStorage,
      }) => {
        const name = localStorage.getItem('name');
        const master = localStorage.getItem('master');

        if (name) {
          store.dispatch(auth({
            name,
            master,
          }));
        }
      },
    },
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
    meta: {
      sideEffect: ({
        ioSocket,
        localStorage,
      }) => {
        ioSocket.emit('logOut');

        localStorage.removeItem('name');
        localStorage.removeItem('master');
      },
    },
  };
}

export default function reducer(state, action) {
  if (action.type === AUTH) {
    return {
      ...state,
      authenticating: true,
    };
  }

  if (action.type === LOG_OUT) {
    return initialState.auth;
  }

  return state || initialState.auth;
}