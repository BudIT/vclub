import initialState from 'vclub/redux/initialState';


export const AUTH = 'club/auth/auth';

export function auth(authData) {
  return {
    type: AUTH,
    payload: authData,
    meta: {
      sideEffect: ({ ioSocket }) => {
        ioSocket.emit('auth', authData);
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

  return state || initialState.club.auth;
}
