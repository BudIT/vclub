import { combineReducers } from 'redux';

import initHOReducer from './club/init';
import authReducer from './club/auth';
import membersReducer from './club/members';


const baseReducer = combineReducers({
  auth: authReducer,
  members: membersReducer,
});

export default initHOReducer(baseReducer);
