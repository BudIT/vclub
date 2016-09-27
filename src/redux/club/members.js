import initialState from 'vclub/redux/initialState';


const MEMBER_ENTER = 'club/members/member-enter';
const MEMBER_LEAVE = 'club/members/member-leave';


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

export default function reducer(state, action) {
  if (action.type === MEMBER_ENTER) {
    const member = action.payload;

    return [...state, member];
  }

  if (action.type === MEMBER_LEAVE) {
    const memberId = action.payload;

    return state.filter(member => member.id !== memberId);
  }

  return state || initialState.club.members;
}
