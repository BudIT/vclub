import { combineReducers } from 'redux';

import { initialize } from 'vclub/actions/core';

import membersReducer from './club/members';
import dataReducer from './club/data';


const baseReducer = combineReducers({
  members: membersReducer,
  data: dataReducer,
});

export default function clubReducer(atom, action) {
  if (action.type === initialize.toString()) {
    const newAtom = action.payload;
    newAtom.data.authenticated = true;
    newAtom.data.authenticating = false;

    return newAtom;
  }

  return baseReducer(atom, action);
}
