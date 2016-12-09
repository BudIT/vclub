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
  setPayload((memberId) => (memberId)), // ???
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);
export const setUserMenuPosition = actionCreator(
  'setUserMenuPosition',
  setPayload((memberId) => (memberId)) // ???
);
export const toggleBallMenu = actionCreator(
  'toggleBallMenu',
  setPayload((showBallMenu) => (showBallMenu)) // ???
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
