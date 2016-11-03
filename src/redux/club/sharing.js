// import initialState from 'vclub/redux/initialClubState';

const PASS_BALL = 'club/sharing/pass-ball';

export function passBall(memberId) {
  return {
    type: PASS_BALL,
    payload: memberId,
  };
}

/*export default function reducer(state, action) {
   return {
   ...state,
   members: [
   ...state.IS_SELECTED,
   payload
   ]
 }
  return state || initialState.sharingRoom;
}*/
