import createReducer from 'vclub/redux/createReducer';

import { memberEnter, memberLeave } from 'vclub/actions/core';


export default createReducer({
  [memberEnter]: (atom, member) => [member, ...atom],
  [memberLeave]: (atom, memberId) => atom.filter((member) => member.id !== memberId),
}, []);
