import initialState from 'vclub/redux/initialClubState';
import { CHANGE_ROOM } from 'vclub/redux/club/rooms';

export const PASS_BALL = 'club/sharing/pass-ball';
export const SET_SHOW_USER_MENU_POSITION = 'club/sharing/set-show-user-menu-position';
export const TOGGLE_BALL_MENU = 'club/sharing/toggle-ball-menu';
export const COMPLETES_SESSION = 'club/sharing/completes-session';

export const INCREMENT_TIMER_MINUTES = 'club/sharing/increment-timer-minutes';
export const DECREMENT_TIMER_MINUTES = 'club/sharing/decrement-timer-minutes';


export function increment() {
  return {
    type: INCREMENT_TIMER_MINUTES,
    meta: {
      remote: true,
      broadcast: true,
    },
  };
}

export function decrement() {
  return {
    type: DECREMENT_TIMER_MINUTES,
    meta: {
      remote: true,
      broadcast: true,
    },
  };
}

export function passBall(memberId) {
  return {
    type: PASS_BALL,
    payload: memberId,
    meta: {
      remote: true,
      broadcast: true,
    },
  };
}

export function setUserMenuPosition(memberId) {
  return {
    type: SET_SHOW_USER_MENU_POSITION,
    payload: memberId,
  };
}

export function toggleBallMenu(memberId) {
  return {
    type: TOGGLE_BALL_MENU,
    payload: memberId,
  };
}

export function completesSession() {
  return {
    type: COMPLETES_SESSION,
    meta: {
      remote: true,
      broadcast: true,
    },
  };
}


export default function reducer(state, action) {
  switch (action.type) {

    case INCREMENT_TIMER_MINUTES:
      return {
        ...state,
        sessionDuration: state.sessionDuration + 60,
      };

    case DECREMENT_TIMER_MINUTES:
      if (state.sessionDuration <= 60) {
        return state;
      }
      return {
        ...state,
        sessionDuration: state.sessionDuration - 60,
      };

    case PASS_BALL:
      if (state.ballPosition === action.payload) {
        return state;
      }

      return {
        ...state,
        ballPosition: action.payload,
        timerStart: Date.now(),
        userMenuPosition: null,
        done: [...state.done, state.ballPosition],
      };

    case SET_SHOW_USER_MENU_POSITION:
      if (state.userMenuPosition === action.payload) {
        return state;
      }

      return {
        ...state,
        userMenuPosition: action.payload,
      };

    case TOGGLE_BALL_MENU:
      if (state.showBallMenu === action.payload) {
        return state;
      }

      return {
        ...state,
        showBallMenu: action.payload,
      };

    case COMPLETES_SESSION:
      return initialState.sharingRoom;

    case CHANGE_ROOM:
      return initialState.sharingRoom;

    default:
      return state || initialState.sharingRoom;
  }
}
