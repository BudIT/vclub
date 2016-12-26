import actionCreator from 'borex-actions/actionCreator';
import setMetaStatic from 'borex-actions/setMetaStatic';
import createReducer from 'borex-reducers/createReducer';
import setIn from 'borex-reducers/setIn';

import initialState from 'vclub/redux/initialClubState';

import { CHANGE_ROOM } from 'vclub/redux/club/rooms';


export const increment = actionCreator(
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);
export const decrement = actionCreator(
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);
export const passBall = actionCreator(
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);
export const setUserMenuPosition = actionCreator(
  'setUserMenuPosition',
);
export const toggleBallMenu = actionCreator(
  'toggleBallMenu',
);
export const completesSession = actionCreator(
  'completesSession',
  setMetaStatic('remote', true),
  setMetaStatic('broadcast', true)
);


export default createReducer((on) => {
  on(increment, setIn('sessionDuration', (_, sessionDuration) => sessionDuration + 60));
  on(decrement, setIn('sessionDuration', (_, sessionDuration) => sessionDuration - 60));

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

  on(completesSession, () => initialState.sharingRoom);
  on(CHANGE_ROOM, () => initialState.sharingRoom);
});
