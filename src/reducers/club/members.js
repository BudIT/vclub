import { MEMBER_ENTER, MEMBER_LEAVE } from 'vclub/constants/actionTypes';


export default function membersReducer(state = [], action) {
  if (action.type === MEMBER_ENTER) {
    const member = action.payload;

    return [member, ...state];
  }

  if (action.type === MEMBER_LEAVE) {
    const memberId = action.payload;

    return state.filter(member => member.id !== memberId);
  }

  return state;
}
