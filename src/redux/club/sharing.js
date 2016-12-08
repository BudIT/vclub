import actionCreator from 'borex-actions/actionCreator';
import setPayload from 'borex-actions/setPayload';
import setMetaStatic from 'borex-actions/setMetaStatic';
import createReducer from 'borex-reducers/createReducer';

import initialState from 'vclub/redux/initialClubState';
import changeRoom from 'vclub/redux/club/rooms';


export const increment = actionCreator(
  'increment',
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);
export const decrement = actionCreator(
  'decrement',
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);
export const passBall = actionCreator(
  'passBall',
  setPayload((memberId) => (memberId)), // ?????????????
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);
export const setUserMenuPosition = actionCreator(
  'setUserMenuPosition',
  setPayload((memberId) => (memberId)) // ?????????????
);
export const toggleBallMenu = actionCreator(
  'toggleBallMenu',
  setPayload((showBallMenu) => (showBallMenu)) // ?????????????
);
export const completesSession = actionCreator(
  'completesSession',
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);


export default createReducer((on) => {
  on(increment, (state, action) => ({
    ...state,
    sessionDuration: state.sessionDuration + 60,
  }));

  on(decrement, (state, action) => ({
    ...state,
    sessionDuration: state.sessionDuration - 60,
  }));

  on(passBall, (state, action) => {
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
  });

  on(setUserMenuPosition, (state, action) => {
    if (state.userMenuPosition === action.payload) {
      return state;
    }

    return {
      ...state,
      userMenuPosition: action.payload,
    };
  });

  on(toggleBallMenu, (state, action) => {
    if (state.showBallMenu === action.payload) {
      return state;
    }

    return {
      ...state,
      showBallMenu: action.payload,
    };
  });

  on(completesSession, () => {
    return initialState.sharingRoom;
  });

  on(changeRoom, () => {
    return initialState.sharingRoom;
  });
});

// export function increment() {
//   return {
//     type: INCREMENT_TIMER_MINUTES,
//     meta: {
//       remote: true,
//       broadcast: true,
//     },
//   };
// }

// export function decrement() {
//   return {
//     type: DECREMENT_TIMER_MINUTES,
//     meta: {
//       remote: true,
//       broadcast: true,
//     },
//   };
// }

// export function passBall(memberId) {
//   return {
//     type: PASS_BALL,
//     payload: memberId,
//     meta: {
//       remote: true,
//       broadcast: true,
//     },
//   };
// }

// export function setUserMenuPosition(memberId) {
//   return {
//     type: SET_SHOW_USER_MENU_POSITION,
//     payload: memberId,
//   };
// }

// export function toggleBallMenu(showBallMenu) {
//   return {
//     type: TOGGLE_BALL_MENU,
//     payload: showBallMenu,
//   };
// }

// export function completesSession() {
//   return {
//     type: COMPLETES_SESSION,
//     meta: {
//       remote: true,
//       broadcast: true,
//     },
//   };
// }


// export default function reducer(state, action) {
//   switch (action.type) {
//
//     case increment.type:
//       return {
//         ...state,
//         sessionDuration: state.sessionDuration + 60,
//       };
//
//     case decrement.type:
//       if (state.sessionDuration <= 60) {
//         return state;
//       }
//       return {
//         ...state,
//         sessionDuration: state.sessionDuration - 60,
//       };
//
//     case passBall.type:
//       if (state.ballPosition === action.payload) {
//         return state;
//       }
//
//       return {
//         ...state,
//         ballPosition: action.payload,
//         timerStart: Date.now(),
//         userMenuPosition: null,
//         done: [...state.done, state.ballPosition],
//       };
//
//     case setUserMenuPosition.type:
//       if (state.userMenuPosition === action.payload) {
//         return state;
//       }
//
//       return {
//         ...state,
//         userMenuPosition: action.payload,
//       };
//
//     case toggleBallMenu.type:
//       if (state.showBallMenu === action.payload) {
//         return state;
//       }
//
//       return {
//         ...state,
//         showBallMenu: action.payload,
//       };
//
//     case completesSession.type:
//       return initialState.sharingRoom;
//
//     case changeRoom.type:
//       return initialState.sharingRoom;
//
//     default:
//       return state || initialState.sharingRoom;
//   }
// }
