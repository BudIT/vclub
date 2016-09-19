import { INITIALIZE, AUTH, MEMBER_ENTER, MEMBER_LEAVE } from 'vclub/constants/actionTypes';


export function inititalize(payload) {
  return {
    type: INITIALIZE,
    payload,
  };
}

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

export function memberEnter(member) {
  return {
    type: MEMBER_ENTER,
    payload: member,
    meta: {
      broadcast: true,
    },
  };
}

export function memberLeave(memberId) {
  return {
    type: MEMBER_LEAVE,
    payload: memberId,
    meta: {
      broadcast: true,
    },
  };
}
