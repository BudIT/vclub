import initialState from 'vclub/redux/initialClubState';

export const CHANGE_ROOM = 'club/room/change-room';

export function changeRoom(newRoomName) {
  return {
    type: CHANGE_ROOM,
    payload: newRoomName,
    meta: {
      remote: true,
      broadcast: true,
    },
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case CHANGE_ROOM:
      if (state.currentRoom === action.payload) {
        return state;
      }

      return {
        ...state,
        currentRoom: action.payload,
      };

    default:
      return state || initialState.rooms;
  }
}
