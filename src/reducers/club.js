import { combineReducers } from 'redux';
import { INITIALIZE } from 'vclub/constants/actionTypes';

import membersReducer from './club/members';
import dataReducer from './club/data';


const baseReducer = combineReducers({
  members: membersReducer,
  data: dataReducer,
});

export default function clubReducer(atom, action) {
  if (action.type === INITIALIZE) {
    const newAtom = action.payload;
    newAtom.data.authenticated = true;
    newAtom.data.authenticating = false;

    return newAtom;
  }

  return baseReducer(atom, action);
}
